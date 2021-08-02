import React from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import Unit from './Unit.jsx';

const MatchUnits = ({units}) => {
  return (
    units.map((unit, index) => (
      <Unit unit={unit} key={index} />
    ))
  );
};

export default MatchUnits;
