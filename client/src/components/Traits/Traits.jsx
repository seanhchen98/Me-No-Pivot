import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import TraitsList from './TraitsList.jsx';

const Traits = ({traits}) => {
  let gameTraits = filterNonTraits(traits);
  return (
    <div className="block level" style={{justifyContent: 'normal'}}>
      <TraitsList traits={gameTraits}/>
    </div>
  );
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
  console.log(traitsList)
  return traitsList;
};

Traits.propTypes = {
  traits: PropTypes.array,
};

export default Traits;
