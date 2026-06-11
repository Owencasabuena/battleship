import { Ship } from "./ship.js";

test('Ship take hit', () => {
    const ship = new Ship('destroyer', 3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('Ship sunks', () => {
    const ship = new Ship('Tank', 5);
    for(let i = 0; i < 5; i++) {
        ship.hit();
    }
    expect(ship.checkIfSunk()).toBe(true);
});

test('check if ship hit when already sank', () => {
    const ship = new Ship('Commander', 3);
    for(let i = 0; i < 5; i++) {
        ship.hit();
    }
    expect(ship.hits).toBe(3);
});