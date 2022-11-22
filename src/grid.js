"use strict";

import * as Cell from "./cell.js";

const SIZE = 10;

const proto = {
    toString() {
        const out = [];
        let line;

        for (let r = SIZE-1; r >= 0; r--) {
            line = "";
            for (let c = 0; c < SIZE; c++) {
                line += this.cells[r][c] + "  ";
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
    for (let r = 0; r < SIZE; r++) {
        cells[r] = new Array(SIZE);
        for (let c = 0; c < SIZE; c++) cells[r][c] = Cell.factory(c, r);
    }
    obj.cells = cells;

    return obj;
}

export { factory };

function doStuff() {
    const grid = factory();
    grid.cells[4][5].type = Cell.types.HIT;
    console.log(grid.toString());
}

// doStuff();
