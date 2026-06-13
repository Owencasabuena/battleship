import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(type){
        this.type = type;
        this.gameboard = new Gameboard();
        this.previousMoves = new Set();
        this.targetQueue = [];
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    makeMove() {
        while(this.targetQueue.length > 0) {
            let neighborCoord = this.targetQueue.shift();
            if (this.previousMoves.has(neighborCoord.toString())) {
                continue;
            }

            this.previousMoves.add(neighborCoord.toString());
            return neighborCoord;
        }

        let xCoord = this.generateRandomNumber();
        let yCoord = this.generateRandomNumber();
        let move = [xCoord, yCoord];

        while(this.previousMoves.has(move.toString())) {
            xCoord = this.generateRandomNumber();
            yCoord = this.generateRandomNumber();
            move = [xCoord, yCoord];
        }
        this.previousMoves.add(move.toString());
        return move;
    }

    reportHit(coordinate) {
        let neighborCoords = [
            [coordinate[0] + 1, coordinate[1]],
            [coordinate[0] - 1, coordinate[1]],
            [coordinate[0], coordinate[1] + 1],
            [coordinate[0], coordinate[1] - 1]
        ];

        neighborCoords.forEach(coord => {
            if (coord[0] > 9 || 
                coord[0] < 0 || 
                coord[1] > 9 || 
                coord[1] < 0 || 
                this.previousMoves.has(coord.toString()))
            {
                return;
            }

            this.targetQueue.push(coord);
        });
    }
}