"use strict";

import * as Board from "../board.js";
import * as Cell from "../cell.js";
import * as Ship from "../ship.js";

test("Create board", () => {
    const board = Board.factory();
    expect(board.gridShips).toBeDefined();
    expect(board.gridShots).toBeDefined();
    expect(board.ships).toBeDefined();
});

test("test placeShip() on empty board", () => {
    const board = Board.factory();

    expect(isWater()).toBe(true);
    board.placeShip(
        Ship.types.BATTLESHIP,
        { x: 4, y: 5 },
        Board.directions.NORTH
    );
    expect(isWater()).toBe(false);

    function isWater() {
        return board.gridShips.cells.every((row) =>
            row.every((cell) => cell.type === Cell.types.WATER)
        );
    }
});

test("test placeShip() out of bounds", () => {
    const board = Board.factory();

    expect(() =>
        board.placeShip(
            Ship.types.BATTLESHIP,
            { x: 1, y: 1 },
            Board.directions.NORTH
        )
    ).toThrow();

    expect(() =>
        board.placeShip(
            Ship.types.BATTLESHIP,
            { x: 1, y: 1 },
            Board.directions.WEST
        )
    ).toThrow();
});

test("test receiveAttack()", () => {
    const board = Board.factory();
    let { status, sunkShipType } = board.receiveAttack({ x: 4, y: 5 });
    expect(status).toEqual(Cell.types.MISS);
    expect(() => board.receiveAttack({ x: 4, y: 5 })).toThrow();

    board.placeShip(
        Ship.types.PATROLBOAT,
        { x: 0, y: 1 },
        Board.directions.NORTH
    );
    ({ status, sunkShipType } = board.receiveAttack({ x: 0, y: 0 }));
    expect(status).toEqual(Cell.types.HIT);
    expect(sunkShipType).toEqual(null);
    ({ status, sunkShipType } = board.receiveAttack({ x: 0, y: 1 }));
    expect(status).toEqual(Cell.types.HIT);
    expect(sunkShipType).toEqual(Ship.types.PATROLBOAT);
});
