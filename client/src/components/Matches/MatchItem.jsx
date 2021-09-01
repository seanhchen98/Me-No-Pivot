import React from 'react';
import 'bulma/css/bulma.min.css';

import Traits from '../Traits/Traits.jsx';
import MatchUnits from './MatchUnits.jsx';

const MatchItem = ({match}) => {
  let gamemode = determineGamemode(match);
  return (
    <div className="container box is-family-primary">
      <div className="columns">
        <div className="column is-one-quarter">
          <Placement place={match.playerMatchInfo.placement}/>
          <div className="subtitle">{gamemode}</div>
          <h1>Set: {match.set}</h1>
          <h1>Date: {match.date}</h1>
        </div>
        <div className="column is-three-quarters">
          <div className="container block">
            <Traits traits={match.playerMatchInfo.traits}/>
          </div>
          <div className="container level-item">
            <MatchUnits units={match.playerMatchInfo.units} />
          </div>
        </div>
      </div>
    </div>
  );
};

const determineGamemode = (m) => {
  if (m.mode === 'standard') {
    if (m.queueId === 1100) {
      return 'Ranked';
    } if (m.queueId === 1090) {
      return 'Normals';
    }
  } else if (m.mode === 'turbo') {
    return 'Hyperroll';
  }
};

const Placement = ({place}) => {
  if (place === 1) {
    return (
      <div className="title has-text-warning">1st</div>
    );
  } else if (place === 2) {
    return (
      <div className="title" style={{color: '#C5DCE1'}}>2nd</div>
    );
  } else if (place === 3) {
    return (
      <div className="title has-text-warning-dark">3rd</div>
    )
  } else if (place === 4) {
    return (
      <div className="title has-text-grey">4th</div>
    );
  } else {
    return (
      <div className="title has-text-dark">{place}th</div>
    );
  }
};

// MatchItem.propTypes = {
//   match: PropTypes.object,
// };

export default MatchItem;