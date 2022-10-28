"use strict";

import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";

// TODO: dependent on board orientation, currently folowing wiki
// 0,0 upper left 9,9 lower right, so N/S has to be backwards
const directions = {
    NORTH: { x: 0, y: -1 },
    SOUTH: { x: 0, y: 1 },
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

        if (targetCell.type === Cell.types.SHIP) {
            this.ships.get(targetCell.shipRef).hit();
            return (targetCell.type = Cell.types.HIT);
        }

        return (targetCell.type = Cell.types.MISS);
    },

    placeShip(type, tailPoint = { x: 0, y: 0 }, direction) {
        const { ship, arrayOfPoints } = this.ships.get(type);

        // prevent out of bounds
        const xEnd = tailPoint.x + direction.x * (ship.type.length - 1);
        const yEnd = tailPoint.y + direction.y * (ship.type.length - 1);
        if (xEnd < 0 || xEnd > 9 || yEnd < 0 || yEnd > 9)
            throw new Error("placeShip() fail. Ship would be out of bounds");

        // TODO: incase i need to handle repositioning
        if (arrayOfPoints.length > 0) arrayOfPoints = [];

        // build list of cordinats for the ship
        arrayOfPoints.push({ x: tailPoint.x, y: tailPoint.y });
        for (let i = 1; i < ship.type.length; i++)
            arrayOfPoints.push({
                x: tailPoint.x + direction.x * i,
                y: tailPoint.y + direction.y * i,
            });

        // update grid
        arrayOfPoints.forEach((point) => {
            const cell = this.gridShips.cells[point.y][point.x];
            cell.type = Cell.types.SHIP;
            cell.shipRef = ship;
        });
    },
};

function factory() {
    const obj = Object.create(proto);

    // TODO: wiki said ships "may vary depending on the rules", kind of usless
    // defaulting to 1 of each
    obj.ships = new Map();

    for (let type in Ship.types) {
        // I need the propert object, not it's name
        type = Ship.types[type];
        obj.ships.set(type, { ship: Ship.factory(type), arrayOfPoints: [] });
    }

    obj.gridShips = Grid.factory();
    obj.gridShots = Grid.factory();

    return obj;
}

export { factory };

function doStuff() {
    const board = factory();

    board.placeShip(Ship.types.BATTLESHIP, { x: 4, y: 5 }, directions.EAST);

    const { ship, arrayOfPoints } = board.ships.get(Ship.types.BATTLESHIP);
    console.log(arrayOfPoints);
    console.log(board.gridShips.toString());
}

doStuff();
