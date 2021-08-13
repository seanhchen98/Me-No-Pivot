import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';


const TraitItem = ({trait}) => {
  if (trait.blank) {
    return (
      <div className="level-item" style={{width: 51.641, height: 34.328}}></div>
    );
  } else {
    const style = applyTraitHex(trait.style);
    const icon = applyTraitIcon(trait.name);
    return (
      <div className="level-item">
        <div className="is-align-items-center is-justify-content-center m-auto" style={{backgroundImage: `url(${style})`, backgroundSize: '29.67px 34.33px', width: 30, height: 34.34, position: 'static'}}>
          <figure className="image is-16x16 m-auto">
            <img className="" src={icon} style={{verticalAlign: 'bottom', filter: 'invert(100%)'}}/>
          </figure>
        </div>
      </div>
    );
  }
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
  const hexApiUrl = `https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-tft/global/default/${hex}.png`;
  return hexApiUrl;
};

const applyTraitIcon = (name) => {
  if (name === 'Set5_Abomination') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_aberration.png';
  } else if (name === 'Set5_Assassin') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_assassin.png';
  } else if (name === 'Set5_Brawler') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_brawler.png';
  } else if (name === 'Set5_Cannoneer') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_cannoneer.png';
  } else if (name === 'Set5_Caretaker') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_caretaker.png';
  } else if (name === 'Set5_Cavalier') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_cavalry.png';
  } else if (name === 'Set5_Cruel') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_cruel.png';
  } else if (name === 'Set5_Dawnbringer') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_dawnbringer.png';
  } else if (name === 'Set5_Draconic') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_draconic.png';
  } else if (name === 'Set5_Forgotten') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_forgotten.png';
  } else if (name === 'Set5_Hellion') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_hellion.png';
  } else if (name === 'Set5_Inanimate') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_inanimate.png';
  } else if (name === 'Set5_Invoker') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_invoker.png';
  } else if (name === 'Set5_Ironclad') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_ironclad.png';
  } else if (name === 'Set5_Knight') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_knight.png';
  } else if (name === 'Set5_Legionnaire') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_vanquisher.png';
  } else if (name === 'Set5_Nightbringer') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_nightbringer.png';
  } else if (name === 'Set5_Mystic') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_2_mystic.png';
  } else if (name === 'Set5_Ranger') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_2_ranger.png';
  } else if (name === 'Set5_Redeemed') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_redeemed.png';
  } else if (name === 'Set5_Renewer') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_rejuvenator.png';
  } else if (name === 'Set5_Revenant') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_revenant.png';
  } else if (name === 'Set5_Sentinel') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_sentinel.png';
  } else if (name === 'Set5_Skirmisher') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_skirmisher.png';
  } else if (name === 'Set5_Spellweaver') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_sorcerer.png';
  } else if (name === 'Set5_Victorious') {
    return 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/trait_icon_5_victorious.png';
  }
};


TraitItem.propTypes = {
  trait: PropTypes.object,
};

export default TraitItem;