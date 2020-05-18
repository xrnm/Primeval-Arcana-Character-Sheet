import {Game} from "./game";
import {Character} from "./character";
import {NewCharacter} from "./new-character";

export let NEW_GAME: Game = new Game({
    character: new Character(NewCharacter.NEW_CHARACTER()),
    notes: [],
    sessions: []
  }
);

