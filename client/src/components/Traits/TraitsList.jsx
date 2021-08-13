import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import TraitItem from './TraitItem.jsx';

const TraitsList = ({traits}) => (
    traits.map((trait, index) => (
      <TraitItem trait={trait} key={index} />
    ))
);

TraitsList.propTypes = {
  traits: PropTypes.array,
};

export default TraitsList;

