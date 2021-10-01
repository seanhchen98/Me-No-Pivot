const mongoose = require('mongoose');

const leagueSchema =  mongoose.Schema({
  freshBlood: Boolean,
  hotStreak: Boolean,
  inactive: Boolean,
  leagueId: String,
  leaguePoints: Number,
  losses: Number,
  queueType: String,
  rank: String,
  rankedCrest: String,
  summonerId: String,
  summonerName: String,
  tier: String,
  veteran: Boolean,
  wins: Number,
});

const League = mongoose.model('League', leagueSchema);

module.exports = {
  League,
};
