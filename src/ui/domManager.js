import { Player } from "../modules/player.js";

function createBoard(boardElement, gameboard) {
    boardElement.innerHTML = '';

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const cell = createCell(i, j);
            boardElement.append(cell);
        }
        
    }
}

function createCell(x, y) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.coordinate = `${x},${y}`
    return cell;
}