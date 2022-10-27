"use strict";

import { shipFactory } from "./ship.js";

test("creation with size 2", () => {
    const ship = shipFactory(2);
    expect(ship.length).toBe(2);
});

test("test hit()", () => {
    const ship = shipFactory(2);
    const ship2 = shipFactory(4);
    ship.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship.hits).toBe(1);
    expect(ship2.hits).toBe(3);
});

test("test isSunk()", () => {
    const ship = shipFactory(2);
    const ship2 = shipFactory(4);
    ship.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship.isSunk()).toBe(false);
    expect(ship2.isSunk()).toBe(true);
});
