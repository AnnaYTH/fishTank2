const Util = require("./util");
const MovingObject = require("./moving_object");
const Tank = require("./tank"); 

function Fish(options) {
    MovingObject.call(this, {
        pos: options.pos, 
        vel: Util.randomVec(4), 
        size: options.size, 
        game: options.game, 
        typeId: Util.random(0, 2)
    })
}

Util.inherits(Fish, MovingObject); 

const species = ['clown', 'moorish', 'gold']; 

Fish.prototype.print = function(ctx) {
    // ctx.fillStyle = '#ee9c39'; 
    // ctx.fillRect(this.pos[0], this.pos[1], 20, 20);
    if(this.vel[0] > 0 && species[this.typeId] === 'clown') {
        var img = new Image(); 
        img.src = "./img/fish_emoji1_right.png"
        ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    } else if (this.vel[0] < 0 && species[this.typeId] === 'clown') {
        var img = new Image(); 
        img.src = "./img/fish_emoji1_left.png"
        ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    } else if (this.vel[0] > 0 && species[this.typeId] === 'moorish') {
        var img = new Image(); 
        img.src = "./img/fish_emoji2_right.png"
        ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    } else if (this.vel[0] < 0 && species[this.typeId] === 'moorish') {
        var img = new Image(); 
        img.src = "./img/fish_emoji2_left.png"
        ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    } else if (this.vel[0] > 0 && species[this.typeId] === 'gold') {
        var img = new Image(); 
        img.src = "./img/fish_emoji3_right.png"
        ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    } else if (this.vel[0] < 0 && species[this.typeId] === 'gold') {
        var img = new Image(); 
        img.src = "./img/fish_emoji3_left.png"
        ctx.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    }
}

// swim around randomly if there is no food present
Fish.prototype.swim = function(ctx) {
    this.pos[0] += this.vel[0]; 
    this.pos[1] += this.vel[1]; 

    // slow down if they're exiting hungry mode where min is hungry velocity
    if((this.vel[0] + this.vel[1]) > 7) {
        this.vel = Util.scale(this.vel, 0.5); // fish gonna have the same direction, but slower speed once all food is gone 
    }
    // BOUNCE LOGIC
    let x = this.pos[0]; 
    let y = this.pos[1]; 
    let dx = this.vel[0]; 
    let dy = this.vel[1]; 

    if(x + dx > 870 || x + dx < 20) { 
        this.vel[0] = -1 * dx; 
    } // ctx.canvas.width
    if(y + dy > 480 || y + dy < 50) {
        this.vel[1] = -1 * dy;  
    } // ctx.canvas.height
}

// swim at a higher velocity towards food when it is present
Fish.prototype.food_swim = function(ctx, target_pos) {
    let x = this.pos[0]; 
    let y = this.pos[1]; 
     
    // target_pos = [x, y]
    let x_delta = target_pos[0] - x; 
    let y_delta = target_pos[1] - y; 
    let angle = Math.tan(y_delta / x_delta); 

    let dx = this.vel[0]; 
    let dy = this.vel[1];

    this.pos[0] += this.vel[0]; 
    this.pos[1] += this.vel[1]; 

    if ( x + dx > 900 - this.size[0] - 40 || x + dx < 20 || y + dy > 500 - this.size[1] - 40 || y + dy < 50) {
        if(x + dx > 870 || x + dx < 20) { 
            this.vel[0] = -1 * dx; 
        }
        if(y + dy > 480 || y + dy < 50) {
            this.vel[1] = -1 * dy;  
        }
    } else {
        this.vel = [(-10 * Math.sin(angle)), (10 * Math.cos(angle))]
    }
}   


module.exports = Fish; 