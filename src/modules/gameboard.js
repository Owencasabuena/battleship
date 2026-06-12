export class Gameboard {
    constructor() {
        this.board = {};
        this.missedAttacks = [];
        this.ships = [];
    }
    
    isValidPlacement(coordinatesArray) {
        for(let i = 0; i < coordinatesArray.length; i++) {
            let coord = coordinatesArray[i];
            if (coord[0] > 9 || coord[0] < 0 || coord[1] > 9 || coord[1] < 0 || coord.toString() in this.board) {
                return false;
            }
        }

        return true;
    }

    placeShip(ship, coordinatesArray) {
        if (!this.isValidPlacement(coordinatesArray)) {
            return false;
        }

        coordinatesArray.forEach(coords => {
            this.board[coords.toString()] = ship;
        });
        this.ships.push(ship);

        return true;
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    generateProposedCoordinates(startX, startY, length, isHorizontal) {
        let path = [];

        for(let i = 0; i < length; i++) {
            if(isHorizontal) {
                path.push([startX + i, startY]);
            } else {
                path.push([startX, startY + i]);
            }
        }
        return path;
    }

    placeShipRandomly(ship) {
        let successfullyPlaced = false;
        while(!successfullyPlaced) {
            let xCoord = this.generateRandomNumber();
            let yCoord = this.generateRandomNumber();
            let isHorizontal = Math.random() < 0.5;
            let proposedCoords = this.generateProposedCoordinates(xCoord, yCoord, ship.length, isHorizontal);
            
            successfullyPlaced = this.placeShip(ship, proposedCoords);
        }
    }

    receiveAttack(coordinate) {
        if(coordinate.toString() in this.board) {
            this.board[coordinate.toString()].hit();
            return true;
        }

        this.missedAttacks.push(coordinate);
        return false;
    }

    isGameOver() {
        for(let i = 0; i < this.ships.length; i++) {
            if(this.ships[i].isSunk === false) {
                return false;
            }
        }

        return true;
    }
}