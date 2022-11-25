"use strict";

import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";

// TODO: dependent on board orientation, currently folowing wiki
// 0,0 upper left 9,9 lower right, so N/S has to be backwards
const directions = {
    NORTH: { x: 0, y: 1 },
    SOUTH: { x: 0, y: -1 },
    WEST: { x: -1, y: 0 },
    EAST: { x: 1, y: 0 },
};
Object.freeze(directions);

const proto = {
    receiveAttack(point = { x: 0, y: 0 }) {
        // TODO: don't know how i'll handle this in UI yet, just throw for Jest
        // validation, if they repeat an existing shot
        const targetShot = this.gridShots.cells[point.y][point.x];
        if (
            targetShot.type === Cell.types.HIT ||
            targetShot.type === Cell.types.MISS
        )
            throw new Error(`You already fired at this spot ${point}`);

        // check for a hit
        targetShot.type = Cell.types.MISS;
        const targetCell = this.gridShips.cells[point.y][point.x];
        if (targetCell.type === Cell.types.SHIP) {
            targetShot.type = Cell.types.HIT;
            const { ship } = this.ships.get(targetCell.shipTypeRef);
            ship.hit();

            // TODO: probably need a hook here to report sunk ship
        }

        return targetShot.type;
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

        // check for existing ship at cords
        const isWater = arrayOfPoints.every((point) => {
            const cell = this.gridShips.cells[point.y][point.x];
            return cell.type === Cell.types.WATER;
        });
        if (!isWater)
            throw new Error(
                "placeShip() fail. Cannot place ships on top of others"
            );

        // update grid
        arrayOfPoints.forEach((point) => {
            const cell = this.gridShips.cells[point.y][point.x];
            cell.type = Cell.types.SHIP;
            cell.shipTypeRef = ship.type;
        });
    },

    toString() {
        let arr = Array.from(this.ships.keys());
        arr = arr.map((element) => element.name);

        return (
            `Ships:\n${arr.join("\n")}` +
            `\n\nShot Grid:\n${this.gridShots.toString()}` +
            `\n\nShip Grid:\n${this.gridShips.toString()}\n`
        );
    },

    // TODO: may not want to do this, kind of just testing
    defaultPlaceShips() {
        let i = 0;
        for (let type in Ship.types) {
            type = Ship.types[type];
            this.placeShip(type, { x: i++, y: 1 }, directions.NORTH);
        }
    },
};

function factory() {
    const obj = Object.create(proto);

    // TODO: i'm using this wrong in receiveAttack()
    // not sure what shots is suposed to record; i think it should be my shots
    // against oponent and I should have hits and miss on from receiveAttack go to ship grid
    obj.gridShips = Grid.factory();
    obj.gridShots = Grid.factory();

    // TODO: wiki said ships "may vary depending on the rules", kind of usless
    // defaulting to 1 of each
    obj.ships = new Map();
    for (let type in Ship.types) {
        // I need a referance to the property, not it's name
        type = Ship.types[type];
        // TODO: i think i want to change arrayOfPoints to arrayOfCells and make it
        // referances to the gridShips cells that the ship uses on placeShip()
        // to get rid of Cell.shipTypeRef
        obj.ships.set(type, { ship: Ship.factory(type), arrayOfPoints: [] });
    }

    return obj;
}

export { factory, directions };

function doStuff() {
    const board = factory();

    board.defaultPlaceShips();
    console.log(board.toString());
    return;

    const isWater = board.gridShips.cells.every((row) =>
        row.every((cell) => cell.type === Cell.types.WATER)
    );
    console.log(isWater);

    board.placeShip(Ship.types.BATTLESHIP, { x: 4, y: 5 }, directions.NORTH);
    board.placeShip(Ship.types.DESTROYER, { x: 5, y: 5 }, directions.NORTH);
    board.receiveAttack({ x: 4, y: 5 });
    // board.receiveAttack({ x: 4, y: 5 });

    const { ship, arrayOfPoints } = board.ships.get(Ship.types.BATTLESHIP);
    // console.log(arrayOfPoints);
    console.log(board.gridShips.toString());
    console.log("\n");
    console.log(board.gridShots.toString());
}

doStuff();
