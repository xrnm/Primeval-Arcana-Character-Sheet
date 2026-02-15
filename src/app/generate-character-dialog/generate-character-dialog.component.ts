import {Component, OnInit} from '@angular/core';
import {CharacterGeneratorService} from '../character-generator.service';
import {GeneratorOptions} from '../generator-options';
import {DiceHelper} from '../dice-helper';
import {AttributeTablesHelper} from '../attribute-tables-helper';
import {NameGeneratorHelper} from '../name-generator-helper';
import {Character} from '../character';
import {SpellSlotHelper} from '../spell-slot-helper';
import {MatDialogRef} from '@angular/material/dialog';
import {Item} from '../item';
import {Container} from '../container';
import {EquipmentLoadoutHelper, EquipmentItem, LoadoutDefinition} from '../equipment-loadout-helper';

interface SpellEntry {
  level: number;
  name: string;
}

@Component({
  selector: 'app-generate-character-dialog',
  templateUrl: './generate-character-dialog.component.html',
  styleUrls: ['./generate-character-dialog.component.sass']
})
export class GenerateCharacterDialogComponent implements OnInit {
  // Step 1: Class & Level
  characterClass: string;
  level: number = 1;
  abilities = {
    strength: 0, intelligence: 0, wisdom: 0,
    dexterity: 0, constitution: 0, charisma: 0
  };

  // Step 2: Identity
  name: string = '';
  useTitle: boolean = false;
  multiBarrel: boolean = false;
  sex: string = '';
  alignment: string = '';

  // Step 3: Physical
  ageCategory: string = '';
  weightClass: string = '';
  eyeColor: string = '';
  hairColor: string = '';
  hairType: string = '';
  hairLength: string = '';
  skinColor: string = '';

  // Step 4: Background
  profession: string = '';
  dentalStatus: string = '';
  identifyingQuality: boolean = false;
  identifyingQualityText: string = '';

  // Step 5: Equipment
  selectedWeapons: EquipmentItem[] = [];
  selectedArmor: EquipmentItem[] = [];
  selectedLoadout: string = 'none';
  deductGold: boolean = true;
  startingGold: number = 0;
  weaponOptions: EquipmentItem[];
  armorOptions: EquipmentItem[];
  loadoutOptions: LoadoutDefinition[];

  // Step 6: Class-Specific
  deityName: string = '';
  deityDomain: string = '';
  deityEdict: string = '';
  deityAnathema: string = '';
  muSpells: SpellEntry[] = [];

  // Dropdown options
  classes = ['Fighter', 'Cleric', 'Magic User'];
  sexes = ['Male', 'Female'];
  alignments = ['Lawful', 'Neutral', 'Chaotic'];
  ageCategories = ['Younger', 'Older'];
  weightClasses = ['Light', 'Average', 'Heavy'];

  eyeColorOptions: string[];
  hairColorOptions: string[];
  hairTypeOptions: string[];
  hairLengthOptions: string[];
  skinColorOptions: string[];
  dentalOptions: string[];
  professionOptions: string[];
  domains: string[];
  edicts: string[];
  anathemas: string[];
  identifyingQualityOptions: string[];

  constructor(
    private generatorService: CharacterGeneratorService,
    private dialogRef: MatDialogRef<GenerateCharacterDialogComponent>
  ) {}

  ngOnInit(): void {
    this.eyeColorOptions = [...new Set(AttributeTablesHelper.EYE_COLORS)];
    this.hairColorOptions = [...new Set(AttributeTablesHelper.HAIR_COLORS)];
    this.hairTypeOptions = [...new Set(AttributeTablesHelper.HAIR_TYPES)];
    this.hairLengthOptions = [...new Set(AttributeTablesHelper.HAIR_LENGTHS)];
    this.skinColorOptions = [...new Set(AttributeTablesHelper.SKIN_COLORS)];
    this.dentalOptions = [...new Set(AttributeTablesHelper.DENTAL_STATUSES)];
    this.professionOptions = [...new Set(AttributeTablesHelper.PROFESSIONS)].sort();
    this.domains = AttributeTablesHelper.DOMAINS;
    this.edicts = AttributeTablesHelper.EDICTS;
    this.anathemas = AttributeTablesHelper.ANATHEMAS;
    this.identifyingQualityOptions = AttributeTablesHelper.IDENTIFYING_QUALITIES;

    this.weaponOptions = EquipmentLoadoutHelper.getWeapons();
    this.armorOptions = EquipmentLoadoutHelper.getArmor();
    this.loadoutOptions = EquipmentLoadoutHelper.getLoadouts();
    this.startingGold = DiceHelper.roll(6, 3) * 10;

    this.characterClass = this.generatorService.randomClass();
    this.rollAbilities();
    this.randomizeIdentity();
    this.randomizePhysical();
    this.randomizeBackground();
    this.randomizeClassSpecific();
  }

  // Step 1
  rollAbilities(): void {
    this.abilities = {
      strength: DiceHelper.roll(6, 3),
      intelligence: DiceHelper.roll(6, 3),
      wisdom: DiceHelper.roll(6, 3),
      dexterity: DiceHelper.roll(6, 3),
      constitution: DiceHelper.roll(6, 3),
      charisma: DiceHelper.roll(6, 3),
    };
  }

  rerollClass(): void {
    this.characterClass = this.generatorService.randomClass();
    this.rebuildMuSpells();
  }

  onClassChange(): void {
    this.rebuildMuSpells();
  }

  onLevelChange(): void {
    this.rebuildMuSpells();
  }

  // Step 2
  randomizeIdentity(): void {
    this.name = NameGeneratorHelper.generate(this.useTitle, this.multiBarrel);
    this.sex = DiceHelper.pick(['Male', 'Female']);
    this.alignment = DiceHelper.pick(['Lawful', 'Neutral', 'Chaotic']);
  }

  generateName(): void {
    this.name = NameGeneratorHelper.generate(this.useTitle, this.multiBarrel);
  }

  // Step 3
  randomizePhysical(): void {
    this.ageCategory = DiceHelper.pick(['Younger', 'Older']);
    this.weightClass = DiceHelper.pick(['Light', 'Average', 'Heavy']);
    this.eyeColor = DiceHelper.pick(AttributeTablesHelper.EYE_COLORS);
    this.hairColor = DiceHelper.pick(AttributeTablesHelper.HAIR_COLORS);
    this.hairType = DiceHelper.pick(AttributeTablesHelper.HAIR_TYPES);
    this.hairLength = DiceHelper.pick(AttributeTablesHelper.HAIR_LENGTHS);
    this.skinColor = DiceHelper.pick(AttributeTablesHelper.SKIN_COLORS);
  }

  // Step 4
  randomizeBackground(): void {
    this.profession = DiceHelper.pick(AttributeTablesHelper.PROFESSIONS);
    this.dentalStatus = DiceHelper.pick(AttributeTablesHelper.DENTAL_STATUSES);
    this.identifyingQualityText = DiceHelper.pick(AttributeTablesHelper.IDENTIFYING_QUALITIES);
  }

  // Step 5: Equipment
  rerollGold(): void {
    this.startingGold = DiceHelper.roll(6, 3) * 10;
  }

  getSelectedLoadout(): LoadoutDefinition {
    if (this.selectedLoadout === 'none') return null;
    return this.loadoutOptions.find(l => l.name === this.selectedLoadout);
  }

  equipmentCostCopper(): number {
    let cost = 0;
    for (const w of this.selectedWeapons) {
      cost += w.price;
    }
    for (const a of this.selectedArmor) {
      cost += a.price;
    }
    const loadout = this.getSelectedLoadout();
    if (loadout) {
      cost += loadout.totalCost;
    }
    return cost;
  }

  equipmentWeight(): number {
    let weight = 0;
    for (const w of this.selectedWeapons) {
      weight += w.weight;
    }
    for (const a of this.selectedArmor) {
      weight += a.weight;
    }
    const loadout = this.getSelectedLoadout();
    if (loadout) {
      weight += EquipmentLoadoutHelper.loadoutWeight(loadout);
    }
    return weight;
  }

  remainingCopper(): number {
    return this.startingGold * 100 - this.equipmentCostCopper();
  }

  estimatedMaxLoad(): number {
    const prime = CharacterGeneratorService.CLASS_PRIMES[this.characterClass];
    const baseStr = this.abilities.strength;
    const adjustedStr = prime === 'strength' ? baseStr + this.level : baseStr;
    return adjustedStr * 150;
  }

  estimatedMovement(): number {
    const maxLoad = this.estimatedMaxLoad();
    if (maxLoad <= 0) return 0;
    const encumbrance = this.equipmentWeight() / maxLoad;
    if (encumbrance <= 0.25) return 120;
    if (encumbrance <= 0.333) return 90;
    if (encumbrance <= 0.50) return 60;
    if (encumbrance <= 1) return 30;
    if (encumbrance <= 2) return 15;
    return 0;
  }

  formatGp(copper: number): string {
    const negative = copper < 0;
    const abs = Math.abs(copper);
    const gp = Math.floor(abs / 100);
    const sp = Math.floor((abs % 100) / 10);
    const cp = abs % 10;
    let result = negative ? '-' : '';
    result += gp + 'gp';
    if (sp > 0) result += ' ' + sp + 'sp';
    if (cp > 0) result += ' ' + cp + 'cp';
    return result;
  }

  // Step 6: Class-Specific
  randomizeClassSpecific(): void {
    this.deityName = NameGeneratorHelper.generate(false, false);
    this.deityDomain = DiceHelper.pick(AttributeTablesHelper.DOMAINS);
    this.deityEdict = DiceHelper.pick(AttributeTablesHelper.EDICTS);
    this.deityAnathema = DiceHelper.pick(AttributeTablesHelper.ANATHEMAS);
    this.randomizeMuSpells();
  }

  // MU Spell management
  private pickUniqueSpell(level: number, taken: string[]): string {
    const options = this.spellOptionsForLevel(level);
    const available = options.filter(s => !taken.includes(s));
    if (available.length === 0) return DiceHelper.pick(options);
    return DiceHelper.pick(available);
  }

  rebuildMuSpells(): void {
    if (this.characterClass !== 'Magic User' || this.level < 1) {
      this.muSpells = [];
      return;
    }
    const slots = SpellSlotHelper.magicUserSpellSlots(this.level);
    const newSpells: SpellEntry[] = [];
    slots.forEach((count, levelIndex) => {
      const spellLevel = levelIndex + 1;
      const existing = this.muSpells.filter(s => s.level === spellLevel);
      const taken: string[] = [];
      for (let i = 0; i < count; i++) {
        if (existing[i]) {
          newSpells.push(existing[i]);
          taken.push(existing[i].name);
        } else {
          const name = this.pickUniqueSpell(spellLevel, taken);
          newSpells.push({level: spellLevel, name});
          taken.push(name);
        }
      }
    });
    this.muSpells = newSpells;
  }

  randomizeMuSpells(): void {
    if (this.characterClass !== 'Magic User' || this.level < 1) {
      this.muSpells = [];
      return;
    }
    const slots = SpellSlotHelper.magicUserSpellSlots(this.level);
    const newSpells: SpellEntry[] = [];
    slots.forEach((count, levelIndex) => {
      const spellLevel = levelIndex + 1;
      const taken: string[] = [];
      for (let i = 0; i < count; i++) {
        const name = this.pickUniqueSpell(spellLevel, taken);
        newSpells.push({level: spellLevel, name});
        taken.push(name);
      }
    });
    this.muSpells = newSpells;
  }

  getSpellLevels(): number[] {
    if (this.characterClass !== 'Magic User' || this.level < 1) return [];
    const slots = SpellSlotHelper.magicUserSpellSlots(this.level);
    return Array.from({length: slots.length}, (_, i) => i + 1);
  }

  getSpellsForLevel(level: number): SpellEntry[] {
    return this.muSpells.filter(s => s.level === level);
  }

  spellOptionsForLevel(level: number): string[] {
    return AttributeTablesHelper.MAGIC_USER_SPELLS_BY_LEVEL[level] || [];
  }

  addSpell(level: number): void {
    const taken = this.getSpellsForLevel(level).map(s => s.name);
    this.muSpells.push({level, name: this.pickUniqueSpell(level, taken)});
  }

  removeSpell(spell: SpellEntry): void {
    const idx = this.muSpells.indexOf(spell);
    if (idx >= 0) this.muSpells.splice(idx, 1);
  }

  isCleric(): boolean {
    return this.characterClass === 'Cleric';
  }

  isMagicUser(): boolean {
    return this.characterClass === 'Magic User';
  }

  hasClassSpecificStep(): boolean {
    return this.isCleric() || this.isMagicUser();
  }

  buildAndFinish(): void {
    const options: GeneratorOptions = {
      characterClass: this.characterClass,
      level: this.level,
      abilities: {...this.abilities},
      name: this.name,
      useTitle: this.useTitle,
      multiBarrel: this.multiBarrel,
      sex: this.sex.toLowerCase(),
      alignment: this.alignment,
      ageCategory: this.ageCategory.toLowerCase(),
      weightClass: this.weightClass.toLowerCase(),
      eyeColor: this.eyeColor,
      hairColor: this.hairColor,
      hairType: this.hairType,
      hairLength: this.hairLength,
      skinColor: this.skinColor,
      profession: this.profession,
      dentalStatus: this.dentalStatus,
      identifyingQuality: this.identifyingQuality,
      identifyingQualityText: this.identifyingQuality ? this.identifyingQualityText : undefined,
      startingGold: this.deductGold ? Math.floor(Math.max(0, this.remainingCopper()) / 100) : this.startingGold,
    };

    if (this.isCleric()) {
      options.deityName = this.deityName;
    }

    const character = this.generatorService.generateCharacter(options);

    // Set silver/copper remainder if deducting
    if (this.deductGold) {
      const remainCp = Math.max(0, this.remainingCopper());
      character.purse.silver = Math.floor((remainCp % 100) / 10);
      character.purse.copper = remainCp % 10;
    }

    // Override deity details from our dialog values
    if (this.isCleric()) {
      character.deity_domain = this.deityDomain;
      character.deity_edict = this.deityEdict;
      character.deity_anathema = this.deityAnathema;
    }

    // Override MU spells from our dialog picks
    if (this.isMagicUser() && this.muSpells.length > 0) {
      const block = character.getExperience()[0];
      block.spellbook.spells = this.muSpells.map(s => ({level: s.level, name: s.name, description: '', reversible: false}));
    }

    // Add selected weapons
    for (const w of this.selectedWeapons) {
      character.weapons.push(new Item({name: w.name, weight: w.weight, quantity: 1, description: w.description}));
    }

    // Add selected armor and compute AC
    let ac = 9;
    for (const a of this.selectedArmor) {
      character.armor.push(new Item({name: a.name, weight: a.weight, quantity: 1, description: a.description}));
      if (a.ac !== undefined && a.ac < ac) ac = a.ac;
      if (a.shield) character.shield = true;
      if (a.helmet) character.helmet = true;
    }
    character.armor_class = ac;

    // Add loadout items
    const loadout = this.getSelectedLoadout();
    if (loadout) {
      const backpackContents = loadout.backpackItems.map(li => {
        const item = EquipmentLoadoutHelper.findItem(li.name);
        return new Item({name: item.name, weight: item.weight, quantity: li.quantity, description: item.description});
      });
      const backpack = new Container({
        name: 'Backpack',
        weight: 75,
        capacity: 800,
        slots: 10,
        contents: backpackContents
      });
      character.slung_items.push(backpack);

      for (const si of loadout.slungItems) {
        const item = EquipmentLoadoutHelper.findItem(si.name);
        for (let i = 0; i < si.quantity; i++) {
          character.slung_items.push(new Container({
            name: item.name,
            weight: item.weight,
            capacity: 0,
            slots: 0,
            contents: []
          }));
        }
      }
    }

    this.dialogRef.close(character);
  }
}
