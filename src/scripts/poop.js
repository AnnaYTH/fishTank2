const MovingObject = require("./moving_object");
const Util = require("./util");

function Poop(options) {
    MovingObject.call(this, {
        pos: options.pos,  
        vel: 2,
        radius: 7, 
        size: options.size
    })
}

Util.inherits(Poop, MovingObject); 

Poop.prototype.excrete = function(ctx) {
    var img = new Image(); 
    img.src = "../img/Poop_Emoji.png"
    ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1])
}

Poop.prototype.drop = function() {
    this.pos[1] += this.vel 
}



module.exports = Poop; 
