import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';


import Stats from './Stats.jsx';
import Matches from './Matches/Matches.jsx';

const Result = ({result, searched, searchProgress}) => {
  return (
    <div className="section is-fluid" style={{display: searched && (searchProgress !== 'pending') ? 'block' : 'none'}}>
      <div className="container box">
        <div className="columns">
          <div className="column is-one-third">
            <Stats result={result} />
          </div>
          <div className="column is-two-thirds">
            <Matches matches={result.matches} />
          </div>
        </div>
      </div>
    </div>
  );
};

Result.propTypes = {
  result: PropTypes.object,
};

export default Result;