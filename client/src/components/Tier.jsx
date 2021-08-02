import React from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Tier = ({tier, color}) => {
  let tiers = [];
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