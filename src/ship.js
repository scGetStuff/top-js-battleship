"use strict";

const types = {
    CARRIER: { name: "Carrier", length: 5 },
    BATTLESHIP: { name: "Battleship", length: 4 },
    DESTROYER: { name: "Destroyer", length: 3 },
    SUBMARINE: { name: "Submarine", length: 3 },
    PATROLBOAT: { name: "PatrolBoat", length: 2 },
};
Object.freeze(types);

const proto = {
    hit() {
        this.hits++;
    },

    isSunk() {
        return this.hits >= this.type.length;
    },

    toString() {
        return `${this.type.name} ${this.type.length} - ${this.hits}`;
    },
};

// TODO: need to figure out how to have the properties private
// the ief closure thing with accesor methods on the prototype
// just going to continue doing it wrong for now
function factory(type) {
    const obj = Object.create(proto);
    obj.hits = 0;
    obj.type = type;
    return obj;
}

export { factory, types };

function doStuff() {
    const ship = factory(types.BATTLESHIP);
    console.log(ship.toString());
}

// doStuff();
