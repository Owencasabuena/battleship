import { Player } from "../modules/player.js";

export function createBoard(boardElement, gameboard, revealShips = false) {
    boardElement.innerHTML = '';

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const cell = createCell(i, j);
            if (cell.dataset.coordinate in gameboard.board && revealShips) {
                cell.classList.add('ship');
            }
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

export function renderAttack(boardElement, coordinate, isHit) {
    const targetCell = boardElement.querySelector(`[data-coordinate="${coordinate}"]`);
    
    if (!targetCell) return;

    if (isHit) {
        targetCell.classList.add('hit');
    } else {
        targetCell.classList.add('miss');
    }
}