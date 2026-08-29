<template>
    <div class="alert">Hello, I am a high school student, and your help in collecting data on frog occurrences would mean a lot to me. Using my app, you can check where frogs are most likely to be found. Since there is only a small amount of data, my model may sometimes give slightly inaccurate predictions — and that’s where you can help.

By clicking “Send to markers” on the map, you provide information that frogs are present at that specific location. This will improve my model and also help climatology scientists study frog migrations.

Disclaimer:By clicking “Send,” I only collect climatology data from that point. No personal information is recorded. <button @click="disp()">Close</button></div>
    
    </template>
    <script setup>
function disp(){
    document.querySelector(".alert").classList.add("dis")
}</script>
    <style scoped>
    .dis{
        display: none;
    }
    .alert{
        width: 100wv;
        padding: 2px;
        background: rgba(79, 79, 216, 0.555);
      
        backdrop-filter: blur(8px);
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        max-height: 100px;
        overflow: auto;
    }
    button{
        outline: none;
        border: none;
        background: rgba(92, 38, 38, 0.432);
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
    }
</style>