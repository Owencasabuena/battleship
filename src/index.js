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

const dockyard = document.querySelector('.dockyard');
fleetBlueprint.forEach(shipData => {
    const ship = document.createElement('div');
    ship.classList.add('ship-drag');
    ship.setAttribute('draggable', 'true');
    ship.dataset.length = shipData.length;
    ship.dataset.name = shipData.name;

    dockyard.appendChild(ship);
});

const ships = document.querySelectorAll('.ship-drag');
ships.forEach(ship => {
    ship.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('ship-length', event.target.dataset.length);
        event.dataTransfer.setData('ship-name', event.target.dataset.name);
    });
});

let player1;
let player2;
let playerBoardDiv;
let enemyBoardDiv;
let isHorizontal = true;

const rotateBtn = document.querySelector('#rotate-btn');
rotateBtn.addEventListener('click', () => {
    isHorizontal = !isHorizontal;
    dockyard.classList.toggle('vertical');
    if(isHorizontal) {
        rotateBtn.textContent = "Rotate Fleet: Horizontal";
    } else {
        rotateBtn.textContent = "Rotate Fleet: Vertical";
    }
});

function initGame() {
    player1 = new Player('human');
    player2 = new Player('computer');

    fleetBlueprint.forEach(shipData => {
        const p1Ship = new Ship(shipData.name, shipData.length);
        const p2Ship = new Ship(shipData.name, shipData.length);

        player2.gameboard.placeShipRandomly(p2Ship);
    });

    playerBoardDiv = document.querySelector('.player-board');
    playerBoardDiv.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    playerBoardDiv.addEventListener('drop', (event) => {
        if(!event.target.classList.contains('cell')) return;

        const shipLength = parseInt(event.dataTransfer.getData('ship-length'));
        const shipName = event.dataTransfer.getData('ship-name');
        const shipCoordinates = event.target.dataset.coordinate.split(',').map(Number);

        const ship = new Ship(shipName, shipLength);
        const startX = shipCoordinates[0];
        const startY = shipCoordinates[1];
        const fullShipCoordinates = [];
        for (let i = 0; i < shipLength; i++) {
            if (isHorizontal) {
                fullShipCoordinates.push([startX, startY + i]);
            } else {
                fullShipCoordinates.push([startX + i, startY]);
            }
        }
        const isPlacementSuccessful = player1.gameboard.placeShip(ship, fullShipCoordinates);
        if (isPlacementSuccessful) {
            playerBoardDiv.innerHTML = '';
            createBoard(playerBoardDiv, player1.gameboard, true);
            
            const selectedShip = document.querySelector(`[data-name="${shipName}"]`);
            selectedShip.remove();

            if(dockyard.children.length === 0) {
                enemyBoardDiv.addEventListener('click', handleBoardClick);
            }
        }
    });
    enemyBoardDiv = document.querySelector('.enemy-board');

    createBoard(playerBoardDiv, player1.gameboard, true);
    createBoard(enemyBoardDiv, player2.gameboard, false);
}

function handleBoardClick(event) {
    if (!event.target.classList.contains('cell') || 
        event.target.classList.contains('hit') || 
        event.target.classList.contains('miss')) {
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

    let generateMove = player2.makeMove();
    let computerAttack = player1.gameboard.receiveAttack(generateMove);
    if (computerAttack) {
        player2.reportHit(generateMove);
    }
    renderAttack(playerBoardDiv, generateMove, computerAttack);
    
    if(player1.gameboard.isGameOver()) {
        alert('You lose!');
        return;
    }
}

initGame();