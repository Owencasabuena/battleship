import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

test('Gameboard: Place ship', () => {
    const gameboard = new Gameboard();
    const ship = new Ship('destroyer', 3);
    gameboard.placeShip(ship, [[0,1], [0,2], [0,3]]);
    expect(gameboard.board['0,1']).toBe(ship);
})

test('Gameboard: Attack missed', () => {
    const gameboard = new Gameboard();
    const ship = new Ship('destroyer', 3);
    gameboard.placeShip(ship, [[0,1], [0,2], [0,3]]);
    expect(gameboard.receiveAttack([0,5])).toBe(false);
})

test('Gameboard: Attack hit', () => {
    const gameboard = new Gameboard();
    const ship = new Ship('destroyer', 3);
    gameboard.placeShip(ship, [[0,1], [0,2], [0,3]]);
    expect(gameboard.receiveAttack([0,1])).toBe(true);
})

test('Gameboard: Game continues', () => {
    const gameboard = new Gameboard();
    const ship = new Ship('destroyer', 3);
    gameboard.placeShip(ship, [[0,1], [0,2], [0,3]]);
    gameboard.receiveAttack([0,1]);
    expect(gameboard.isGameOver()).toBe(false);
})


test('Gameboard: Game ended', () => {
    const gameboard = new Gameboard();
    const ship = new Ship('destroyer', 3);
    gameboard.placeShip(ship, [[0,1], [0,2], [0,3]]);
    for(let i = 1; i <= 3; i++) {
        gameboard.receiveAttack([0,i]);
    }
    expect(gameboard.isGameOver()).toBe(true);
})