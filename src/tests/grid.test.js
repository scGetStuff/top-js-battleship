"use strict";

import * as Grid from "../grid.js";

test("test toString()", () => {
    const grid = Grid.factory();
    expect(typeof grid.toString()).toEqual('string');
    // expect(`${grid}`).toEqual("");
});
