"use strict";

import * as Cell from "./cell.js";

const SIZE = 10;

const proto = {
    // TODO: for testing a thing
    setAll(type = Cell.types.HIT) {
        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) this.cells[x][y].type = type;
        }
    },

    toString() {
        const out = [];
        let line;

        for (let y = 0; y < SIZE; y++) {
            line = "";
            for (let x = 0; x < SIZE; x++) {
                line += this.cells[x][y] + "  ";
            }
            out.push(line.trimEnd());
        }

        return out.join("\n");
    },
};

// 2D array of water cells
function factory() {
    const obj = Object.create(proto);

    const cells = new Array(SIZE);
    for (let x = 0; x < SIZE; x++) {
        cells[x] = new Array(SIZE);
        for (let y = 0; y < SIZE; y++) cells[x][y] = Cell.factory(x, y);
    }
    // TODO: i hate that i access this directly outside of this module
    // need private stuff, real language features
    obj.cells = cells;

    return obj;
}

export { factory, SIZE };

function doStuff() {
    const grid = factory();
    grid.cells[4][5].type = Cell.types.HIT;
    console.log(grid.toString());
}

// doStuff();
