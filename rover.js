/**
 * Rover functions and constructor
 */
function RoverMars(position = [0, 0], direction = 'N', grid = [100, 100], obstacles = []) {
    this.position = position;
    this.direction = direction;
    this.grid = grid;
    this.obstacles = obstacles;
    this.status = 'OK';
    this.directions = ['N', 'E', 'S', 'W'];
    this.controlsArray = [];

    /**
     * Controls the rover based on the provided commands
     *
     * @param  {Array} controls - Array with control commands
     */
    this.controls = function (controls) {
        if (controls === undefined) {
            return this.controlsArray;
        } else {
            for (let control of controls) {
                if (control === 'f' || control === 'b') {
                    if (!move(control)) break;
                } else if (control === 'l' || control === 'r') {
                    turn(control);
                }
            }
            resetPosition();
            this.controlsArray = controls;
        }
    };

    /**
     * Resets rover's position to be within the grid boundaries
     */
    const resetPosition = () => {
        this.position = [
            (this.position[0] + this.grid[0]) % this.grid[0],
            (this.position[1] + this.grid[1]) % this.grid[1]
        ];
    };

    /**
     * Checks if there is another rover in the same position
     *
     * @param  {Object} rover  - Rover object
     * @param  {Array} rovers  - Array of Rover objects
     * @return {Boolean}       - True if another rover is in the same position
     */
    const roverInPosition = (rover, rovers) => {
        return rovers.some(r => r === rover);
    };

    /**
     * Moves the rover based on the control command
     *
     * @param  {String} control - Command to move the rover ('f' for forward, 'b' for backward)
     * @return {Boolean}        - True if the rover moved successfully, false if it encountered an obstacle
     */
    const move = (control) => {
        let [xIncrease, yIncrease] = [0, 0];

        switch (this.direction) {
            case 'N': yIncrease = -1; break;
            case 'E': xIncrease = 1; break;
            case 'S': yIncrease = 1; break;
            case 'W': xIncrease = -1; break;
        }

        if (control === 'b') {
            xIncrease *= -1;
            yIncrease *= -1;
        }

        const newPosition = [this.position[0] + xIncrease, this.position[1] + yIncrease];

        if (isObstacle(newPosition)) {
            console.log(`${this.position[0]},${this.position[1]}`);
            return false;
        }
        this.position = newPosition;
        return true;
    };

    /**
     * Checks if the new position has an obstacle
     *
     * @param  {Array} newPosition - Rover's new position
     * @return {Boolean}           - True if there's an obstacle, false otherwise
     */
    const isObstacle = (newPosition) => {
        for (let obstacle of this.obstacles) {
            if (newPosition.toString() === obstacle.toString()) {
                this.status = 'obstacle';
                return true;
            }
        }
        return false;
    };

    /**
     * Changes the direction of the rover
     *
     * @param  {String} control - Command to turn the rover ('l' for left, 'r' for right)
     */
    const turn = (control) => {
        let directionNumber = directionAsNumber(this.direction);

        if (control === 'l') {
            directionNumber = (directionNumber + 3) % 4; // Turn left
        } else {
            directionNumber = (directionNumber + 1) % 4; // Turn right
        }
        this.direction = this.directions[directionNumber];
    };

    /**
     * Converts a direction to its corresponding number
     *
     * @param  {String} direction - Rover's direction ('N', 'E', 'S', 'W')
     * @return {Number}           - Corresponding number (0-3)
     */
    const directionAsNumber = (direction) => {
        return this.directions.indexOf(direction);
    };
}
