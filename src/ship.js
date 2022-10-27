"use strict";

function ship(len) {
    let hits = 0;
    let length = len;

    function hit() {
        hits++;
    }

    function isSunk() {
        return hits >= length;
    }

    return {
        hit,
        isSunk,
    };
}

export { ship };
