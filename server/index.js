const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const axiosRetry = require("axios-retry");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const timeout = require('connect-timeout');

require("dotenv").config();
const api_key = process.env.API_KEY;
const mongo_pw = process.env.MONGO_PW;

/* Helper functions to generate static element urls */
const { crest } = require("./generateRankedCrest.js");
const { unitSplash } = require("./generateUnitIcons.js");
const { itemSplashes } = require("./generateItemIcons.js");
const { traitIcons } = require("./generateTraitIcons.js");
const { traitInfo } = require("./generateTraitInfo.js");

const app = express();

//app.use(timeout('300s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../client/dist`));

const CONNECTION_URL = `mongodb+srv://seanhchen98:${mongo_pw}@cluster0.urmg0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("* CONNECTED TO MONGODB *");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Listening on port ${PORT}. \nClick here: http://localhost:${PORT}`
      );
    });
  });

const { Match } = require("./models/match.js");
const { League } = require("./models/league.js");
const { Summoner } = require("./models/summoner.js");

const CURRENT_SET = 6;

/* - - - - - - - - - - Main API endpoints - - - - - - - - -- - - */

app.get("/search/:summoner", async (req, res) => {
  const region = req.query.region;
  let summoner = req.query.summoner;
  console.log("region: ", region);
  console.log("summoner: ", summoner);

  const apiSummoner = await getSummoner(region, summoner, res);
  console.log('apiSummoner: ', apiSummoner);
  summoner = apiSummoner.name;

  const checkDBSummoner = await Summoner.findOne({
    name: `${summoner}`,
    region: `${region}`,
  }).exec();

  if (checkDBSummoner) {
    console.log(`summoner ${checkDBSummoner.name} exists in db, retrieving`)
    const leagueInfo = await League.findOne({
      summonerId: `${checkDBSummoner.id}`,
    }).exec();
    const matches = await Match.find({
      "metadata.participants": `${checkDBSummoner.puuid}`,
    })
      .lean()
      .exec();

    for (const match of matches) {
      match.playerMatchInfo = await addPlayerProperty(
        match,
        checkDBSummoner.puuid
      );
    }

    sortMatches(matches);

    const returnData = {
      summonerInfo: checkDBSummoner,
      leagueInfo: leagueInfo,
      matches: matches,
    };
    await res.status(200).send(returnData).end();

  } else {
    console.log("E L S E");
    // this should be a POST REQUEST
    const createSummoner = {
      create: true,
    };
    res.send(createSummoner);

  //   console.log("does not exist in db, adding to db");

  //   const summonerInfo = await getSummoner(region, summoner, res);
  //   const dbSummoner = await Summoner.findOne({
  //     name: `${summoner}`,
  //     region: `${region}`,
  //   }).exec();
  //   console.log('dbSummoner: ', dbSummoner);
  //   if (!dbSummoner) {
  //     Summoner.create(summonerInfo, (err) => {
  //       if (err) {
  //         return handleError(err);
  //       }
  //     });
  //   }

  //   const dbLeague =  await League.find({
  //     summonerId: `${summonerInfo.id}`,
  //   }).exec();

  //   if (dbLeague.length === 0) {
  //     const leagueInfo = await getLeague(
  //       region,
  //       summonerInfo.name,
  //       summonerInfo.id
  //     );

  //     League.create(leagueInfo, (err) => {
  //       if (err) {
  //         return handleError(err);
  //       }
  //     });
  //   }

  //   const generalRegion = applyGeneralRegion(region);

  //   const listOfMatches = await getMatches(generalRegion, summonerInfo.puuid);
  //   let i = 0;
  //   await console.log('listofmatches: ', listOfMatches);
  //   for (const match of listOfMatches) {
  //     const dBMatch = await Match.find({
  //       "metadata.match_id": match
  //     });
  //     if (dBMatch.length === 0) {
  //       console.log("\nmatch number: ", i + 1);
  //       //const match = listOfMatches[i];
  //       i += 1;
  //       const matchInfo = await getMatch(generalRegion, match);

  //       if (matchInfo) {

  //         const version = await determineSet(
  //           matchInfo.metadata.data_version,
  //           matchInfo.info.game_version
  //         );

  //         matchInfo.metadata.set = version.set;
  //         matchInfo.metadata.patch = version.patch;
  //         if (matchInfo.metadata.set === CURRENT_SET) {
  //           await addGameDetails(matchInfo);

  //           console.log("matchInfo: ", matchInfo);

  //           await Match.create(matchInfo, (err) => {
  //             if (err) {
  //               console.log(err);
  //             }
  //           });
  //           ///await console.log(`Just created ${doc.metadata.match_id} to Match model`);
  //         } else {
  //           console.log(
  //             `${matchInfo.metadata.match_id} is a game from previous set`
  //           );
  //           break;
  //         }
  //       } else {
  //         console.log("NON EXISTENT MATCH");
  //         retrieveSummonerFromDatabase(summoner, region, res);
  //       }
  //     } else {
  //       console.log(`${match} already exists in the database.`);
  //     }
  //   }
  //   await retrieveSummonerFromDatabase(summoner, region, res);
  }
});

app.post("/create/:summoner", async (req, res) => {
  const region = req.body.region;
  const summoner = req.body.summoner;
  createNewSummoner(region, summoner, res);
});

app.post("/update/:summoner", async (req, res) => {
  console.log("in update");
  updateSummoner(req, res);
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


// __________________ API Functions __________________________

const createNewSummoner = async (region, summoner, res) => {
    console.log("does not exist in db, adding to db");
    const apiSummoner = await getSummoner(region, summoner, res);
    summoner = apiSummoner.name;
    const summonerInfo = await getSummoner(region, summoner, res);
    const dbSummoner = await Summoner.findOne({
      name: `${summoner}`,
      region: `${region}`,
    }).exec();

    if (!dbSummoner) {
      Summoner.create(summonerInfo, (err) => {
        if (err) {
          return handleError(err);
        }
      });
    }

    const dbLeague =  await League.find({
      summonerId: `${summonerInfo.id}`,
    }).exec();

    if (dbLeague.length === 0) {
      const leagueInfo = await getLeague(
        region,
        summonerInfo.name,
        summonerInfo.id
      );

      League.create(leagueInfo, (err) => {
        if (err) {
          return handleError(err);
        }
      });
    }

    const generalRegion = applyGeneralRegion(region);

    const listOfMatches = await getMatches(generalRegion, summonerInfo.puuid);
    let i = 0;
    for (const match of listOfMatches) {
      const dBMatch = await Match.find({
        "metadata.match_id": match
      });
      if (dBMatch.length === 0) {
        console.log("\nmatch number: ", i + 1);
        //const match = listOfMatches[i];
        i += 1;
        const matchInfo = await getMatch(generalRegion, match);

        if (matchInfo) {
          console.log('generating details for match: ', matchInfo.metadata.match_id);
          const version = await determineSet(
            matchInfo.metadata.data_version,
            matchInfo.info.game_version
          );

          matchInfo.metadata.set = version.set;
          matchInfo.metadata.patch = version.patch;
          if (matchInfo.metadata.set === CURRENT_SET) {
            await addGameDetails(matchInfo);

            //console.log("matchInfo: ", matchInfo);

            await Match.create(matchInfo, (err) => {
              if (err) {
                console.log(err);
              }
            });
            ///await console.log(`Just created ${doc.metadata.match_id} to Match model`);
          } else {
            console.log(
              `${matchInfo.metadata.match_id} is a game from previous set`
            );
            break;
          }
        } else {
          console.log("NON EXISTENT MATCH");
          //retrieveSummonerFromDatabase(summoner, region, res);
        }
      } else {
        console.log(`${match} already exists in the database.`);
      }
    }
    await retrieveSummonerFromDatabase(summoner, region, res);
};

const updateSummoner = async (req, res) => {
  const region = req.body.region;
  const summoner = req.body.summoner;
  const puuid = req.body.puuid;
  console.log("req.query: ", req.body);

  const summonerInfo = await getSummoner(region, summoner, res);

  //await Summoner.findOneAndUpdate({'puuid': puuid}, summonerInfo);
  await Summoner.replaceOne({ puuid: puuid }, summonerInfo);
  const leagueInfo = await getLeague(
    region,
    summonerInfo.name,
    summonerInfo.id
  );

  //await League.findOneAndUpdate({'leagueId': leagueInfo.leagueId}, leagueInfo);
  await League.replaceOne({ leagueId: leagueInfo.leagueId }, leagueInfo);

  const matchesRegion = applyGeneralRegion(region);
  const matchIds = await getMatches(matchesRegion, puuid);
  for (const matchId of matchIds) {
    await setTimeout(() => {
      console.log("waiting between each getMatch");
    }, 1000);
    const match = await getMatch(matchesRegion, matchId);
    if (match) {
      console.log("metadata.match_id: ", match.metadata.match_id);
      const checkMatch = await Match.find({
        "metadata.match_id": `${match.metadata.match_id}`,
      })
        .lean()
        .exec();
      if (checkMatch.length === 0) {
        // new entry add to db

        const version = await determineSet(
          match.metadata.data_version,
          match.info.game_version
        );

        match.metadata.set = version.set;
        match.metadata.patch = version.patch;
        if (match.metadata.set === CURRENT_SET) {
          await addGameDetails(match);

          //console.log('match: ', match);

          Match.create(match, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          console.log(`${match.metadata.match_id} is a game from previous set`);
          break;
        }
      } else {
        console.log(`match ${match.metadata.match_id} already exists`);
        // break;
      }
    } else {
      console.log(`ERROR: match ${matchId} does not exist.`);
    }
  }
  await retrieveSummonerFromDatabase(summonerInfo.name, region, res);
};

const retrieveSummonerFromDatabase = async (summoner, region, res) => {
  const summonerInfo = await Summoner.findOne({
    name: `${summoner}`,
    region: `${region}`,
  }).exec();

  if (summonerInfo) {
    const leagueInfo = await League.findOne({
      summonerId: `${summonerInfo.id}`,
    }).exec();
    const matches = await Match.find({
      "metadata.participants": `${summonerInfo.puuid}`,
    })
      .lean()
      .exec();

    for (const match of matches) {
      match.playerMatchInfo = addPlayerProperty(match, summonerInfo.puuid);
    }

    sortMatches(matches);
    const returnData = {
      summonerInfo: summonerInfo,
      leagueInfo: leagueInfo,
      matches: matches,
    };
    await console.log('returnData length: ', returnData.matches.length);
    await console.log("sending data back to client");
    await res.status(200);
    await res.send(returnData).end();
  } else {
    res.status(400);
    res.send({});
    res.end("could not retrieve summoner info");
  }
};


// Data Functions

const getSummoner = async (region, summoner, res) => {
  console.log("* getSummoner *");
  const getTftSummonerAPI = `https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner}?api_key=${api_key}`;
  return await axios
    .get(getTftSummonerAPI)
    .then((response) => {
      const summonerInfo = response.data;
      summonerInfo.region = region;
      summonerInfo.profileIcon = `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${summonerInfo.profileIconId}.png`;
      return summonerInfo;
    })
    .catch((error) => {
      console.log("error: getSummoner error");
      res.status(400);
      res.send("error: Summoner name does not exist.");
    });
};

const getLeague = async (region, summonerName, summonerId) => {
  console.log("* getLeague *");
  const getTftLeagueAPI = `https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${api_key}`;
  return await axios
    .get(getTftLeagueAPI)
    .then((response) => {
      const leagueInfo = response.data;
      leagueInfo[0].rankedCrest = crest(leagueInfo[0].tier);
      return leagueInfo;
    })
    .catch((error) => {
      console.log(`error: League info does not yet exist for ${summonerName}.`);
      console.log("\n", error);
      return {};
    });
};

const getMatches = async (matchesRegion, puuid) => {
  console.log("* getMatches *");
  // console.log('puuid: ', puuid);
  const getTftMatchesAPI = `https://${matchesRegion}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=99&api_key=${api_key}`;
  // console.log('api: ', getTftMatchesAPI)
  return await axios
    .get(getTftMatchesAPI)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
    });
};

const getMatch = async (matchesRegion, match) => {
  console.log("* getMatch *");
  const matchByIdAPI = `https://${matchesRegion}.api.riotgames.com/tft/match/v1/matches/${match}?api_key=${api_key}`;
  return await axios
    .get(matchByIdAPI)
    .then(async (response) => {
      return response.data;
    })
    .catch(async (error) => {
      console.log("getMatch error status: ", error.response.status);
    });
};

const addGameDetails = async (match) => {
  const date = new Date(match.info.game_datetime);
  match.info.date = date.toLocaleString();
  //OVER HERE FIX FOR MATCH.INFO
  match.info.queue_id = match.info.queue_id;
  // match.info.tft_game_type = match.info
  const tftInfoJSON = await fetch(
    "https://raw.communitydragon.org/latest/cdragon/tft/en_us.json"
  );
  const tftInfo = await tftInfoJSON.json();

  const participants = match.info.participants;
  for (const participant of participants) {
    participant.traits = await traitIcons(participant.traits);
    for (let trait of participant.traits) {
      if (trait.name) {
        const info = traitInfo(trait, tftInfo);
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
  participants.sort((a, b) => {
    return a.placement - b.placement;
  });
  //console.log('match info: ', match.info);
};

const addPlayerProperty = (match, puuid) => {
  const participants = match.info.participants;
  for (const participant of participants) {
    if (puuid === participant.puuid) {
      return participant;
    }
  }
};

// helper function to convert specific server region to general region
const applyGeneralRegion = (region) => {
  let matchesRegion = "";
  if (
    region === "NA1" ||
    region === "BR1" ||
    region === "LA1" ||
    region === "LA2" ||
    region === "OC1"
  ) {
    matchesRegion = "americas";
  } else if (region === "KR" || region === "JP1") {
    matchesRegion = "asia";
  } else if (
    region === "EUN1" ||
    region === "TR1" ||
    region === "RU" ||
    region === "EUW1"
  ) {
    matchesRegion = "europe";
  }
  return matchesRegion;
};

//helper function to sort the match based off of most recent to least recent match
const sortMatches = (relevantMatch) => {
  relevantMatch.sort((a, b) => {
    return a.info.game_datetime - b.info.game_datetime;
  });
  relevantMatch.reverse();
};

const determineSet = (set, version) => {
  // console.log("*****************");
  // console.log("DETERMINE SET");
  //console.log("VERSION:   ", version);
  const ver = parseFloat(version.substring(7, 13));
  if (ver[ver.length - 1] === ".") {
    ver.slice(0, -1);
  }
  //console.log("ver: ", ver);
  if (ver > 11.21) {
    //console.log("set 6");
    return {
      set: 6,
      patch: ver,
    };
  }
  if (ver > 11.14) {
    //console.log("set 5.5");
    return {
      set: Number(set) + 0.5,
      patch: ver,
    };
  } else {
    //console.log("set 5");
    return {
      set: Number(set),
      patch: ver,
    };
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};