import {Game} from "./game";
import {Character} from "./character";
import {NEW_CHARACTER} from "./new-character";

export let NEW_GAME: Game = new Game({
    character: NEW_CHARACTER,
    notes: [],
    sessions: []
  }
);

