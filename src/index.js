const Tank = require("./scripts/tank"); 
const Food  = require("./scripts/food")
const Fish = require("./scripts/fish")
const Poop = require("./scripts/poop"); 
const View = require("./scripts/view")


document.addEventListener("DOMContentLoaded", function() {
    const canvasEl = document.getElementById('game-canvas');
    const ctx = canvasEl.getContext('2d');

    const tank01 = new Tank(); 

    const view = new View({
        ctx: ctx,
        tank: tank01
    })

    // var audio = new Audio('./img/purrple-cat-silent-wood.mp3');    
    // audio.play();   

    view.start(); 
})

