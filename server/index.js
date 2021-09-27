const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetch = require('node-fetch');

require('dotenv').config();
const api_key = process.env.API_KEY;

/* Helper functions to generate static element urls */
const { crest } = require('./generateRankedCrest.js');
const { unitSplash } = require('./generateUnitIcons.js');
const { itemSplashes } = require('./generateItemIcons.js');
const { traitIcons } = require('./generateTraitIcons.js');
const { traitInfo } = require('./generateTraitInfo.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 3000;

app.use(express.static(`${__dirname}/../client/dist`));



app.get('/search/:summoner', async (req, res) => {
  const region = req.query.region;
  const summoner = req.query.summoner;
  console.log('* * * Accessing /test api * * *')
  // const region = 'NA1';
  // const summoner = 'genyusaihan';
  const summonerInfo = await getSummoner(region, summoner, res);
  const leagueInfo = await getLeague(region, summonerInfo.name, summonerInfo.id);
  const matchesRegion = applyGeneralRegion(region);
  // get list of match ids
  const matches = await getMatches(matchesRegion, summonerInfo.puuid);
  const matchesData = [];
  // iterate through list of match ids to get match info
  for (const match of matches) {
    // get data from match
    const matchInfo = await getMatch(matchesRegion, match);
    if (matchInfo) {
      console.log('matchInfo: ', matchInfo);
      //return;
      const version = determineSet(matchInfo.metadata.data_version, matchInfo.info.game_version);
      matchInfo.metadata.set = version.set;
      matchInfo.metadata.patch = version.patch;
      if (matchInfo.metadata.set === 5.5) {
        matchesData.push(matchInfo);
      } else {
        console.log('game from previous set')
      }
    } else {
      console.log('NON EXISTENT MATCH')
    }
  }
  sortMatches(matchesData);
  const statistics = {};
  for (const match of matchesData) {
    console.log('handling match: ', match.metadata.match_id);
    await addGameDetails(match);
    addPlayerProperty(match, summonerInfo.puuid);
  }

  const returnData = {
    summonerInfo: summonerInfo,
    leagueInfo: leagueInfo,
    matches: matchesData,
  };
  console.log('*** DATA COMPLETE ***')
  res.status(200);
  res.send(returnData);
});

const getSummoner = async (region, summoner, res) => {
  console.log('* getSummoner *');
  const getTftSummonerAPI = `https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner}?api_key=${api_key}`;
  return await axios.get(getTftSummonerAPI).then((response) => {
    const summonerInfo = response.data;
    summonerInfo.region = region;
    summonerInfo.profileIcon = `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${summonerInfo.profileIconId}.png`;
    return summonerInfo;
  }).catch((error) => {
    console.log('error: getSummoner error');
    res.status(400);
    res.send('error: Summoner name does not exist.');
  });
};

const getLeague = async (region, summonerName, summonerId) => {
  console.log('* getLeague *');
  const getTftLeagueAPI = `https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${api_key}`;
  return await axios.get(getTftLeagueAPI).then((response) => {
    const leagueInfo = response.data;
    leagueInfo[0].rankedCrest = crest(leagueInfo[0].tier);
    return leagueInfo;
  }).catch((error) => {
    console.log(`error: League info does not yet exist for ${summonerName}.`);
    console.log('\n', error);
    return {};
  });
};

const getMatches = async (matchesRegion, puuid) => {
  // puuid = summonerInfo.puuid
  console.log('* getMatches *');
  const getTftMatchesAPI = `https://${matchesRegion}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=100&api_key=${api_key}`;
  return await axios.get(getTftMatchesAPI).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log('GET MATCHES ERROR: most likely 429');
  });
};

const getMatch = async (matchesRegion, match) => {
  // match = matches[i];
  console.log('* getMatch *');
  //console.log('    match: ', )
  const matchByIdAPI = `https://${matchesRegion}.api.riotgames.com/tft/match/v1/matches/${match}?api_key=${api_key}`;
  return await axios.get(matchByIdAPI).then((response) => {
    console.log('Grabbing: ', match.metadata);
    //console.log('\n')
    return response.data;
  }).catch((error) => {
    console.log(`error: No match by id # ${match} exists`);
    return;
  });
};

const addGameDetails = async (match) => {

  const date = new Date(match.info.game_datetime);
  match.info.date = date.toLocaleString();

  const tftInfoJSON = await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json');
  const tftInfo = await tftInfoJSON.json();

  const participants = match.info.participants;
  for (const participant of participants) {
    participant.traits = await traitIcons(participant.traits);
    for (let trait of participant.traits) {
      if (trait.name) {
        const info = traitInfo(trait);
        trait.shortName = info.shortName;
        trait.number = info.number;
      }
    }
    for (const unit of participant.units) {
      const id = unit.character_id;
      unit.icon = unitSplash(id);
      unit.items = await itemSplashes(unit.items, tftInfo.items);
    }
  }
  participants.sort((a,b) => {
    return a.placement - b.placement;
  });
};

const addPlayerProperty = (match, puuid) => {
  const participants = match.info.participants;
  for (const participant of participants) {
    if (puuid === participant.puuid) {
      match.playerMatchInfo = participant;
    }
  }
};

// helper function to convert specific server region to general region
const applyGeneralRegion = (region) => {
  let matchesRegion = '';
  if (region === 'NA1' || region === 'BR1' || region === 'LA1' || region === 'LA2' || region === 'OC1') {
    matchesRegion = 'americas';
  } else if (region === 'KR' || region === 'JP1') {
    matchesRegion = 'asia';
  } else if (region === 'EUN1' || region === 'TR1' || region === 'RU' || region === 'EUW1') {
    matchesRegion = 'europe';
  }
  return matchesRegion;
};

//helper function to sort the match based off of most recent to least recent match
const sortMatches = (relevantMatch) => {
  relevantMatch.sort((a,b) => {
    return a.info.game_datetime - b.info.game_datetime;
  });
  relevantMatch.reverse();
}

const determineSet = (set, version) => {
  const ver = parseFloat(version.substring(version.length - 6, version.length - 1));
  if (ver > 11.14) {
    return {
      set: Number(set) + 0.5,
      patch: ver,
    };
  } else {
    return {
      set: Number(set),
      patch: ver,
    };
  }
};

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

/* ************************************************************************* */

// app.get('/search/:summoner', (req, res) => {
//   const region = req.query.region;
//   const summoner = req.query.summoner;

//   const matchesRegion = applyGeneralRegion(region);
//   const getTftSummonerAPI = `https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner}?api_key=${api_key}`;

//   axios.get(getTftSummonerAPI).then((response) => {
//     let summonerInfo = response.data;
//     /* summonerInfo =
//     {
//       accountId: String - (encrypted account id. Max length 56 characters),

//       profileIconId: Int - (Id of the summoner icon associated with summoner),

//       revisionDate: Long - (data summoner was last modified specified as epoch milliseconds. the following events will update this timestamp: summoner name change, summoner level change, or profile icon change.)

//       name: String - (Summoner name),

//       id: String - (encrypted summoner Id. max length 63 characters),

//       puuid: String - (Encrypted PUUID. Exact length of 78 characters),

//       summonerLevel: Long - (Summoner level associated w/ the summoner),

//     }
//     */

//     const getTftLeagueAPI = `https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerInfo.id}?api_key=${api_key}`;
//     console.log(getTftLeagueAPI);

//     axios.get(getTftLeagueAPI).then((response) => {
//         let leagueInfo = response.data;

//         leagueInfo[0].rankedCrest = crest(leagueInfo[0].tier);

//         console.log('leagueInfo: ', leagueInfo);

//         /* leagueInfo =
//         [
//           {
//             leagueId: String - (Not included for the RANKED_TFT_TURBO queueType.)

//             summonerId: String - (Player's encrypted summonerId)

//             summonerName: String - ()

//             queueType: String - ()

//             ratedTier: string - (only included for the RANKEDT_TFT_TURBO queueType. (Legal values: ORANGE, PURPLE, BLUE, GREEN, GRAY))

//             ratedRating: int - (only included for the RANKED_TFT_TURBO queueType)

//             tier: string -  Not included for the RANKED_TFT_TURBO queueType.

//             rank: string - A player's division within a tier. Not included for the RANKED_TFT_TURBO queueType.

//             leaguePoints: int - Not included for the RANKED_TFT_TURBO queueType.

//             wins: int - First placement.

//             losses: int - Second through eighth placement.

//             hotStreak: boolean - Not included for the RANKED_TFT_TURBO queueType.

//             veteran: boolean - Not included for the RANKED_TFT_TURBO queueType.

//             freshBlood: boolean - Not included for the RANKED_TFT_TURBO queueType.

//             inactive: boolean - Not included for the RANKED_TFT_TURBO queueType.

//             miniSeries: MiniSeriesDTO - Not included for the RANKED_TFT_TURBO queueType.
//           }
//         ]
//         */

//         const getTftMatchesAPI = `https://${matchesRegion}.api.riotgames.com/tft/match/v1/matches/by-puuid/${summonerInfo.puuid}/ids?count=10&api_key=${api_key}`;
//         let matchesDetails = [];
//         axios.get(getTftMatchesAPI).then((response) => {
//           let matches = response.data;
//           for (let i = 0; i < matches.length; i++) {
//             let matchByIdAPI = `https://${matchesRegion}.api.riotgames.com/tft/match/v1/matches/${matches[i]}?api_key=${api_key}`;

//             axios.get(matchByIdAPI).then((response) => {
//               matchesDetails.push(response.data);
//             }).then(() => {
//               if (matchesDetails.length === matches.length) {
//                 let relevantMatch = [];
//                  grabPlayerMatchData(matchesDetails, summonerInfo.puuid, relevantMatch, res, summonerInfo, leagueInfo, region);
//               }
//             }).catch((error) => {
//               console.log('ERROR: ', error);
//             });
//           }
//         }).catch((error) => {
//           console.log('ERROR: ', error);
//         });
//     }).catch((error) => {
//       console.log('ERROR: ', error);
//     });
//   }).catch((error) => {
//     console.log('ERROR: ', error);
//     res.status(400);
//     res.end('Invalid Summoner Name. Please check for the correct region and make sure you have typed the summoner name correctly.');
//   });
// });
// // helper function to convert specific server region to general region
// const applyGeneralRegion = (region) => {
//   let matchesRegion = '';
//   if (region === 'NA1' || region === 'BR1' || region === 'LA1' || region === 'LA2' || region === 'OC1') {
//     matchesRegion = 'americas';
//   } else if (region === 'KR' || region === 'JP1') {
//     matchesRegion = 'asia';
//   } else if (region === 'EUN1' || region === 'TR1' || region === 'RU' || region === 'EUW1') {
//     matchesRegion = 'europe';
//   }
//   return matchesRegion;
// };

// // grab the specific player from the list of players within a game/match
// const grabPlayerMatchData = async (matchesDetails, puuid, relevantMatch, res, summonerInfo, leagueInfo, region) => {
//   for (let i = 0; i < matchesDetails.length; i++) {
//     let players = matchesDetails[i].info.participants;
//     for (let j = 0; j < players.length; j++) {
//       setTimeout(function() {
//         if (players[j].puuid === puuid) {
//           aggregateMatchData(matchesDetails[i], players[j]).then((aggregateMatch) => {
//             relevantMatch.push(aggregateMatch);
//             if (relevantMatch.length === matchesDetails.length) {
//               sortMatches(relevantMatch);
//               returnData(res, relevantMatch, summonerInfo, matchesDetails, leagueInfo, region);
//             }
//           });
//         };
//       }, 0 * j);
//     }
//   }
// };

// // builds the match object within the json object response
// const aggregateMatchData = async (matchDetails, playersGameData) => {
//   let info = matchDetails.info;
//   let meta = matchDetails.metadata;
//   let date = new Date(info.game_datetime);

//   const determineSet = (set, version) => {
//     let ver = parseFloat(version.substring(version.length - 6, version.length - 1));
//     console.log('VER: ', ver);
//     if (ver > 11.14) {
//       return set + 0.5;
//     } else {
//       return set;
//     }
//   };

//   let setVersion = determineSet(info.tft_set_number, info.game_version);

//   for (let i = 0; i < playersGameData.units.length; i++) {
//     let unit = playersGameData.units[i];
//     let id = unit.character_id;
//     unit.splash = unitSplash(id);
//     unit.itemSplashes = await itemSplashes(unit.items);
//   }
//   playersGameData.traits = generateTraits(playersGameData.traits);


//   return {
//     id: meta.match_id,
//     unixDate: info.game_datetime,
//     date: date.toLocaleString(),
//     length: info.game_length,
//     queueId: info.queue_id,
//     set: setVersion,
//     mode: info.tft_game_type,
//     version: info.game_version,
//     playerMatchInfo: playersGameData,
//   };
// }

// // send response json object to client
// const returnData = (res, relevantMatch, summonerInfo, matchesDetails, leagueInfo, region) => {
//   let returnData = {
//     name: summonerInfo.name,
//     region: region,
//     profileIconId: `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${summonerInfo.profileIconId}.png`,
//     revisionDate: summonerInfo.revisionDate.toLocaleString(),
//     summonerLevel: summonerInfo.summonerLevel,
//     leagueInfo: leagueInfo,
//     matches: relevantMatch,
//   };
//   console.log('OPERATION COMPLETE, SEND DATA TO CLIENT')
//   setTimeout(() => {
//     res.status(200);
//     res.send(returnData);
//   },0)
// };
