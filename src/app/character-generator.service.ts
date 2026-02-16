import {Injectable} from '@angular/core';
import {Character} from './character';
import {ExperienceBlock} from './experience-block';
import {Experience} from './experience';
import {Purse} from './purse';
import {Spell} from './spell';
import {SpellBook} from './spell-book';
import {DiceHelper} from './dice-helper';
import {AttributeTablesHelper} from './attribute-tables-helper';
import {PhysicalAttributesHelper} from './physical-attributes-helper';
import {NameGeneratorHelper} from './name-generator-helper';
import {GeneratorOptions} from './generator-options';

@Injectable({
  providedIn: 'root'
})
export class CharacterGeneratorService {
  static readonly CLASS_PRIMES: {[key: string]: string} = {
    'Fighter': 'strength',
    'Cleric': 'wisdom',
    'Magic User': 'intelligence'
  };

  generateCharacter(options: GeneratorOptions): Character {
    return this.generate(options);
  }

  generateHireling(options: GeneratorOptions): Character {
    return this.generate(options);
  }

  generate(options: GeneratorOptions): Character {
    const abilities = this.rollAbilities(options);
    const charClass = options.characterClass || this.randomClass();
    const level = options.level !== undefined ? options.level : 0;
    const prime = CharacterGeneratorService.CLASS_PRIMES[charClass];

    const bonusXp = this.experienceBoost(abilities[prime], level);
    const adjustments = this.abilityAdjustments(prime, abilities, level);

    const sex = options.sex || (DiceHelper.roll(2, 1) === 1 ? 'female' : 'male');
    const weightClass = options.weightClass || DiceHelper.pick(['light', 'average', 'heavy']);
    const older = options.ageCategory ? options.ageCategory === 'older' : DiceHelper.roll(2, 1) === 1;

    const height = PhysicalAttributesHelper.generateHeight(sex);
    const weight = PhysicalAttributesHelper.generateWeight(abilities.strength, abilities.constitution, sex, weightClass);
    const age = PhysicalAttributesHelper.generateAge(level, older);
    const handedness = PhysicalAttributesHelper.generateHandedness();

    const eyeColor = options.eyeColor || DiceHelper.pick(AttributeTablesHelper.EYE_COLORS);
    const hairColor = options.hairColor || DiceHelper.pick(AttributeTablesHelper.HAIR_COLORS);
    const hairType = options.hairType || DiceHelper.pick(AttributeTablesHelper.HAIR_TYPES);
    const hairLength = options.hairLength || DiceHelper.pick(AttributeTablesHelper.HAIR_LENGTHS);
    const skinColor = options.skinColor || DiceHelper.pick(AttributeTablesHelper.SKIN_COLORS);
    const dentalStatus = options.dentalStatus || DiceHelper.pick(AttributeTablesHelper.DENTAL_STATUSES);
    const alignment = options.alignment || DiceHelper.pick(AttributeTablesHelper.ALIGNMENTS);
    const profession = options.profession || DiceHelper.pick(AttributeTablesHelper.PROFESSIONS);
    const professionDef = AttributeTablesHelper.PROFESSION_DEFINITIONS[profession] || '';

    let idQuality: string = null;
    if (options.identifyingQualityText) {
      idQuality = options.identifyingQualityText;
      if (abilities.charisma < 7) {
        const q2 = DiceHelper.pick(AttributeTablesHelper.IDENTIFYING_QUALITIES);
        idQuality = idQuality + ', and ' + q2;
      }
    } else if (options.identifyingQuality && abilities.charisma < 7) {
      const q1 = DiceHelper.pick(AttributeTablesHelper.IDENTIFYING_QUALITIES);
      const q2 = DiceHelper.pick(AttributeTablesHelper.IDENTIFYING_QUALITIES);
      idQuality = q1 + ', and ' + q2;
    } else if (abilities.charisma < 7) {
      idQuality = DiceHelper.pick(AttributeTablesHelper.IDENTIFYING_QUALITIES);
    } else if (options.identifyingQuality) {
      idQuality = DiceHelper.pick(AttributeTablesHelper.IDENTIFYING_QUALITIES);
    }

    const name = options.name || NameGeneratorHelper.generate(
      options.useTitle || false,
      options.multiBarrel || false
    );

    const hp = this.rollHitPoints(charClass, level, abilities.constitution);
    const startingGold = options.startingGold !== undefined ? options.startingGold : DiceHelper.roll(6, 3) * 10;

    // XP for level
    let levelXp = 0;
    if (level > 1) {
      const atomicXp = (charClass === 'Magic User') ? 625 : 500;
      levelXp = atomicXp * Math.pow(2, level);
    } else if (level === 1) {
      levelXp = 0;
    }

    // Build appearance text
    const appearanceParts: string[] = [
      'Dental status: ' + dentalStatus,
      '\n' + handedness,
    ];
    if (idQuality) {
      appearanceParts.push('\n' + 'Identifying Quality: ' + idQuality);
    }
    appearanceParts.push('\n' + profession + ': ' + professionDef);

    // Ability adjustments
    if (adjustments.length > 0) {
      appearanceParts.push('\n' + 'Adjustments: ' + adjustments.join(', '));
    }

    // Cleric-specific
    let deityName: string = null;
    let deityDomain: string = null;
    let deityEdict: string = null;
    let deityAnathema: string = null;

    if (charClass === 'Cleric') {
      deityName = options.deityName || NameGeneratorHelper.generate(false, false);
      deityDomain = DiceHelper.pick(AttributeTablesHelper.DOMAINS);
      deityEdict = DiceHelper.pick(AttributeTablesHelper.EDICTS);
      deityAnathema = DiceHelper.pick(AttributeTablesHelper.ANATHEMAS);

      const godStats = '\nDeity Name: ' + deityName + ', Domain: ' + deityDomain +
        ', Edict: ' + deityEdict + ', Anathema: ' + deityAnathema;
      appearanceParts.push(godStats);
    }

    // Magic User starting spell
    let spells: Spell[] = [];
    if (charClass === 'Magic User' && level > 0) {
      const startingSpell = DiceHelper.pick(AttributeTablesHelper.MAGIC_USER_SPELLS);
      spells = [new Spell({level: 1, name: startingSpell})];
    }

    const experienceBlock = new ExperienceBlock({
      class: charClass,
      prime: prime,
      experiences: levelXp > 0 ? [new Experience({points: levelXp})] : [],
      bonus_xp: bonusXp,
      spellbook: new SpellBook({spells: spells}, charClass),
      spells: []
    });

    return new Character({
      name: name,
      race: 'Human',
      age: age,
      sex: sex,
      profession: profession,
      alignment: alignment,
      height_foot: height.foot,
      height_inch: height.inch,
      weight: weight,
      eye_color: eyeColor,
      hair_color: hairColor,
      hair_style: hairType,
      hair_length: hairLength,
      skin_color: skinColor,
      base_movement: 60,
      current_hp: hp,
      total_hp: hp,
      armor_class: 9,
      abilities: abilities,
      experience: [experienceBlock],
      purse: new Purse({gold: startingGold, silver: 0, copper: 0, platinum: 0, gems: []}),
      known_languages: ['Common'],
      weapons: [],
      armor: [],
      magic_items: [],
      slung_items: [],
      mounts: [],
      hirelings: [],
      appearance: appearanceParts.filter(p => p != null).join(''),
      deity_name: deityName,
      deity_domain: deityDomain,
      deity_edict: deityEdict,
      deity_anathema: deityAnathema,
    });
  }

  rollAbilities(options: GeneratorOptions): {
    strength: number, intelligence: number, wisdom: number,
    dexterity: number, constitution: number, charisma: number
  } {
    const o = options.abilities || {};
    return {
      strength: o.strength || DiceHelper.roll(6, 3),
      intelligence: o.intelligence || DiceHelper.roll(6, 3),
      wisdom: o.wisdom || DiceHelper.roll(6, 3),
      dexterity: o.dexterity || DiceHelper.roll(6, 3),
      constitution: o.constitution || DiceHelper.roll(6, 3),
      charisma: o.charisma || DiceHelper.roll(6, 3),
    };
  }

  randomClass(): string {
    const roll = DiceHelper.roll(3, 1);
    if (roll === 1) return 'Fighter';
    if (roll === 2) return 'Cleric';
    return 'Magic User';
  }

  experienceBoost(primeScore: number, level: number): number {
    const adjusted = primeScore + level;
    if (adjusted >= 15) return 10;
    if (adjusted >= 13) return 5;
    return 0;
  }

  abilityAdjustments(prime: string, abilities: any, level: number): string[] {
    const adjustments: string[] = [];
    const primeIndex = ['strength', 'intelligence', 'wisdom', 'dexterity', 'constitution', 'charisma'].indexOf(prime);

    // Create adjusted scores (prime gets + level)
    const adj = {...abilities};
    adj[prime] = abilities[prime] + level;

    if (adj.strength >= 14)
      adjustments.push('+1 to Melee and Thrown Weapon Damage');
    if (adj.intelligence > 10)
      adjustments.push('+' + (adj.intelligence - 10) + ' Languages');
    if (adj.wisdom > 10)
      adjustments.push('+' + ((adj.wisdom - 10) * 10) + '% Chance Comprehend Spoken Language');
    if (adj.dexterity > 13)
      adjustments.push('+1 Missile Weapon Damage');
    if (adj.constitution > 13)
      adjustments.push('+1 Hit Point per whole Hit Die');
    if (adj.charisma > 13)
      adjustments.push('+1 to Loyalty Base and Reaction Checks');
    if (adj.intelligence < 8)
      adjustments.push('Inability to Read and Write');
    if (adj.constitution < 6)
      adjustments.push('Persistent Ailment/Allergy/Infirmity');
    if (adj.charisma < 7)
      adjustments.push('Additional or Mandatory Identifying Quality');

    return adjustments;
  }

  rollHitPoints(charClass: string, level: number, constitution: number): number {
    let hp = 0;
    let wholeHitDice = 0;

    if (level === 0) {
      if (charClass === 'Fighter') {
        hp = 6;
        wholeHitDice = 1;
      } else {
        hp = 3;
        wholeHitDice = 1;
      }
    } else {
      if (charClass === 'Fighter') {
        wholeHitDice = level;
        if (level > 1)
          hp = DiceHelper.roll(6, wholeHitDice - 1, wholeHitDice - 1);
        hp += 7;
      } else if (charClass === 'Cleric') {
        wholeHitDice = level;
        if (level > 1)
          hp = DiceHelper.roll(6, wholeHitDice - 1);
        hp += 6;
      } else if (charClass === 'Magic User') {
        if (level > 1) {
          if (level % 2 === 0) {
            wholeHitDice = level / 2;
            hp = DiceHelper.roll(6, wholeHitDice);
          } else {
            wholeHitDice = Math.floor(level / 2) + 1;
            hp = DiceHelper.roll(6, wholeHitDice, 1);
          }
        } else {
          wholeHitDice = 1;
        }
        hp += 6;
      }
    }

    // CON > 13 bonus
    if (constitution > 13)
      hp += wholeHitDice;

    return hp;
  }
}
