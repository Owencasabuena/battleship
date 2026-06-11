export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.isSunk = this.checkIfSunk();
    }

    hit() {
        if (this.isSunk) return;

        this.hits++;
        this.isSunk = this.checkIfSunk();
    }

    checkIfSunk() {
        if (this.hits === this.length) {
            return true;
        }

        return false;
    }
}