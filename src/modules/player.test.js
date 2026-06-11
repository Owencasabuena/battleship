import { Player } from "./player.js";

test('Player: player spawned', () => {
    const player = new Player('real');
    expect(player.gameboard).toBeDefined();
});

test('Player: Computer attack', () => {
    const computer = new Player('computer');
    const moves = new Set();
    for(let i = 0; i < 100; i++) {
        let move =computer.makeRandomMove();
        moves.add(move.toString());
    }
    expect(moves.size).toBe(100);
})