from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import torch
import torch.nn as nn
import psycopg2


# DATABASE CONNECTION
con = psycopg2.connect(
    "postgresql://neondb_owner:npg_Ti5bZAxCX4zd@ep-holy-sea-aykd451j-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
)


# MODEL
class MLP(nn.Module):
    def __init__(self):
        super().__init__()

        self.net = nn.Sequential(
            nn.Linear(6, 3),
            nn.ReLU(),
            nn.Linear(3, 6)
        )

    def forward(self, x):
        return self.net(x)


model = MLP()

model_state = torch.load(
    "model2.pth",
    map_location="cpu"
)

model.load_state_dict(model_state)
model.eval()


# PYDANTIC MODELS
class Item(BaseModel):
    srad: float
    vpd: float
    tmin: float
    tmax: float
    ws: float
    ppt: float


class Item2(BaseModel):
    lat: float
    lon: float
    occ: int


# FASTAPI
app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# TEST ROUTE
@app.get("/")
def gets():
    return {
        "message": "API radi"
    }


# ML PREDICTION
@app.post("/frog")
def get_frogs(item: Item):

    X = torch.tensor(
        [
            item.srad,
            item.vpd,
            item.tmin,
            item.tmax,
            item.ws,
            item.ppt
        ],
        dtype=torch.float32
    )

    # Dodaj batch dimension
    X = X.unsqueeze(0)

    with torch.no_grad():
        prediction = model(X)

    # Reconstruction error
    error = torch.norm(
        prediction - X,
        p=2,
        dim=1
    )

    threshold = 208 + 73 * 3

    frog = error.item() < threshold

    # Zaštita od deljenja nulom
    score = min(
        0.9,
        208 / max(error.item(), 1e-8)
    )

    return {
        "frog": frog,
        "score": float(score),
        "error": float(error.item())
    }


# INSERT OCCURRENCE INTO DATABASE
@app.post("/occ")
def poslaji(item: Item2):

    with con.cursor() as c:
        now = datetime.now()
        c.execute(
            """
            INSERT INTO occurances2 (lat, lon, occurence,time)
            VALUES (%s, %s, %s,%s)
            """,
            (
                item.lat,
                item.lon,
                item.occ,
                now
            )
        )

    con.commit()

    return {
        "success": True
    }