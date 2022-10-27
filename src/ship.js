"use strict";

const proto = {
    hit() {
        this.hits++;
    },

    isSunk() {
        return this.hits >= this.length;
    },
};

function shipFactory(len) {
    let obj = Object.create(proto);
    obj.hits = 0;
    obj.length = len;
    return obj;
}

export { shipFactory };
