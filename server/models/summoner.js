const mongoose = require('mongoose');

const summonerSchema = mongoose.Schema({
  accountId: String,
  id: String,
  name: String,
  profileIcon: String,
  profileIconId: Number,
  puuid: String,
  region: String,
  revisionDate: Number,
  summonerLevel: Number,
});


const Summoner = mongoose.model('Summoner', summonerSchema);

module.exports = {
  Summoner,
};
