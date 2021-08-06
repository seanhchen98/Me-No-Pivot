import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Stats = ({result}) => {
  const ranking = generateRankString(result.leagueInfo);
  let leagueInfo = {};
  if (result.leagueInfo[0]) {
    leagueInfo = result.leagueInfo[0];
  };
  let rankedWinrate = (leagueInfo.wins / (leagueInfo.wins + leagueInfo.losses) * 100).toFixed(2);

  let recentTop4 = getRecentStats(result.matches);

  return (
    <div className="box">
      <div className="block columns">
        <div className="column is-one-third">
          <figure className="image is-96x96" style={{border: '2px solid black'}}>
            <img src={result.profileIconId} />
          </figure>
        </div>
        <div className="column">
          <div className="title block">{result.name}</div>
          <div className="block">
            <div className="tag is-info" style={{marginRight: 4}}>{result.region}</div>
            <div className="tag is-info" style={{marginRight: 4}}>Lvl. {result.summonerLevel}</div>
            <div className="tag is-info" style={{marginRight: 4}}>Set 5.5</div>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="">Rank: {ranking}</div>
        <div className="">Wins: {leagueInfo.wins}</div>
        <div className="">Winrate: {rankedWinrate}%</div>
      </div>
      <div className="block">
        <div className="subtitle">Last 10 games stats</div>
        <div className="block">
          <div className="">Average Placement: {recentTop4}</div>
        </div>
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
};

const getRecentStats = (matches) => {
  let total = 0;
  for (let i = 0; i < matches.length; i++) {
    total += matches[i].playerMatchInfo.placement;
  };
  return (total / matches.length).toFixed(2);
};

export default Stats;


