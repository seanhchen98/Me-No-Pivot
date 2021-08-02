import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.min.css';

import MatchItem from './MatchItem.jsx';

const MatchesList = ({matches}) => (
  matches.map((match, index) => (
    <MatchItem match={match} key={index}/>
  ))
);

export default MatchesList;