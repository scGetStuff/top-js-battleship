"use strict";

import * as Board from "./board.js";
import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";

const cl = console.log;

function doStuff() {
    console.clear();

    const board = Board.factory();
    board.defaultPlaceShips();
    board.placeShip(
        Ship.types.BATTLESHIP,
        { x: 4, y: 5 },
        Board.directions.EAST
    );
    board.placeShip(
        Ship.types.BATTLESHIP,
        { x: 5, y: 6 },
        Board.directions.SOUTH
    );
    cl(board.toString());
}

doStuff();
