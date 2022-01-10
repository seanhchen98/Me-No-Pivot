import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import PropTypes from "prop-types";

const Stats = ({ result, updateSummoner, puuid }) => {
  const [pid, setPid] = useState('');

  useEffect(async () => {
    setPid(puuid);
  }, [puuid]);

  const update = (e) => {
    updateSummoner(e);
    alert('update in progress');
  }

  if (!result.summonerInfo) {
    return (
      <div></div>
    );
  } else {
    const leagueInfo = result.leagueInfo;
    const ranking = generateRankString(leagueInfo);

    const rankedWinrate = (
      (leagueInfo.wins / (leagueInfo.wins + leagueInfo.losses)) *
      100
    ).toFixed(2);
    const totalRankedGames = leagueInfo.wins + leagueInfo.losses;

    const recentStats = getRecentStats(result.matches);
    const recentTopFour = ((recentStats.first + recentStats.second + recentStats.third + recentStats.fourth) / result.matches.length).toFixed(2);
    const rankedAverage = rankedAvg(result.matches);
    const rankedTopFour = ((rankedAverage.first + rankedAverage.sec + rankedAverage.third + rankedAverage.fourth) / totalRankedGames * 100).toFixed(2);

    return (
      <div className="box">
        <div className="block">
          <div className="button is-info is-fullwidth" onClick={(e)=> {update(e, pid)}}>Update</div>
        </div>
        <div className="block columns">
          <div className="column is-one-third">
            <figure
              className="image is-96x96"
              style={{ border: "2px solid black" }}
            >
              <img src={result.summonerInfo.profileIcon} />
            </figure>
          </div>
          <div className="column">
            <div className="title block">{result.summonerInfo.name}</div>
            <div className="block">
              <div className="tag is-info" style={{ marginRight: 4 }}>
                {result.summonerInfo.region}
              </div>
              <div className="tag is-info" style={{ marginRight: 4 }}>
                Lvl. {result.summonerInfo.summonerLevel}
              </div>
              <div className="tag is-info" style={{ marginRight: 4 }}>
                Set 6
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter pt-0 pb-1">
              <figure className="image is-96x96">
                <img className="is-rounded pb-1" src={leagueInfo.rankedCrest} />
              </figure>
            </div>
            <div className="column mt-5">
              <div className="title has-text-centered m-auto">{ranking}</div>
              <div className="subtitle has-text-centered m-auto">
                {leagueInfo.leaguePoints} LP
              </div>
            </div>
          </div>
          <div className="block">
            <div className="is-size-4 has-text-weight-semibold">Ranked stats</div>
            <div className=""><strong>Wins:</strong> {leagueInfo.wins}</div>
            <div className=""><strong>Total Games:</strong> {totalRankedGames}</div>
            <div className=""><strong>Winrate:</strong> {rankedWinrate}%</div>
            <div className=""><strong>Top 4:</strong> {rankedTopFour}%</div>
            <div className=""><strong>Average Placement:</strong> {rankedAverage.average}</div>
          </div>
          <div className="block">
            <div className="is-size-4 has-text-weight-semibold">Last {result.matches.length} games stats</div>
            <div className=""><strong>Wins:</strong> {recentStats.first}</div>
            <div className=""><strong>Winrate:</strong> {(recentStats.first / result.matches.length * 100).toFixed(2)}%</div>
            <div className=""><strong>Top 4:</strong> {(recentTopFour * 100).toFixed(2)}%</div>
            <div className=""><strong>Average Placement:</strong> {recentStats.avg}</div>
          </div>
        </div>
      </div>
    );
  }
};

const generateRankString = (gamemode) => {
  if (gamemode) {
    let ranking;
    if (gamemode.queueType === "RANKED_TFT") {
      if (
        gamemode.tier === "MASTER" ||
        gamemode.tier === "GRANDMASTER" ||
        gamemode.tier === "CHALLENGER"
      ) {
        ranking = gamemode.tier;
      } else {
        ranking = `${gamemode.tier} ${gamemode.rank}`;
      }
    }
    return ranking;
  } else {
    return '';
  }
};

const getRecentStats = (matches) => {

  const output = {
    avg: 0,
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    bottom: 0,
  };

  let totalPoints = 0;

  for (let i = 0; i < matches.length; i++) {
    let placement = matches[i].playerMatchInfo.placement;
    totalPoints += placement;

    if (placement === 1) {
      output.first += 1;
    } else if (placement === 2) {
      output.second += 1;
    } else if (placement === 3) {
      output.third += 1;
    } else if (placement === 4) {
      output.fourth += 1;
    } else {
      output.bottom += 1;
    }
  }

  output.avg = (totalPoints / matches.length).toFixed(2);

  return output;
};

const rankedAvg = (matches) => {
  let numOfGames = 0;
  let rankedTotal = 0;
  let numFirst = 0;
  let numSec = 0;
  let numThird = 0;
  let numFourth = 0;
  let numBot = 0;

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].info.queue_id === 1100) {
      numOfGames += 1;
      rankedTotal += matches[i].playerMatchInfo.placement;
      if (matches[i].playerMatchInfo.placement === 1) {
        numFirst += 1;
      } else if (matches[i].playerMatchInfo.placement === 2) {
        numSec += 1;
      } else if (matches[i].playerMatchInfo.placement === 3) {
        numThird += 1;
      } else if (matches[i].playerMatchInfo.placement === 4) {
        numFourth += 1;
      } else {
        numBot += 1;
      }
    }
  }
  let average = (rankedTotal / numOfGames).toFixed(2);
  return {
    average: average,
    first: numFirst,
    sec: numSec,
    third: numThird,
    fourth: numFourth,
    bot: numBot,
  };

};

export default Stats;
