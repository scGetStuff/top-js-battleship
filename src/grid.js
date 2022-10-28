"use strict";

import * as Cell from "./cell.js";

const SIZE = 10;

const proto = {
    toString() {
        const out = [];
        let line;
        for (let i = SIZE - 1; i >= 0; i--) {
            line = "";
            for (let j = 0; j < SIZE; j++) {
                line += this.cells[i][j] + "  ";
            }
            out.push(line.trimEnd());
        }
        return out.join("\n");
    },
};

// 2D array of water cells
function factory() {
    let obj = Object.create(proto);

    const cells = new Array(SIZE);
    for (let i = 0; i < SIZE; i++) cells[i] = new Array(SIZE);

    for (let i = 0; i < SIZE; i++)
        for (let j = 0; j < SIZE; j++) cells[i][j] = Cell.factory(i, j);

    obj.cells = cells;

    return obj;
}

export { factory };

function doStuff() {
    const grid = factory();
    grid.cells[5][5].type = Cell.types.HIT;

    console.log(grid.toString());
}

// doStuff();
