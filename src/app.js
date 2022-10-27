"use strict";

import { ship } from "./ship.js";

const cl = console.log;

function doStuff() {
    console.clear();

    const ship1 = ship(2);
    const ship2 = ship(4);

    cl(ship1.hit == ship2.hit);
}

doStuff();
