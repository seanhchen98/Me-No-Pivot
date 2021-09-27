const traitInfo = (trait) => {
  const info = {};
  switch (trait.name) {
    case 'Set5_Abomination':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // abom 3
        info.number = 3;
      } else if (trait.style === 3) {
        // abom 4
        info.number = 4;
      } else if (trait.style === 4) {
        // abom 5
        info.number = 5;
      }
      return info;

    case 'Set5_Assassin':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // assassin 2
        info.number = 2;
      } else if (trait.style === 2) {
        // assassin 4
        info.number = 4;
      } else if (trait.style === 3) {
        // assassin 6
        info.number = 6;
      }
      return info;

    case 'Set5_Brawler':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // brawler 2
        info.number = 2;
      } else if (trait.style === 2) {
        // brawler 4
        info.number = 4;
      } else if (trait.style === 3) {
        // brawler 6
        info.number = 6;
      }
      return info;

    case 'Set5_Cannoneer':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // cannoneer 2
        info.number = 2;
      } else if (trait.style === 2) {
        // cannoneer 4
        info.number = 4;
      } else if (trait.style === 3) {
        // cannoneer 6
        info.number = 6;
      }

    case 'Set5_Caretaker':
      info.shortName = trait.name.substring(5);
      // caretaker 1
      info.number = 1;
      return info;

    case 'Set5_Cavalier':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // cavalier 2
        info.number = 2;
      } else if (trait.style === 2) {
        // cavalier 3
        info.number = 3;
      } else if (trait.style === 3) {
        // cavalier 4
        info.number = 4;
      }
      return info;

    case 'Set5_Cruel':
      info.shortName = trait.name.substring(5);
      // cruel 1
      info.number = 1;
      return info;

    case 'Set5_Dawnbringer':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // dawnbringer 2
        info.number = 2;
      } else if (trait.style === 2) {
        // dawnbringer 4
        info.number = 4;
      } else if (trait.style === 3) {
        // dawnbringer 6
        info.number = 6;
      } else if (trait.style === 4) {
        // dawnbringer 8
        info.number = 8;
      }
      return info;

    case 'Set5_Draconic':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // draconic 3
        info.number = 3;
      } else if (trait.style === 2) {
        // draconic 5
        info.number = 5;
      }
      return info;

    case 'Set5_Forgotten':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // forgotten 2
        info.number = 2;
      } else if (trait.style === 2) {
        // forgotten 4
        info.number = 4;
      } else if (trait.style === 3) {
        // forgotten 6
        info.number = 6;
      } else if (trait.style === 4) {
        // forgotten 8
        info.number = 8;
      }
      return info;

    case 'Set5_Hellion':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // hellion 2
        info.number = 2;
      } else if (trait.style === 2) {
        // hellion 4
        info.number = 4;
      } else if (trait.style === 3) {
        // hellion 6
        info.number = 6;
      } else if (trait.style === 4) {
        // hellion 8
        info.number = 8;
      }
      return info;

    case 'Set5_Inanimate':
      info.shortName = trait.name.substring(5);
      // inanimate 1
      info.number = 1;
      return info;

    case 'Set5_Invoker':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // invoker 2
        info.number = 2;
      } else if (trait.style === 2) {
        // invoker 4
        info.number = 4;
      }
      return info;

    case 'Set5_Ironclad':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // ironclad 2
        info.number = 2;
      } else if (trait.style === 2) {
        // ironclad 3
        info.number = 3;
      } else if (trait.style === 3) {
        // ironclad 4
        info.number = 4;
      }
      return info;

    case 'Set5_Knight':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // knight 2
        info.number = 2;
      } else if (trait.style === 2) {
        // knight 4
        info.number = 4;
      } else if (trait.style === 3) {
        // knight 6
        info.number = 6;
      }
      return info;

    case 'Set5_Legionnaire':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // legionnaire 2
        info.number = 2;
      } else if (trait.style === 2) {
        // legionnnaire 4
        info.number = 4;
      } else if (trait.style === 3) {
        // legionnaire 6
        info.number = 6;
      } else if (trait.style === 4) {
        // legionnaire 8
        info.number = 8;
      }
      return info;

    case 'Set5_Nightbringer':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // nightbringer 2
        info.number = 2;
      } else if (trait.style === 2) {
        // nightbringer 4
        info.number = 4;
      } else if (trait.style === 3) {
        // nightbringer 6
        info.number = 6;
      } else if (trait,style === 4) {
        // nightbringer 8
        info.number = 8;
      }
      return info;

    case 'Set5_Mystic':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // mystic 2
        info.number = 2;
      } else if (trait.style === 2) {
        // mystic 3
        info.number = 3;
      } else if (trait.style === 3) {
        // mystic 4
        info.number = 4;
      } else if (trait.style === 4) {
        // mystic 5
        info.number = 5;
      }
      return info;

    case 'Set5_Ranger':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // ranger 2
        info.number = 2;
      } else if (trait.style === 2) {
        // ranger 4
        info.number = 4;
      } else if (trait.style === 3) {
        // ranger 6
        info.number = 6;
      }
      return info;

    case 'Set5_Redeemed':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // redeemed 3
        info.number = 3;
      } else if (trait.style === 2) {
        // redeemed 6
        info.number = 6;
      } else if (trait.style === 3) {
        // redeemed 9
        info.number = 9;
      }
      return info;

    case 'Set5_Renewer':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // renewer 2
        info.number = 2;
      } else if (trait.style === 2) {
        // renewer 4
        info.number = 4;
      } else if (trait.style === 3) {
        info.number = 6;
      }
      return info;

    case 'Set5_Revenant':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // revenant 2
        info.number = 2;
      } else if (trait.style === 2) {
        // revenant 3
        info.number = 3;
      } else if (trait.style === 3) {
        // revenant 4
        info.number = 4;
      } else if (trait.style === 4) {
        // revenant 5
        info.number = 5;
      }
      return info;

    case 'Set5_Sentinel':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // sentinel 3
        info.number = 3;
      } else if (trait.style === 2) {
        // sentinel 6
        info.number = 6;
      } else if (trait.style === 3) {
        // sentinel 9
        info.number = 9;
      }

    case 'Set5_Skirmisher':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // skirm 3
        info.number = 3;
      } else if (trait.style === 2) {
        // skirm 6
        info.number = 6;
      } else if (trait.style === 3) {
        // skirm 9
        info.number = 9;
      }
      return info;

    case 'Set5_Spellweaver':
      trait.shortName = trait.name.substring(5);
      if (trait.style === 1) {
        // spellweaver 2
        trait.number = 2;
      } else if (trait.style === 2) {
        // spellweaver 4
        trait.number === 4;
      } else if (trait.style === 3) {
        // spellweaver 6
        trait.number === 6;
      }

    case 'Set5_Victorious':
      info.shortName = trait.name.substring(5);
      // victorious 1
      info.number = 1;
      return info;

    // retired traits from set 5.0

    case 'Set5_GodKing':
      info.shortName = trait.name.substring(5);
      info.number = 1;
      return info;

    case 'Set5_DragonSlayer':
      info.shortName = trait.name.substring(5);
      if (trait.style === 1) {

      }
  }
}




module.exports = {
  traitInfo,
};