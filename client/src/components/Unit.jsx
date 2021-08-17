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

  const color = addRarityColor(unit.rarity);

  return (
    <div className="container" style={{height: 80}}>
      <div className="">
        <div className="level mb-1">
          <Tier tier={unit.tier} color={color}/>
        </div>
        <div className="">
          <figure className="image is-48x48" style={{border: `3px solid ${color}`}}>
            <img src={unit.splash} />
          </figure>
        </div>
        <div className="level mt-1">
          <UnitItems itemIds={unit.items}/>
        </div>
      </div>
    </div>
  );
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