import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import Tier from './Tier.jsx';
import UnitItems from './UnitItems.jsx';

const Unit = ({unit}) => {
  if (unit.default) {
    return (
      <div className="container" style={{height: 80}, {width: 70.59}}></div>
    );
  };
  let championId = unit.character_id.toLowerCase();
  let championSplash = checkStage2Units(championId);
  const color = addRarityColor(unit.rarity);

  return (
    <div className="container" style={{height: 80}}>
      <div className="">
        <div className="level" style={{marginBottom: 4}}>
          <Tier tier={unit.tier} color={color}/>
        </div>
        <div className="">
          <figure className="image is-48x48" style={{border: `3px solid ${color}`}}>
            <img src={championSplash} />
          </figure>
        </div>
        <div className="level" style={{marginTop: 4}}>
          <UnitItems itemIds={unit.items}/>
        </div>
      </div>
    </div>
  );
};

const checkStage2Units = (championId) => {
  if (championId === 'tft5_fiddlesticks' || championId === 'tft5_gwen' || championId === 'tft5_missfortune' || championId === 'tft5_pyke' || championId === 'tft5_senna' || championId === 'tft5_tristana' || championId === 'tft5_rakan' || championId === 'tft5_lucian' || championId === 'tft5_irelia' || championId === 'tft5_olaf' || championId === 'tft5_akshan' || championId === 'tft5_galio') {
    return `https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${championId}_mobile.tft_set5_stage2.png`;
  } else {
    return `https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${championId}_mobile.tft_set5.png`;
  }
};

const addRarityColor = (rarity) => {
  let color = '';
  if (rarity === 0) {
    color = 'grey';
  } else if (rarity === 1) {
    color = 'green';
  } else if (rarity === 2) {
    color = '#3385ff';
  } else if (rarity === 3) {
    color = '#BA55D3';
  } else if (rarity === 4) {
    color = '#ffbf00';
  } else if (rarity === 5) {
    color = 'red';
  }
  return color;
};

Unit.propTypes = {
  unit: PropTypes.object,
};

export default Unit;