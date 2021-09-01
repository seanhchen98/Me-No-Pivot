import React from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import Unit from '../Units/Unit.jsx';

const MatchUnits = ({units}) => {
  if (units.length !== 0) {
    while (units.length < 10) {
      units.push({
        default: true,
      });
    }
  }
  return (
    units.map((unit, index) => (
      <Unit unit={unit} key={index} />
    ))
  );
};

MatchUnits.propTypes = {
  units: PropTypes.array,
};

export default MatchUnits;
