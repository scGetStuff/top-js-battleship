"use strict";

import * as Ship from "../ship.js";

test("test toString()", () => {
    const ship = Ship.factory(Ship.types.BATTLESHIP);
    expect(typeof ship.toString()).toEqual('string');
    expect(`${ship}`).toEqual('Battleship 4 - 0');
});

test("test hit()", () => {
    const ship = Ship.factory(Ship.types.PATROLBOAT);
    const ship2 = Ship.factory(Ship.types.BATTLESHIP);
    ship.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship.hits).toBe(1);
    expect(ship2.hits).toBe(3);
});

test("test isSunk()", () => {
    const ship = Ship.factory(Ship.types.PATROLBOAT);
    const ship2 = Ship.factory(Ship.types.BATTLESHIP);
    ship.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship.isSunk()).toBe(false);
    expect(ship2.isSunk()).toBe(true);
});
