"use strict";

import * as Cell from "./cell.js";
import * as Grid from "./grid.js";
import * as Player from "./player.js";

function placeShips(player) {
    player.board.defaultPlaceShips();
}

// TODO: first draft
// ignore errors and try again, incase random selects a cell already shot
// don't want infinite loop, so limit
function doTurn(player, enemy) {
    let count = 0;
    const limit = Grid.SIZE * Grid.SIZE;
    let status = null;
    let sunkShipType = null;

    do {
        const cell = pickCell();
        console.dir(cell);

        try {
            const obj = player.launchAttack(cell, enemy);
            status = obj.status;
            sunkShipType = obj.sunkShipType;
        } catch (error) {
            console.log(error);
            continue;
        }
        break;
    } while (count++ < limit);

    if (count === limit)
        throw new Error("doTurn() : This is not supposed to happen");

    return { status, sunkShipType };
}

function pickCell() {
    return { x: randomNum(), y: randomNum() };
}

function randomNum() {
    return Math.floor(Math.random() * Grid.SIZE);
}

export { placeShips, doTurn };
