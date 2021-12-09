const MovingObject = require("./moving_object");
const Util = require("./util");

function Food(options) {
    MovingObject.call(this, {
        pos: options.pos,  
        vel: 2,
        size: options.size
    })
}

Util.inherits(Food, MovingObject); 

//feed the fish with a click
Food.prototype.feed = function(ctx) {
    // ctx.fillStyle = '#5a3920'; 
    // ctx.fillRect(this.pos[0], this.pos[1], 10, 10);
    var img = new Image(); 
    img.src = "./img/donut_emoji_nobg.png"
    ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1])
}

// food flake drops to the bottom of the tank over time
Food.prototype.sink = function() {
    this.pos[1] += this.vel 
}

module.exports = Food
