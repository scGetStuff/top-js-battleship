"use strict";

import * as Player from "../player.js";

test("test toString()", () => {
    const player = Player.factory("Scott");
    expect(typeof player.toString()).toEqual('string');
    expect(`${player}`).toEqual('Scott');
});

