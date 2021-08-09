import React from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Tier = ({tier}) => {
  let tiers = [];
  let color = '';
  if (tier === 1) {
    color = '#585858';
  } else if (tier === 2) {
    color = '#C5DCE1';
  } else if (tier === 3) {
    color = '#ffd633';
  }
  for (let i = 0; i < tier; i++) {
    tiers.push(<i className="fas fa-star fa-sm" style={{color: color}}/>);
  };

  return (
    <div className="level">
      {tiers}
    </div>
  );
};

export default Tier;