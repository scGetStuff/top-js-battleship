# top-js-battleship
The Odin Project, Full Stack JavaScript Path, JavaScript, Testing JavaScript, Project: Battleship

## Notes
- Using Jest to test modules only, not anything in UI.
- Jest and Webpack set up for ES6 modules.
- Using factory functions for this project.
- The default parameters all over the place are because I haven't switched to typescript yet, I do it to kind of define types for parameters

## TODO
- point object?  using literal all over the place
- need to catch errors and display message, probably in the game control code

#### game
- going to need validation code somewhere to make sure all ships are placed; could just initialize with  defaultPlaceShips() function
- AI will be random first
- check status of attack to see if a ship sunk;
- Player code barely does anything, may just do it in game code

#### UI plan
- add ability to place ships; start with static; maybe drag and drop with rotate buttons
- red X for hit, black O for miss
- change display when a hit sinks a ship, show which one it was
