const fetch = require('node-fetch');

async function itemSplashes (itemIds) {
  if (itemIds.length === 0) {
    return [];
  } else {
    let res = await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json');
    let result = await res.json();
    let itemsData = result.items;
    let targetItems = [];
    for (let i = 0; i < itemIds.length; i++) {
      if (itemIds[i] === 38) {
        let item = spellweaverSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 48) {
        let item = renewerSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 18) {
        let item = skirmisherSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 68) {
        let item = redeemedSpat;
        targetItems.push(item);
      } else {
        let j = 0;
        while (itemsData[j].id !== itemIds[i]) {
          j++;
        }
        if (itemsData[j].id === itemIds[i]) {
          if (itemIds[i] === 99  || itemIds[i] === 2099) {
            targetItems.push(itemsData[j]);
            break;
          }
          if (itemIds[i] !== 10006) {
            targetItems.push(itemsData[j]);
          }
        }
      }
    }
    let output = grabIcons(targetItems);
    //console.log('output: ', output);
    return output;
  }
};

const grabIcons = (items) => {
  let iconPaths = [];
  for (let i = 0; i < items.length; i++) {
    let url = urlifyIcons(items[i].icon);
    iconPaths.push({
      name: items[i].name,
      id: items[i].id,
      url: url
    });
  }
  return iconPaths;
};

const urlifyIcons = (icon) => {
  let path = icon.toLowerCase().substring(0, icon.length - 3);
  return `https://raw.communitydragon.org/latest/game/${path}png`;
};

// fix for the duplicate ID number for certain set 5 traits
const renewerSpat = {
  "desc": "The holder gains the Renewer trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  "effects": {
    "Mana": 15.0
  },
  "from": [
    8,
    4
  ],
  "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Rejuvenator.dds",
  "id": 48,
  "name": "Renewer Emblem",
  "unique": true
};

const spellweaverSpat = {
  "desc": "The holder gains the Spellweaver trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  "effects": {
    "AP": 10.0
  },
  "from": [
    3,
    8
  ],
  "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Spellweaver.dds",
  "id": 38,
  "name": "Spellweaver Emblem",
  "unique": true
};

const skirmisherSpat = {
  "desc": "The holder gains the Skirmisher trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  "effects": {
    "AD": 10.0
  },
  "from": [
    8,
    1
  ],
  "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Skirmisher.dds",
  "id": 18,
  "name": "Skirmisher Emblem",
  "unique": true
};

const redeemedSpat = {
  "desc": "The holder gains the Redeemed trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
            "effects": {
                "MagicResist": 20.0
            },
            "from": [
                6,
                8
            ],
            "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Redeemed.dds",
            "id": 68,
            "name": "Redeemed Emblem",
            "unique": true
};


module.exports = {
  itemSplashes,
};