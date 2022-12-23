"use strict";

import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";
import * as Board from "./board.js";

const proto = {
    // there is nothing to test for this, its just glue
    launchAttack(point = { x: 0, y: 0 }, enemyBoard) {
        const { status, sunkShipType } = enemyBoard.receiveAttack(point);
        this.board.recordShot(status);
        return { status, sunkShipType };
    },

    toString() {
        return `${this.name}`;
    },
};

function factory(name = "") {
    const obj = Object.create(proto);

    obj.name = name;
    obj.board = Board.factory();

    return obj;
}

export { factory };

function doStuff() {
    const player = factory("Scott");
    console.log(player.toString());
}

// doStuff();
