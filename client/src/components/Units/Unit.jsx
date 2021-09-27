import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
          <Tippy content={unit.character_id}>
            <figure className="image is-48x48" style={{border: `3px solid ${color}`}}>
              <img src={unit.icon} />
            </figure>
          </Tippy>
        </div>
        <div className="level mt-1">
          <UnitItems itemIds={unit.items}/>
        </div>
      </div>
    </div>
  );
};

const addRarityColor = (rarity) => {
  switch (rarity) {
    case 0:
      return 'grey';
    case 1:
      return 'green';
    case 2:
      return '#3385ff';
    case 3:
      return '#BA55D3';
    case 4:
      return '#ffbf00';
    case 5:
      return 'red';
  }
};

Unit.propTypes = {
  unit: PropTypes.object,
};

export default Unit;