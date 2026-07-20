import {Game} from "../game";

export interface CharacterSummary {
  id: string;
  name: string;
  classLevel: string;
  race: string;
  campaign: string;
  status: 'alive' | 'dead';
  hireling: boolean;
  updatedAt: string;
}

export function summarize(game: Game): CharacterSummary {
  return {
    id: game.id,
    name: game.character.name,
    classLevel: game.character.getConciseClassLevelString(),
    race: game.character.race,
    campaign: game.campaign,
    status: game.status,
    hireling: game.hireling,
    updatedAt: ''
  };
}
