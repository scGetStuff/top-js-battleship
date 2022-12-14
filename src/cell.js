"use strict";

const types = {
    WATER: { name: "W", value: 0 },
    MISS: { name: "M", value: 1 },
    SHIP: { name: "S", value: 2 },
    HIT: { name: "H", value: 3 },
};
Object.freeze(types);

const proto = {
    toString() {
        return `${this.type.name}[${this.x},${this.y}]`;
    },
};

function factory(x, y, type = types.WATER) {
    const obj = Object.create(proto);
    obj.x = x;
    obj.y = y;
    obj.type = type;
    return obj;
}

export { factory, types };

function doStuff() {
    const cell = factory(4, 5);
    console.log(cell.toString());
}

// doStuff();
