/**
*   Rover functions and constructor
*   Date: 06/03/2016
*   Dev: John Kottis
*/


function RoverMars(position, direction, grid, obstacles) {

    self = this;
    this.position = (position === undefined) ? [0, 0] : position;
    this.direction = (direction === undefined) ? 'N' : direction;
    this.grid = (grid === undefined) ? [100, 100] : grid;
    this.obstacles = (obstacles === undefined) ? [] : obstacles;
    this.status = 'OK';

    /**
    * Controls of the rover
    * 
    * @controls {Array} of controls/ moving options
    *
    **/
    this.controls = function(controls) {
        if (controls === undefined) {
            return this.controlsArray;
        } 
        else {
            for(var index = 0; index < controls.length; index++) {
                var control = controls[index];
                if (control === 'f' || control === 'b') {
                    if (!move(control)) break;
                } 
                else if (control === 'l' || control === 'r') {
                    turn(control);
                }
            }
            resetPosition();
            this.controlsArray = controls;
        }
    };


    /**
    * Initializes rovers position
    *
    **/
    function resetPosition() {
        self.position = [
            (self.position[0] + self.grid[0]) % self.grid[0],
            (self.position[1] + self.grid[1]) % self.grid[1]
        ];
    }


    /**
    * Checks if there is another rover in the same position
    *
    * @rover {Object} rover object
    * rovers {Array} of rover objects
    * 
    **/
    function roverInPosition(rover, rovers) {
        var i;
        for (i = 0; i < roversInMars.length; i++) {
            if (roversInMars[i] === rover) {
                return true;
            }
        }
        return false;
    }


    /**
    * Moves rover
    * 
    **/
    function move(control) {
        var xIncrease = 0, yIncrease = 0;
        if (self.direction === 'N') {
            yIncrease = -1;
        } 
        else if (self.direction === 'E') { // East
            xIncrease = 1;
        } 
        else if (self.direction === 'S') { // South
            yIncrease = 1;
        } 
        else if (self.direction === 'W') { // West
            xIncrease = -1;
        }
        if (control === 'b') { // Backward
            xIncrease *= -1;
            yIncrease *= -1;
        }
        var newPosition = [self.position[0] + xIncrease, self.position[1] + yIncrease];
        if (isObstacle(newPosition)) {
            console.log(self.position[0] + ',' + self.position[1]);
            return false;
        }
        self.position = newPosition;
        return true;
    }


    /**
    * Checks if new position is obstacle
    * 
    **/
    function isObstacle(newPosition) {
        for(var index = 0; index < self.obstacles.length; index++) {
            if (newPosition.toString() == self.obstacles[index].toString()) {
                self.status = 'obstacle';
                return true;
            }
        }
        return false;
    }


    /**
    * changes direction
    *
    * @control {String} user input
    *
    **/
    function turn(control) {
        var directionNumber = directionAsNumber(self.direction);
        if (control === 'l') { // Left
            directionNumber = (directionNumber + 4 - 1) % 4;
        } 
        else { // Right
            directionNumber = (directionNumber + 1) % 4;
        }
        self.direction = self.directions[directionNumber];
    }


    this.directions = ['N', 'E', 'S', 'W'];


    /**
    * sets direction as number
    *
    * @direction {String} rover direction
    *
    **/
    function directionAsNumber(direction) {
        for(var index = 0; index < 4; index++) {
            if (self.directions[index] === direction) {
                return index;
            }
        }
    }

}