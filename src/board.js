"use strict";

import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";

const directions = {
    NORTH: { x: 0, y: 1 },
    SOUTH: { x: 0, y: -1 },
    WEST: { x: -1, y: 0 },
    EAST: { x: 1, y: 0 },
};

const proto = {
    receiveAttack(point = { x: 0, y: 0 }) {
        // TODO: validation, if they repeat an existing shot
        // don't know how i'll handle this in UI yet, just throw for Jest
        const targetCell = this.gridShips.cells[point.x][point.y];
        if (
            targetCell.type === Cell.types.HIT ||
            targetCell.type === Cell.types.MISS
        )
            throw new Error(`You already fired at this spot ${point}`);

        // TODO: need to connect to the ship and call hit()
        if (targetCell.type === Cell.types.SHIP)
            return (targetCell.type = Cell.types.HIT);

        return (targetCell.type = Cell.types.MISS);
    },

    placeShip(type, tailPoint = { x: 0, y: 0 }, direction) {},
};

function factory() {
    let obj = Object.create(proto);

    obj.ships = [];
    // TODO: wiki said ships "may vary depending on the rules", kind of usless
    // defaulting to 1 of each
    for (const type in Ship.types) obj.ships.push(Ship.factory(type));

    obj.gridShips = Grid.factory();
    obj.gridShots = Grid.factory();

    return obj;
}

export { factory };

(function doStuff() {
    const board = factory();
})();
