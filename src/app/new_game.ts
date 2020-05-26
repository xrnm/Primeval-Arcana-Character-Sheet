import {Game} from "./game";
import {Character} from "./character";
import {NewCharacter} from "./new-character";
import {DefaultSettingsHelper} from "./default-settings-helper";

export let NEW_GAME: Game = new Game({
    character: new Character(DefaultSettingsHelper.character()),
    notes: [],
    sessions: []
  }
);

