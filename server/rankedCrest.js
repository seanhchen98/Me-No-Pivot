const crest = (tier) => {
  if (tier === 'IRON') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/01_iron/images/iron_baseface_matte.png`;
  } else if (tier === 'BRONZE') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/02_bronze/images/bronze_baseface_matte.png`;
  } else if (tier === 'SILVER') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/03_silver/images/silver_baseface_matte.png`;
  } else if (tier === 'GOLD') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/04_gold/images/gold_baseface_matte.png`;
  } else if (tier === 'PLATINUM') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/05_platinum/images/platinum_baseface_matte.png`;
  } else if (tier === 'DIAMOND') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/06_diamond/images/diamond_baseface_matte.png`;
  } else if (tier === 'MASTER') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/07_master/images/master_baseface_matte.png`;
  } else if (tier === 'GRANDMASTER') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/08_grandmaster/images/grandmaster_baseface_matte.png`;
  } else if (tier === 'CHALLENGER') {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/09_challenger/images/challenger_baseface_matte.png`;
  }
};

module.exports = {
  crest,
};