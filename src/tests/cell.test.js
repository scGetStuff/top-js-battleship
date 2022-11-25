"use strict";

import * as Cell from "../cell.js";

test("test toString()", () => {
    const cell = Cell.factory(3, 4);
    expect(typeof cell.toString()).toEqual('string');
    expect(`${cell}`).toEqual("W[3,4]");
});
