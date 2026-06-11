import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(){
        this.gameboard = new Gameboard();
        this.previousMoves = new Set();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    makeRandomMove() {
        let xCoord = this.generateRandomNumber();
        let yCoord = this.generateRandomNumber();
        let randomMove = [xCoord, yCoord];
        while(this.previousMoves.has(randomMove.toString())) {
            xCoord = this.generateRandomNumber();
            yCoord = this.generateRandomNumber();
            randomMove = [xCoord, yCoord];
        }
        this.previousMoves.add(randomMove.toString());
        return randomMove;
    }
}