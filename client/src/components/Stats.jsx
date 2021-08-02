import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Stats = ({result}) => {
  let ranking = generateRankString(result.leagueInfo);
  return (
    <div className="box">
      <div className="block level">
        <figure className="image is-96x96" style={{border: '2px solid black'}}>
          <img src={result.profileIconId} />
        </figure>
        <div className="level-item">
          <div className="level">
            <div className="title level-item block">{result.name} { }</div>
            <div className="tag is-dark level-item block">
              <div className="subtitle has-text-white">{result.region}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="block">
        Rank: {ranking}
      </div>
    </div>
  );
};

const generateRankString = (gamemodes) => {
  let ranking;
  if (gamemodes.length < 1) {
    ranking = 'UNRANKED';
  }
  for (let i = 0; i < gamemodes.length; i++) {
    let gamemode = gamemodes[i];
    if (gamemode.queueType === 'RANKED_TFT') {
      if (gamemode.tier === 'MASTER' || gamemode.tier ==='GRANDMASTER' || gamemode.tier === 'CHALLENGER') {
        ranking = gamemode.tier;
      } else {
        ranking = `${gamemode.tier} ${gamemode.rank}`;
      }
    }
  }
  return ranking;
}

export default Stats;


