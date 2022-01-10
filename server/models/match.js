const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  info: {
    date: String,
    game_datetime: Number,
    game_length: Number,
    game_version: String,
    queue_id: Number,
    tft_game_type: String,
    tft_set_number: Number,
    participants: [
      {
        companion: {
          content_ID: String, skin_ID: Number, species: String
        },
        gold_left: Number,
        last_round: Number,
        level: Number,
        placement: Number,
        players_eliminated: Number,
        puuid: String,
        time_eliminated: Number,
        total_damage_to_players: Number,
        traits: [
          {
            hex: String,
            icon: String,
            name: String,
            number: Number,
            num_units: Number,
            shortName: String,
            style: Number,
            tier_current: Number,
            tier_total: Number,
          }
        ],
        units: [
          {
            character_id: String,
            icon: String,
            items: [
              {
                id: Number,
                name: String,
                url: String,
              }
            ],
            name: String,
            rarity: Number,
            tier: Number,
          }
        ],
      }
    ],
  },
  metadata: {
    data_version: String,
    match_id: String,
    participants: [String],
    patch: Number,
    set: Number,
  },
});

const Match = mongoose.model('Match', matchSchema);

module.exports = {
  Match,
};
