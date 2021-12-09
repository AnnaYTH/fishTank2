// think of this as the game class
const Fish = require("./fish"); 
const Food = require("./food"); 
const Poop = require("./poop"); 

const Util = require("./util"); 

function Tank() {
    this.DIM_X = 900 ;
    this.DIM_Y = 500 ;
    this.fishes = []; 
    this.addFish()
    this.food = [];
    this.addFood(); 
    this.poops = []; 
    this.money = 100;
    this.foodLimit = 3; 
    this.waterColor = '#A7C7E7'; 
    this.fishSize = 1; 
    this.fishLevel = 1; 
    this.poopSize = [15, 15]; 
    this.poopValue = 10; 
    this.foodSize = [15, 15]; 
    this.foodLevel = 1; 
}

Tank.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, 900, 500); 
    ctx.fillStyle = this.waterColor
    ctx.fillRect(0, 0, 900, 500); // water
    ctx.fillStyle = '#cdcdcd' 
    ctx.fillRect(0, 0, 900, 25); // air
    
    this.drawFish(ctx); 
    this.drawFood(ctx); 
    this.drawPoop(ctx);
}

Tank.prototype.drawFish = function(ctx) {
    for(let i = 0; i < this.fishes.length; i++) {
        let fish_instance = this.fishes[i]; 
        fish_instance.print(ctx); 
    }
}

Tank.prototype.drawFood = function(ctx) {
    for(let i = 0; i < this.food.length; i++) {
        let food_instance = this.food[i]; 
        food_instance.feed(ctx); 
    }
}

Tank.prototype.drawPoop = function(ctx) {
    for(let i = 0; i < this.poops.length; i++) {
        let poop_instance = this.poops[i]; 
        poop_instance.excrete(ctx)
    }
}

Tank.prototype.checkStats = function() {
    const money =  document.getElementById("money"); 
    money.innerText = `Money: ${this.money} coins`; 

    
    const fishNum = document.getElementById("numOfFish")
    fishNum.innerText = `Number of Fish: ${this.fishes.length}`

    const foodNum = document.getElementById("numOfFood")
    foodNum.innerText = `Number of Food (Limit ${this.foodLimit}): ${this.food.length}`

    const fishSize = document.getElementById("fishSize"); 
    fishSize.innerText = `Fish Size: ${this.fishSize}`

    const fishLevel = document.getElementById("fishLevel"); 
    fishLevel.innerText = `Fish Level: ${this.fishLevel}`

    const foodSize = document.getElementById("foodSize"); 
    foodSize.innerText = `Food Size: ${this.foodLevel}`

    const foodLevel = document.getElementById("foodLevel");
    foodLevel.innerText = `Food Level: ${this.foodLevel}`

    win(this); 
}

function win(tank) {
    if(tank.fishes.length >= 10) {
        const win = document.getElementById('win_condition'); 
        if(!win) {
            return; 
        }
        win.style.visibility = 'visible'; 
    }
}

Tank.prototype.moveObjects = function(ctx) {
    // update statistics
    this.checkStats(); 
    // if(this.money < 0) {
    //     alert('Happy Birthday! Love Grandma')
    //     alert('Grandma sent you $50')
    //     this.money += 50; 
    // }

    // moves all the food
    for(let i = 0; i < this.food.length; i++) {
        let food_instance = this.food[i]; 
        food_instance.sink(ctx); 
        if(food_instance.pos[1] > 480) {
            this.food.shift(); // if the food hits the bottom of the tank
        }
    }
    // moves all the fish 
    for(let i = 0; i < this.fishes.length; i++) {
        let fish_instance = this.fishes[i]; 
        // if there is food vs if there is not food
        if(this.food.length > 0) {
            fish_instance.food_swim(ctx, this.food[0].pos)
        } else {
            fish_instance.swim(ctx); 
        }
    }
    // moves poop
    for(let i = 0; i < this.poops.length; i++) {
        let poop_instance = this.poops[i]; 
        poop_instance.drop(ctx)
        if(poop_instance.pos[1] > 480) {
            this.poops.shift()
            this.money += (this.poopValue * this.foodLevel);  // poop hits floor, money gets made
        }
    }
 
    this.checkCollision(); 
    // print everything to the screen
    this.draw(ctx); 
}

Tank.prototype.addFish = function() {
    let fish1 = new Fish({
        pos: [50, 300],
        size: [30, 30],
        game: this
    })
    this.fishes.push(fish1); 
    let fish2 = new Fish({
        pos: [500, 300],
        size: [30, 30],
        game: this
    })
    this.fishes.push(fish2); 
}

Tank.prototype.addFood = function(ctx) {
    // let flake = new Food({
    //     pos: [300, 25]
    // })
    // this.food.push(flake); 
    // let flake2 = new Food({
    //     pos: [800, 25]
    // })
    // this.food.push(flake2); 
    // let flake3 = new Food({
    //     pos:[100, 25]
    // })
    // this.food.push(flake3); 
}

Tank.prototype.nameTank = function() {
    let humanInput = prompt('Hello! What would you like to name your fish tank?', 'The Fish Tank'); 
    let text = 'The Fish Tank'; 
    if(humanInput == null || humanInput == '') {
        text = 'You did not name your fish tank'
    } else {
        text = humanInput;
        const name = document.getElementById('name'); 
        name.innerText = `${text}`
    }
}

Tank.prototype.changeWater = function() {
    let blueColors = [
        '#B2FFFF', 
        '#AFEEEE',
        '#A7C7E7',
        '#48D1CC',
        '#00CED1',
        '#B0E0E6',
        '#ADD8E6',
        '#7DF9FF',
        '#5D8AA8',
        '#00308F',
        '#004F98',
        '#BCD4E6',
        '#89CFF0',
        '#A1CAF1',
        '#6CA0DC',
        '#81D8D0',
        '#4682B4',
        '#4B9CD3',
        '#4F97A3',
        '#73C2FB',
        '#008080',
        '#4C516D',
        '#0F52BA',
        '#2D5DA1',
        '#2E5894',
        '#126180',
        '#082567',
        '#007FFF',
        '#00356B',
        '#003153',
        '#1D2951',
        '#002366',
        '#436B95',
        '#005A92',
        '#CCCCFF',
        '#8DA399',
        '#AFDBF5',
        '#76ABDF',
        '#2C3863',
        '#4E6E81',
        '#C9FFE5',
        '#72A0C1',
        '#F0F8FF',
        '#6BCAE2',
        '#C6E6FB',
        '#002D62',
        '#0066B2',
        '#4F86F7',
        '#318CE7',
        '#6699CC',
        '#0039A6',
        '#13274F',
        '#002244',
        '#A3C1AD',
        '#0CAFFF',
        '#002244',
        '#B9D9EB',
        '#1F75FE',
        '#1F305E',
        '#005A9C',
        '#0C2340'
    ]
    let purpleColors = [
        '#702963',
        '#301934',
        '#5D3FD3',
        '#E6E6FA',
        '#CBC3E3',
        '#C3B1E1',
        '#CCCCFF',
        '#D8BFD8',
        '#BDB5D5'
    ]
    let colors = blueColors.concat(purpleColors); 
    let colorNum = Util.random(0, colors.length)
    debugger
    this.waterColor = colors[colorNum]
}

Tank.prototype.checkCollision = function() {
    for(let i = 0; i < this.fishes.length; i++) {
        let fish_instance = this.fishes[i]; 
        let length = fish_instance.size[0]; 
        let width = fish_instance.size[1]; 
        let fishHitbox = Util.radius(length, width); 

        for (let j = 0; j < this.food.length; j++) {
            let food_instance = this.food[j]
            // let foodHitbox = food_instance.radius; 
            let foodW = food_instance.size[0]; 
            let foodL = food_instance.size[1]; 
            let foodHitbox = Util.radius(foodW, foodL)

            let difference = Util.dist(fish_instance.pos, food_instance.pos); 
            if(difference < (fishHitbox + foodHitbox)) {
                // alert("food has been collided with!")
                this.food.shift()
                // poop time 
                let x = fish_instance.pos[0]; 
                let y = fish_instance.pos[1]; 

                let poop_instance = new Poop({
                    pos: [x, y], 
                    size: [this.poopSize[0], this.poopSize[1]]
                })
                this.poops.push(poop_instance); 
            }
        }
    }
}

module.exports = Tank; 


