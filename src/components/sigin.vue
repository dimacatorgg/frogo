<script setup>
import { ref,defineEmits } from "vue";
const emits = defineEmits(["prvi"])

const login = ref(true);
</script>

<template>
  <div class="overlay">
   
    <div class="form-card">
 <span @click="emits('prvi')">Close</span>
      <Transition name="slide" mode="out-in">
        <form v-if="login" key="login" class="form-content">
          <h2>Login</h2>

          <input placeholder="Username" />
          <input placeholder="Password" type="password" />

          <button type="submit">Login</button>
        </form>

        <form v-else key="register" class="form-content">
          <h2>Register</h2>

          <input placeholder="Username" />
          <input placeholder="Password" type="password" />
          <input placeholder="Repeat password" type="password" />
          <input placeholder="Email" type="email" />

          <button type="submit">Register</button>
        </form>
      </Transition>

      <button class="switch" @click="login = !login">
        {{ login ? "Switch to Register" : "Switch to Login" }}
      </button>

    </div>
  </div>
</template>

<style scoped>
span{
    cursor: pointer;
}

.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}
.overlay
.form-card {
  width: 360px;
  padding: 30px;

  border-radius: 20px;

  background: rgba(30, 30, 30, 0.9);
  border: 1px solid rgba(255,255,255,0.1);

  box-shadow: 0 10px 30px rgba(0,0,0,.4);

  overflow: hidden;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h2 {
  text-align: center;
  color: white;
  margin-bottom: 10px;
}

input {
  padding: 12px;

  border: none;
  outline: none;

  border-radius: 10px;

  background: rgb(55, 55, 55);
  color: white;
}

input::placeholder {
  color: #bbb;
}

button[type="submit"] {
  margin-top: 10px;
  padding: 12px;

  border: none;
  border-radius: 10px;

  background: #38d46a;
  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
}

.switch {
  width: 100%;
  margin-top: 20px;
  padding: 10px;

  border: none;
  border-radius: 10px;

  background: #4f46e5;
  color: white;

  cursor: pointer;
  transition: 0.3s;
}

.switch:hover {
  background: #4338ca;
}

/* Vue Transition */

.slide-enter-active,
.slide-leave-active {
  transition: all 0.35s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>