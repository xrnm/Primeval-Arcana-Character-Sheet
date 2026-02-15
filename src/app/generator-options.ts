export interface GeneratorOptions {
  characterClass?: string;
  level?: number;
  sex?: string;
  weightClass?: string;
  ageCategory?: string;
  name?: string;
  useTitle?: boolean;
  multiBarrel?: boolean;
  deityName?: string;
  eyeColor?: string;
  hairColor?: string;
  hairType?: string;
  hairLength?: string;
  skinColor?: string;
  alignment?: string;
  profession?: string;
  identifyingQuality?: boolean;
  identifyingQualityText?: string;
  dentalStatus?: string;
  startingGold?: number;
  abilities?: {
    strength?: number;
    intelligence?: number;
    wisdom?: number;
    dexterity?: number;
    constitution?: number;
    charisma?: number;
  };
}
