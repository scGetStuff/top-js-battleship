"use strict";

import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";

// N/S are inverted because of board orientation: (0,0) upper left; (9,9) lower right
// moving north meand lower on y axis
const directions = {
    NORTH: { x: 0, y: -1 },
    SOUTH: { x: 0, y: 1 },
    WEST: { x: -1, y: 0 },
    EAST: { x: 1, y: 0 },
};
Object.freeze(directions);

const proto = {
    isLoser() {
        let arr = Array.from(this.ships.keys());
        return arr.every((ship) => ship.isSunk());
    },

    recordShot(point = { x: 0, y: 0 }, type = Cell.types.MISS) {
        this.gridShots.cells[point.x][point.y].type = type;
    },

    receiveAttack(point = { x: 0, y: 0 }) {
        const targetCell = this.gridShips.cells[point.x][point.y];

        // if they repeat an existing shot
        const isBadShot =
            targetCell.type === Cell.types.HIT ||
            targetCell.type === Cell.types.MISS;
        // TODO: don't know how i'll handle this in UI yet, just throw for Jest validation
        if (isBadShot)
            throw new Error(`You already fired at this spot ${point}`);

        // check for a hit
        let status = Cell.types.MISS;
        if (targetCell.type === Cell.types.SHIP) {
            status = Cell.types.HIT;
            const ship = getShipFromPoint(this.ships, point);
            if (ship === null)
                throw new Error("This is not supposed to happen");
            ship.hit();

            // TODO: probably need a hook here to report sunk ship
        }
        targetCell.type = status;

        return status;
    },

    // there are a bunch of steps required to place a ship, but none of it is generic or repated
    // a bunch of inner functions is realy no different from block comments
    placeShip(
        type = Ship.types.BATTLESHIP,
        tailPoint = { x: 0, y: 0 },
        direction = directions.NORTH
    ) {
        const { ship, arrayOfPoints } = getShipByType(this.ships, type);
        const newPoints = [];

        // prevent out of bounds
        {
            const xEnd = tailPoint.x + direction.x * (ship.type.length - 1);
            const yEnd = tailPoint.y + direction.y * (ship.type.length - 1);
            if (xEnd < 0 || xEnd > 9 || yEnd < 0 || yEnd > 9)
                throw new Error(
                    "placeShip() fail. Ship would be out of bounds"
                );
        }

        // build list of cordinats for the ship
        {
            newPoints.push({ x: tailPoint.x, y: tailPoint.y });
            for (let i = 1; i < ship.type.length; i++)
                newPoints.push({
                    x: tailPoint.x + direction.x * i,
                    y: tailPoint.y + direction.y * i,
                });
        }

        // erase ship's current location so it can reposition over itself
        // order of code is important
        // this has to be done before checking for existing ship
        // i decided this is not a bug
        // ship would be removed here, but could throw error in next block
        // matches what you would phisicaly do in a real game
        {
            if (arrayOfPoints.length > 0) {
                arrayOfPoints.forEach((point) => {
                    const cell = this.gridShips.cells[point.x][point.y];
                    cell.type = Cell.types.WATER;
                });
                arrayOfPoints.length = 0;
            }
        }

        // check for existing ship at cords
        {
            const isWater = newPoints.every((point) => {
                const cell = this.gridShips.cells[point.x][point.y];
                return cell.type === Cell.types.WATER;
            });
            if (!isWater)
                throw new Error(
                    "placeShip() fail. Cannot place ships on top of others"
                );
        }

        // copy points into the ships map
        newPoints.forEach((point) => arrayOfPoints.push(point));

        // update grid with the ship
        arrayOfPoints.forEach((point) => {
            const cell = this.gridShips.cells[point.x][point.y];
            cell.type = Cell.types.SHIP;
        });
    },

    toString() {
        let arr = Array.from(this.ships.keys());
        arr = arr.map((ship) => ship.type.name);

        return (
            `Ships:\n${arr.join("\n")}` +
            `\n\nShot Grid:\n${this.gridShots.toString()}` +
            `\n\nShip Grid:\n${this.gridShips.toString()}\n`
        );
    },

    // TODO: may not want this, kind of just for testing
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

    // TODO: do something with shots grid, should records my shots against oponent
    obj.gridShips = Grid.factory();
    obj.gridShots = Grid.factory();

    // wiki said ships "may vary depending on the rules", kind of usless defaulting to 1 of each
    // ships Map is a container for the ship object and the array of points it occupies,
    // array is populated when the ship is placed
    obj.ships = new Map();
    for (let type in Ship.types) {
        // I need a referance to the property, not it's name
        type = Ship.types[type];
        obj.ships.set(Ship.factory(type), []);
    }

    return obj;
}

// these get functions would be private in the prototype if that was a thing
function getShipFromPoint(ships = new Map(), point = { x: 0, y: 0 }) {
    for (const [ship, arrayOfPoints] of ships) {
        const isMatch = arrayOfPoints.some(
            (shipPoint) => shipPoint.x === point.x && shipPoint.y === point.y
        );
        if (isMatch) return ship;
    }
    return null;
}
function getShipByType(ships = new Map(), type = Ship.types.BATTLESHIP) {
    for (const [ship, arrayOfPoints] of ships) {
        if (ship.type === type) return { ship, arrayOfPoints };
    }
    return null;
}

export { factory, directions };

function doStuff() {
    const board = factory();

    const isWater = board.gridShips.cells.every((row) =>
        row.every((cell) => cell.type === Cell.types.WATER)
    );
    console.log(isWater);

    console.log(board.isLoser());

    board.placeShip(Ship.types.BATTLESHIP, { x: 1, y: 1 }, directions.SOUTH);
    board.placeShip(Ship.types.BATTLESHIP, { x: 4, y: 5 }, directions.SOUTH);
    board.placeShip(Ship.types.DESTROYER, { x: 5, y: 5 }, directions.SOUTH);
    board.receiveAttack({ x: 4, y: 5 });
    // board.receiveAttack({ x: 4, y: 5 });

    board.recordShot({ x: 5, y: 5 }, Cell.types.MISS);
    console.log(board.toString());
}

// doStuff();
