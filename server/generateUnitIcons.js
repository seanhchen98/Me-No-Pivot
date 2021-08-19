const unitSplash = (id) => {

  const championId = id.toLowerCase();
  if (championId === 'tft5_fiddlesticks' || championId === 'tft5_gwen' || championId === 'tft5_missfortune' || championId === 'tft5_pyke' || championId === 'tft5_senna' || championId === 'tft5_tristana' || championId === 'tft5_rakan' || championId === 'tft5_lucian' || championId === 'tft5_irelia' || championId === 'tft5_olaf' || championId === 'tft5_akshan' || championId === 'tft5_galio') {
    return `https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${championId}_mobile.tft_set5_stage2.png`;
  } else {
    return `https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${championId}_mobile.tft_set5.png`;
  }
};

module.exports = {
  unitSplash,
};