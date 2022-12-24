"use strict";

import * as Board from "./board.js";
import * as Grid from "./grid.js";
import * as Cell from "./cell.js";
import * as Ship from "./ship.js";
import * as Player from "./player.js";
import * as AI from "./ai.js";

const cl = console.log;

function doStuff() {
    console.clear();

    const player = Player.factory("Scott");
    const ai = Player.factory("AI");

    AI.placeShips(player);
    AI.placeShips(ai);

    // player.board.gridShips.setAll();
    AI.doTurn(ai, player);
    console.log(ai.board.toString());
}

doStuff();
