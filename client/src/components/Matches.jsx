import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.min.css';

import MatchesList from './MatchesList.jsx';

const Matches = ({matches}) => {
  return (
    <div className="">
      <div className="subtitle">
        Last {matches.length} most recent games
      </div>
      <MatchesList matches={matches} />
    </div>
  );
};

// Matches.propTypes = {
//   matches:
// }

export default Matches;
