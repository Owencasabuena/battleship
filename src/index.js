import './style.css';
import { Ship } from "./modules/ship.js";
import { Player } from "./modules/player.js";
import { createBoard, renderAttack } from "./ui/domManager.js";

const fleetBlueprint = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Destroyer', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Patrol Boat', length: 2 }
];

let player1;
let player2;
let playerBoardDiv;
let enemyBoardDiv;

function initGame() {
    player1 = new Player('human');
    player2 = new Player('computer');

    fleetBlueprint.forEach(shipData => {
        const p1Ship = new Ship(shipData.name, shipData.length);
        const p2Ship = new Ship(shipData.name, shipData.length);

        player1.gameboard.placeShipRandomly(p1Ship);
        player2.gameboard.placeShipRandomly(p2Ship);
    });

    playerBoardDiv = document.querySelector('.player-board');
    enemyBoardDiv = document.querySelector('.enemy-board');

    createBoard(playerBoardDiv, player1.gameboard, true);
    createBoard(enemyBoardDiv, player2.gameboard, false);

    enemyBoardDiv.addEventListener('click', handleBoardClick);
}

function handleBoardClick(event) {
    if (!event.target.classList.contains('cell')) {
        return;
    }

    const targetCoordinate = event.target.dataset.coordinate;
    playRound(targetCoordinate);
}

function playRound(targetCoordinate) {
    let playerAttack = player2.gameboard.receiveAttack(targetCoordinate);
    renderAttack(enemyBoardDiv, targetCoordinate, playerAttack);
    
    if(player2.gameboard.isGameOver()) {
        alert('You won!');
        return;
    }
   
    let generateMove = player2.makeRandomMove();
    let computerAttack = player1.gameboard.receiveAttack(generateMove);
    renderAttack(playerBoardDiv, generateMove, computerAttack);
    
    if(player1.gameboard.isGameOver()) {
        alert('You lose!');
        return;
    }
}

initGame();