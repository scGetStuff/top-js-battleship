"use strict";

function component() {
    const element = document.createElement("div");
    element.innerText = "test";
    return element;
}

document.body.appendChild(component());
