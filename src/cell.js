"use strict";

const types = {
    WATER: { name: "W", value: 0 },
    MISS: { name: "M", value: 1 },
    SHIP: { name: "S", value: 2 },
    HIT: { name: "H", value: 3 },
};

const proto = {
    toString() {
        return `${this.type.name}[${this.x},${this.y}]`;
    },
};

function factory(x, y, type = types.WATER) {
    let obj = Object.create(proto);
    obj.x = x;
    obj.y = y;
    obj.type = type;
    return obj;
}

export { factory, types };
