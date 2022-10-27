"use strict";

const proto = {
    drive() {
        console.log("Vroom!");
    },

    hit() {
        hits++;
    },

    isSunk() {
        return hits >= length;
    },
};

function ship(len) {
    let obj = Object.create(proto);
    obj.hits = 0;
    obj.length = len;
    return obj;
}

export { ship };
