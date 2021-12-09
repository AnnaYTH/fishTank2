const Tank = require('./tank')
const Fish = require("./fish"); 
const Food = require("./food"); 
const Poop = require("./poop"); 
const Util = require('./util');

function View(options) {
    this.ctx = options.ctx;
    this.tank = options.tank
}

View.prototype.start = function () {
    this.eventSet(); 

    const tankBind = this.tank.moveObjects.bind(this.tank, this.ctx); 
    setInterval(tankBind, 120);  
}

View.prototype.eventSet = function() {
    const tank01 = this.tank; 
    // add food on a click
    window.addEventListener("click", function(event) {
        const offsetX = 110; 
        const offsetY = 110; 
        // logic to only add food within the canvas window?
        if(tank01.money >= 5) {
            if(event.clientX > 25 && event.clientX < 900 && event.clientY > 25 && event.clientY < 500) {
                const foodParticle = new Food(
                    {pos: [event.clientX - offsetX, event.clientY - offsetY],
                    size: tank01.foodSize})
                    if(tank01.food.length < tank01.foodLimit) {
                        tank01.food.push(foodParticle); 
                        tank01.money -= 5
                    } 
            }
        } else {
            alert('You have no money! Here is 10 coins, but maybe you should consider making other life choices')
            tank01.money += 10; 
        }
    })

    // buy a new fish
    const fishButton = document.getElementById("new_fish_button"); 
    fishButton.addEventListener("click", function() {
        if(tank01.money >= 100) {
            tank01.money -= 100
            let size1 = 30 + (5 * (tank01.fishSize - 1))
            let first = tank01.fishes[0].size[0]
            const newFish = new Fish( 
                {pos: [300, 300],
                size: [size1, size1]
                })
            tank01.fishes.push(newFish); 
        }
    })

    //increase the amount of food you can drop into the tank by 1
    const foodLimitButton = document.getElementById("increase_food_limit");
    foodLimitButton.addEventListener("click", function() {
        tank01.foodLimit += 1; 
        tank01.money -= 500
    })

    //increase the size of all your fish
    const fishSizeButton = document.getElementById('increase_fish_size')
    fishSizeButton.addEventListener("click", function() {
        if(tank01.money >= 5000 && tank01.fishSize < 10) {
            tank01.money -= 5000; 
            tank01.fishSize += 1; 
            for(let i = 0; i < tank01.fishes.length; i++) {
                let fish_instance = tank01.fishes[i]; 
                fish_instance.size[0] += 5
                fish_instance.size[1] += 5
                // if I have a rectangle I'm doing to have to scale how much they increase to keep og dimension ratio the same
            }
        }
    })

    //increase the lvl of your fish => increases size and value of poop
    const fishLevelButton = document.getElementById('increase_fish_level'); 
    fishLevelButton.addEventListener("click", function() {
        if(tank01.money >= 5000 && tank01.fishLevel < 10) {
            tank01.money -= 5000; 
            tank01.fishLevel += 1; 
            tank01.poopSize[0] += 5; 
            tank01.poopSize[1] += 5; 
            tank01.poopValue += 5
        }
    })

    //increase the size of your food
    const foodSizeButton = document.getElementById('increase_food_size');
    foodSizeButton.addEventListener("click", function() {
        if(tank01.money >= 3000 && tank01.foodSize[0] < 50) {
            tank01.money -= 3000; 
            tank01.foodSize[0] += 5; 
            tank01.foodSize[1] += 5; 
        }
    })

    // increase the value of food => increases the value of poop
    const foodLevelButton = document.getElementById('increase_food_level'); 
    foodLevelButton.addEventListener("click", function() {
        if(tank01.money >= 10000 && tank01.foodLevel < 3) {
            tank01.money -= 10000;
            tank01.foodLevel += 1; 
        }
    })
    
    // change the color of the water randomly
    const changeWaterButton = document.getElementById("change_water_color"); 
    changeWaterButton.addEventListener("click", function() {
        tank01.changeWater(); 
    })

    // want to name your tank?
    const renameButton = document.getElementById("rename_tank"); 
    renameButton.addEventListener("click", function() {
        tank01.nameTank()
        tank01.money -= 50; 
    })

    // watch an ad for free coins
    const adButton = document.getElementById("watch_ad_button"); 
    adButton.addEventListener("click", function() {
        alert('You won the game! Here is 100000 coins'); 
        tank01.money += 100000; 
    })
    
}



module.exports = View; 