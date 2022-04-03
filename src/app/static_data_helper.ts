import * as clericSpellData from "../assets/cleric-spells.json"

export class StaticDataHelper {
  private static clericSpells: any = (clericSpellData as any).default;

  static getClericSpellData(){
    return this.clericSpells
  }
}
