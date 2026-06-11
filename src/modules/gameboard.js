export class Gameboard {
    constructor() {
        this.board = {};
        this.missedAttacks = [];
        this.ships = [];
    }
    
    placeShip(ship, coordinatesArray) {
        // ToDo: check if coordinatesArray is valid like within the range or no ship

        //  loop 
        coordinatesArray.forEach(coords => {
            this.board[coords.toString()] = ship;
        });
        this.ships.push(ship);
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