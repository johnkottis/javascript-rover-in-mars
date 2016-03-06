describe('Mars Rover', function() {

    describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing', function() {
        it('should set starting position', function() {
            var mr = new RoverMars([12, 21]);
            expect(mr.position).toEqual([12, 21]);
        });
        it('should use default starting position value 0x0 when not assigned', function() {
            var mr = new RoverMars();
            expect(mr.position).toEqual([0, 0]);
        });
        it('should set direction as numeric value', function() {
            var mr = new RoverMars([12, 21], 'N');
            expect(mr.direction).toEqual('N');
        });
        it('should use default starting direction value N when not assigned', function() {
            var mr = new RoverMars([12, 21]);
            expect(mr.direction).toEqual('N');
        });
    });

    describe('The rover receives a character array of controls', function() {
        it('should set controls array', function() {
            var mr = new RoverMars([12, 21], 'N');
            mr.controls(['do', 'this', 'and', 'then', 'do', 'that']);
            expect(mr.controls()).toEqual(['do', 'this', 'and', 'then', 'do', 'that']);
        });
    });

    describe('Implement controls that move the rover forward/backward (f,b)', function() {
        it('should reduce Y when moving north', function() {
            var mr = new RoverMars([12, 21], 'N');
            mr.controls(['f', 'f']);
            expect(mr.position).toEqual([12, 19]);
        });
        it('should increase Y when moving south', function() {
            var mr = new RoverMars([12, 21], 'S');
            mr.controls(['f']);
            expect(mr.position).toEqual([12, 22]);
        });
        it('should reduce X when moving west', function() {
            var mr = new RoverMars([12, 21], 'W');
            mr.controls(['f']);
            expect(mr.position).toEqual([11, 21]);
        });
        it('should increase X when moving east', function() {
            var mr = new RoverMars([12, 21], 'E');
            mr.controls(['f']);
            expect(mr.position).toEqual([13, 21]);
        });
        it('should increase Y when moving backwards facing north', function() {
            var mr = new RoverMars([12, 21], 'N');
            mr.controls(['b']);
            expect(mr.position).toEqual([12, 22]);
        });
        it('should reduce Y when moving backwards facing south', function() {
            var mr = new RoverMars([12, 21], 'S');
            mr.controls(['b']);
            expect(mr.position).toEqual([12, 20]);
        });
        it('should increase X when moving backwards facing west', function() {
            var mr = new RoverMars([12, 21], 'W');
            mr.controls(['b']);
            expect(mr.position).toEqual([13, 21]);
        });
        it('should reduce X when moving backwards facing east', function() {
            var mr = new RoverMars([12, 21], 'E');
            mr.controls(['b']);
            expect(mr.position).toEqual([11, 21]);
        });
    });

    describe('Implement controls that turn the rover left/right (l,r)', function() {
        it('should change direction from E to N when control is to turn left', function() {
            var mr = new RoverMars([12, 21], 'E');
            mr.controls(['l']);
            expect(mr.direction).toEqual('N');
        });
        it('should change direction from N to W when control is to turn left', function() {
            var mr = new RoverMars([12, 21], 'N');
            mr.controls(['l']);
            expect(mr.direction).toEqual('W');
        });
        it('should change direction from E to S when control is to turn right', function() {
            var mr = new RoverMars([12, 21], 'E');
            mr.controls(['r']);
            expect(mr.direction).toEqual('S');
        });
    });

    describe('Implement wrapping from one edge of the grid to another (planets are spheres after all)', function() {
        it('should assign grid size', function() {
            var mr = new RoverMars([12, 21], 'N', [12, 33]);
            expect(mr.grid).toEqual([12, 33]);
        });
        it('should use default value 100x100 when grid is not assigned', function() {
            var mr = new RoverMars([12, 21], 'N');
            expect(mr.grid).toEqual([100, 100]);
        });
        it('should return X to 0 when grid is passed', function() {
            var mr = new RoverMars([9, 9], 'E', [10, 10]);
            mr.controls(['f']);
            expect(mr.position).toEqual([0, 9]);
        });
        it('should return Y to 0 when grid is passed', function() {
            var mr = new RoverMars([9, 9], 'S', [10, 10]);
            mr.controls(['f']);
            expect(mr.position).toEqual([9, 0]);
        });
        it('should return X to grid end when grid is passed from west', function() {
            var mr = new RoverMars([0, 9], 'E', [10, 10]);
            mr.controls(['b']);
            expect(mr.position).toEqual([9, 9]);
        });
        it('should return Y to grid end when grid is passed from north', function() {
            var mr = new RoverMars([9, 0], 'N', [10, 10]);
            mr.controls(['f']);
            expect(mr.position).toEqual([9, 9]);
        });
    });

    describe('Implement obstacle detection before each move to a new square.'
        + ' If a given sequence of controls encounters an obstacle,'
        + ' the rover moves up to the last possible point and reports the obstacle', function() {
        it('should assign obstacles', function() {
            var mr = new RoverMars([12, 21], 'N', [12, 33], [[5, 5], [3, 7]]);
            expect(mr.obstacles).toEqual([[5, 5], [3, 7]]);
        });
        it('should use empty array when obstacles are not assigned', function() {
            var mr = new RoverMars([12, 21], 'N');
            expect(mr.obstacles.length).toEqual(0);
        });
        it('should not move to the obstacle', function() {
            var mr = new RoverMars([0, 0], 'E');
            mr.obstacles = [[5, 1], [3, 0]];
            mr.controls(['f', 'f', 'f']);
            expect(mr.position).toEqual([2, 0]);
        });
        it('should stop when obstacle is detected', function() {
            var mr = new RoverMars([0, 0], 'E');
            mr.obstacles = [[3, 0]];
            mr.controls(['f', 'f', 'f', 'l', 'f']);
            expect(mr.position).toEqual([2, 0]);
        });
        it('should set status to obstacle when one is detected', function() {
            var mr = new RoverMars([0, 0], 'E');
            mr.obstacles = [[1, 0]];
            mr.controls(['f']);
            expect(mr.status).toEqual('obstacle');
        });
        it('should leave status to OK when obstacle is NOT detected', function() {
             var mr = new RoverMars([0, 0], 'E');
             mr.controls(['f']);
             expect(mr.status).toEqual('OK');
        });
    });

});