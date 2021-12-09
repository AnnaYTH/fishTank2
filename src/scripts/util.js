const Util = {
    inherits(childClass, parentClass) {
        function Surrogate() {}; 
        Surrogate.prototype = parentClass.prototype; 
        childClass.prototype = new Surrogate(); 
        childClass.prototype.constructor = childClass; 
    },

    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    }, // taken from asteroids project

    scale(vec, m) {
        return [vec[0] * m, vec[1] * m]; 
    }, // taken from asteroids project

    dist(fish_pos, food_pos) {
        return Math.sqrt(
            Math.pow(fish_pos[0] - food_pos[0], 2) + Math.pow(fish_pos[1] - food_pos[1], 2)
          );
    }, 

    random(min, max) {
        let rand = Math.random() * (max + 1); 
        rand = Math.floor(rand + min); 
        return rand; 
    },

    radius(width, length) {
        let num = (width * width) + (length * length); 
        num = Math.sqrt(num); 
        return (num * 0.5); 
    }
}

module.exports = Util; 