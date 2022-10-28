"use strict";

import * as Board from "./board.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";

test("Create board", () => {
    const board = Board.factory();
    expect(board.gridShips).toBeDefined();
    expect(board.gridShots).toBeDefined();
    expect(board.ships).toBeDefined();
});

// test("test placeShip()", () => {
//     const board = Board.factory();
//     expect(board.placeShip()).toEqual(Cell.types.MISS);
// });

test("test receiveAttack()", () => {
    const board = Board.factory();
    expect(board.receiveAttack({ x: 5, y: 5 })).toEqual(Cell.types.MISS);
    expect(() => board.receiveAttack({ x: 5, y: 5 })).toThrow();
});
