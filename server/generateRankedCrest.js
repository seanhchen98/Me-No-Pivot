const crest = (tier) => {
  switch (tier) {
    case 'IRON':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/01_iron/images/iron_baseface_matte.png`;
    case 'BRONZE':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/02_bronze/images/bronze_baseface_matte.png`;
    case 'SILVER':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/03_silver/images/silver_baseface_matte.png`;
    case 'GOLD':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/04_gold/images/gold_baseface_matte.png`;
    case 'PLATINUM':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/05_platinum/images/platinum_baseface_matte.png`;
    case 'DIAMOND':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/06_diamond/images/diamond_baseface_matte.png`;
    case 'MASTER':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/07_master/images/master_baseface_matte.png`;
    case 'GRANDMASTER':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/08_grandmaster/images/grandmaster_baseface_matte.png`;
    case 'CHALLENGER':
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/09_challenger/images/challenger_baseface_matte.png`;
  }
};

module.exports = {
  crest,
};