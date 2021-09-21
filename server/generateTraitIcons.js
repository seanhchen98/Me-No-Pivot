const generateTraits = (traits) => {
  // console.log('\nWHAT IS TRAITS:\n', traits);
  let output = [];
  let validTraits = filterNonTraits(traits);

  for (let i = 0; i < validTraits.length; i++) {
    let current = validTraits[i];
    //console.log('\n CURRENT: ', current);
    if (current.blank) {

    }
    let individualTrait = {
      name: current.name,
      num_units: current.num_units,
      style: current.style,
      tier_current: current.tier_current,
      tier_total: current.tier_total,
      hex: applyTraitHex(current.style),
      icon: applyTraitIcon(current.name),
    };
    output.push(individualTrait);
  }
  console.log('\n', output);
  return output;
};

const filterNonTraits = (traits) => {
  let traitsList = [];
  for (let i = 0; i < traits.length; i++) {
    if (traits[i].style >= 1) {
      traitsList.push(traits[i]);
    }
  }
  traitsList.sort((a, b) => {
    return b.style - a.style;
  });
  for (let i = traitsList.length; i < 10; i++) {
    traitsList.push({blank: true});
  }
  //console.log(traitsList)
  return traitsList;
};

const applyTraitHex = (style) => {
  const styleTier = (level) => {
    if (level === 1) {
      return 'bronze-hover';
    } else if (level === 2) {
      return 'silver-hover';
    } else if (level === 3) {
      return 'gold-1';
    } else if (level === 4) {
      return 'chromatic-hover';
    }
  };
  const hex = styleTier(style);
  if (style) {
    return `https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-tft/global/default/${hex}.png`;
  } else {
    return;
  }
};

const applyTraitIcon = (name) => {
  switch (name) {
    case 'Set5_Abomination':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_aberration.png';
    case 'Set5_Assassin':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_assassin.png';
    case 'Set5_Brawler':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_brawler.png';
    case 'Set5_Cannoneer':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_cannoneer.png';
    case 'Set5_Caretaker':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_caretaker.png';
    case 'Set5_Cavalier':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_cavalry.png';
    case 'Set5_Cruel':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_cruel.png';
    case 'Set5_Dawnbringer':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_dawnbringer.png';
    case 'Set5_Draconic':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_draconic.png';
    case 'Set5_Forgotten':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_forgotten.png';
    case 'Set5_Hellion':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_hellion.png';
    case 'Set5_Inanimate':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_inanimate.png';
    case 'Set5_Invoker':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_invoker.png';
    case 'Set5_Ironclad':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_ironclad.png';
    case 'Set5_Knight':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_knight.png';
    case 'Set5_Legionnaire':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_vanquisher.png';
    case 'Set5_Nightbringer':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_nightbringer.png';
    case 'Set5_Mystic':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_2_mystic.png';
    case 'Set5_Ranger':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_2_ranger.png';
    case 'Set5_Redeemed':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_redeemed.png';
    case 'Set5_Renewer':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_rejuvenator.png';
    case 'Set5_Revenant':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_revenant.png';
    case 'Set5_Sentinel':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_sentinel.png';
    case 'Set5_Skirmisher':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_skirmisher.png';
    case 'Set5_Spellweaver':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_sorcerer.png';
    case 'Set5_Victorious':
      return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_victorious.png';
  }
};

module.exports = {
  generateTraits,
};