const components = [
  {
    "name": "Aether Soul",
    "locations": ["amulet", "medal"],
    "minLevel": 24,
    "resistances": {
      "aether": 16
    }
  },
  {
    "name": "Antivenom Salve",
    "locations": ["head", "chest", "shoulder", "legs", "foot", "hand", "belt"],
    "minLevel": 15,
    "resistances": {
      "poison": 20
    }
  },
  {
    "name": "Black Tallow",
    "locations": ["amulet", "medal"],
    "minLevel": 24,
    "resistances": {
      "chaos": 16
    }
  },
  {
    "name": "Consecrated Wrappings",
    "locations": ["hand"],
    "minLevel": 20,
    "resistances": {
      "chaos": 8
    }
  },
  {
    "name": "Corpse Dust",
    "locations": ["ring", "amulet", "medal"],
    "minLevel": 7,
    "resistances": {
      "vitality": 10
    }
  },
  {
    "name": "Dense Fur",
    "locations": ["head", "chest", "shoulder", "legs", "foot", "hand", "belt"],
    "minLevel": 15,
    "resistances": {
      "cold": 20
    }
  },
  {
    "name": "Frozen Heart",
    "locations": ["ring"],
    "minLevel": 1,
    "resistances": {
      "cold": 10
    }
  },
  {
    "name": "Imbued Silver",
    "locations": ["weapon", "shield", "offhand"],
    "minLevel": 15,
    "resistances": {
      "bleeding": 15,
      "chaos": 20
    }
  },
  {
    "name": "Molten Skin",
    "locations": ["head", "chest", "shoulder", "legs", "foot", "hand", "belt"],
    "minLevel": 15,
    "resistances": {
      "fire": 20
    }
  },
  {
    "name": "Purified Salt",
    "locations": ["weapon", "shield", "offhand"],
    "minLevel": 20,
    "resistances": {
      "aether": 20
    }
  },
  {
    "name": "Radiant Gem",
    "locations": ["shield", "offhand"],
    "minLevel": 24,
    "resistances": {
      "elemental": 15
    }
  },
  {
    "name": "Resilient Plating",
    "locations": ["shield", "offhand", "chest", "shoulder"],
    "minLevel": 15,
    "resistances": {
      "piercing": 15
    }
  },
  {
    "name": "Rigid Shell",
    "locations": ["head", "chest", "shoulder", "legs", "foot", "hand", "belt"],
    "minLevel": 15,
    "resistances": {
      "lightning": 20
    }
  },
  {
    "name": "Runestone",
    "locations": ["head"],
    "minLevel": 24,
    "resistances": {
      "aether": 12,
      "elemental": 12
    }
  },
  {
    "name": "Sanctified Bone",
    "locations": ["chest", "head"],
    "minLevel": 24,
    "resistances": {
      "vitality": 18,
      "chaos": 12
    }
  },
  {
    "name": "Silk Swatch",
    "locations": ["shoulder", "chest", "legs"],
    "minLevel": 7,
    "resistances": {
      "piercing": 18,
      "bleeding": 18
    }
  },
  {
    "name": "Soul Shard",
    "locations": ["ring", "amulet", "medal"],
    "minLevel": 20,
    "resistances": {
      "vitality": 20
    }
  },
  {
    "name": "Wardstone",
    "locations": ["amulet", "medal"],
    "minLevel": 7,
    "resistances": {
      "elemental": 18,
      "bleeding": 18
    }
  },
  {
    "name": "Hallowed Ground",
    "locations": ["chest"],
    "minLevel": 32,
    "resistances": {
      "elemental": 12
    }
  },
  {
    "name": "Kilrian's Shattered Soul",
    "locations": ["chest"],
    "minLevel": 24,
    "resistances": {
      "vitality": 20
    }
  },
  {
    "name": "Prismatic Diamond",
    "locations": ["head"],
    "minLevel": 55,
    "resistances": {
      "vitality": 15
    }
  },
  {
    "name": "Unholy Inscription",
    "locations": ["hand"],
    "minLevel": 15,
    "resistances": {
      "vitality": 10,
      "bleeding": 15
    }
  },
  {
    "name": "Bloodied Crystal",
    "locations": ["ring", "amulet", "medal"],
    "minLevel": 75,
    "resistances": {
      "bleeding": 15
    }
  },
  {
    "name": "Spellscorched Plating",
    "locations": ["head", "chest", "shoulder", "legs", "foot", "hand", "belt"],
    "minLevel": 75,
    "resistances": {
      "piercing": 20,
      "elemental": 15
    }
  },
  {
    "name": "Tainted Heart",
    "locations": ["amulet", "medal"],
    "minLevel": 75,
    "resistances": {
      "vitality": 12,
      "aether": 12
    }
  },
  {
    "name": "Ugdenbog Leather",
    "locations": ["head", "chest", "shoulder", "legs", "foot", "hand", "belt"],
    "minLevel": 75,
    "resistances": {
      "poison": 20,
      "bleeding": 20
    }
  },
  {
    "name": "Seal of Blades",
    "locations": ["weapon", "shield", "offhand"],
    "minLevel": 75,
    "resistances": {
      "piercing": 15
    }
  },
  {
    "name": "Seal of Might",
    "locations": ["weapon", "shield", "offhand"],
    "minLevel": 75,
    "resistances": {
      "piercing": 12,
      "bleeding": 12,
      "vitality": 12
    }
  },
  {
    "name": "Eldritch Mirror",
    "locations": ["head", "chest"],
    "minLevel": 75,
    "resistances": {
      "vitality": 10
    }
  },
  {
    "name": "Living Armor",
    "locations": ["head", "shoulder", "chest"],
    "minLevel": 75,
    "resistances": {
      "chaos": 8,
      "elemental": 10
    }
  },
  {
    "name": "Sacred Plating",
    "locations": ["head", "shoulder", "chest"],
    "minLevel": 75,
    "resistances": {
      "vitality": 14,
      "aether": 18
    }
  },
  {
    "name": "Seal of Ancestry",
    "locations": ["amulet"],
    "minLevel": 75,
    "resistances": {
      "vitality": 20
    }
  },
  {
    "name": "Titan Plating",
    "locations": ["head", "chest"],
    "minLevel": 75,
    "resistances": {
      "piercing": 24
    }
  }
];