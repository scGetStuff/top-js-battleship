"use strict";

import { shipFactory } from "./ship.js";

const cl = console.log;

function doStuff() {
    console.clear();

    const ship1 = shipFactory(2);
    const ship2 = shipFactory(4);

    cl(ship1.hit === ship2.hit);
    cl(ship1.length);

    ship1.hit();
    
}

doStuff();
