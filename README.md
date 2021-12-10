https://annayth.github.io/fishTank2/

# Background:

You, the user, just received a fish from a friend. Your fish is super hungry and you can drop food flakes into the tank and watch as your fish swims to collect them. 

As your fish eats more it will also poop more. Suddenly all your neighobrs and friends want to buy your super potent fish poop to use as fertilizer! You can use this money to buy better food for your fish, more fish friends, and customize your fish tank. *Maybe one day you'll move into a better apartment.*

# Functionality and MVPS:
* Meant to be a relaxing game, a customizable fish tank with your favorite desk buddies
* Feed your fish at your leisure, they won't die if you forget them for a few days!
* When you sprinkle food in the tank watch your fish swim to collect. 
* Unlock new fish and customizations as you play more and more.
* If you would like a shortcut please try to click "Watch Ad" 

# Wireframe

![alt text](https://github.com/AnnaYTH/Fish_Feeder/blob/main/wireframe.png)

# Technology 
* Javascript
* Canvas
* HTML and CSS
* Webpack

# Code Snippit 
I added a radius function to my Util that allows me to change the hitboxes that determine collisions (circumscribed circles around the square image) to be variable with regards to the length of the printed image. I also accounted for future references of fish that may be rectangular and not square.
```JS
radius(width, length) {
        let num = (width * width) + (length * length); 
        num = Math.sqrt(num); 
        return (num * 0.5); 
    }
```


# TimeFrame
* Friday Afternoon and Weekend - Set up fish tank and fish with variable images and food options, make the food spawn on a click at the click and make fish swim towards the food to consume it. Fish will be able to detect presence of food, otherwise the fish will be randomly swimming around. I have fish and food that are rectangles. Now I need to make them move and collide with each other.
* Monday - create a toggle to open the shop, the shop will have scroll capabilities. 
* Tuesday - Add sounds functionality 
* Wednesday - Add possible customizations to the tank
* Thursday Morning - Prep for presentation!

