const fetch = require("node-fetch");

async function itemSplashes(itemIds, itemsInfo) {
  if (itemIds.length === 0) {
    return [];
  } else {
    const itemsData = itemsInfo;
    const targetItems = [];
    for (let i = 0; i < itemIds.length; i++) {
      if (itemIds[i] === 38) {
        //const item = spellweaverSpat;
        const item = arcanistSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 48) {
        //const item = renewerSpat;
        const item = academySpat;
        targetItems.push(item);
      } else if (itemIds[i] === 18) {
        const item = skirmisherSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 68) {
        //const item = redeemedSpat;
        const item = syndicateSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 89) {
        const item = assassinSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 78) {
        const item = chemtechSpat;
        targetItems.push(item);
      } else if (itemIds[i] === 28) {
        const item = challengerSpat;
        targetItems.push(item);
      } else {
        let j = 0;
        while (itemsData[j].id !== itemIds[i]) {
          j++;
        }
        if (itemsData[j].id === itemIds[i]) {
          if (itemIds[i] === 99 || itemIds[i] === 2099) {
            targetItems.push(itemsData[j]);
            break;
          }
          if (itemIds[i] !== 10006 && !itemsData[j].icon.includes('Augment')) {
            targetItems.push(itemsData[j]);
          }
        }
      }
    }
    const output = grabIcons(targetItems);
    //console.log('output: ', output);
    return output;
  }
};

const grabIcons = (items) => {
  const iconPaths = [];
  for (let i = 0; i < items.length; i++) {
    const url = urlifyIcons(items[i].icon);
    iconPaths.push({
      name: items[i].name,
      id: items[i].id,
      url: url,
    });
  }
  return iconPaths;
};

const urlifyIcons = (icon) => {
  const path = icon.toLowerCase().substring(0, icon.length - 3);
  return `https://raw.communitydragon.org/latest/game/${path}png`;
};

// fix for the duplicate ID number for certain set 5 traits
const renewerSpat = {
  desc: "The holder gains the Renewer trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  effects: {
    Mana: 15.0,
  },
  from: [8, 4],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Rejuvenator.dds",
  id: 48,
  name: "Renewer Emblem",
  unique: true,
};

const spellweaverSpat = {
  desc: "The holder gains the Spellweaver trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  effects: {
    AP: 10.0,
  },
  from: [3, 8],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Spellweaver.dds",
  id: 38,
  name: "Spellweaver Emblem",
  unique: true,
};

const skirmisherSpat = {
  desc: "The holder gains the Skirmisher trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  effects: {
    AD: 10.0,
  },
  from: [8, 1],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Skirmisher.dds",
  id: 18,
  name: "Skirmisher Emblem",
  unique: true,
};

const redeemedSpat = {
  desc: "The holder gains the Redeemed trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  effects: {
    MagicResist: 20.0,
  },
  from: [6, 8],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Redeemed.dds",
  id: 68,
  name: "Redeemed Emblem",
  unique: true,
};

const assassinSpat = {
  desc: "The holder gains the Assassin trait.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
  effects: {
    CritChance: 10.0,
    "{c4b5579c}": 5.0,
  },
  from: [9, 8],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Assassin.dds",
  id: 89,
  name: "Assassin Emblem",
  unique: true,
};

// Set 6 Spats

const syndicateSpat = {
  desc: "The holder gains the Syndicate trait.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
  effects: {
    Armor: 20.0,
  },
  from: [5, 8],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Set6/Syndicate.TFT_Set6.dds",
  id: 68,
  name: "Syndicate Emblem",
  unique: true,
};

const chemtechSpat = {
  desc: "The holder gains the Chemtech trait.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
  effects: {
    Health: 150.0,
  },
  from: [7, 8],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Set6/Chemtech.TFT_Set6.dds",
  id: 78,
  name: "Chemtech Emblem",
  unique: true,
};

const arcanistSpat = {
  desc: "The holder gains the Arcanist trait.<br><br><tftitemrules>[Unique - only 1 per champion</tftitemrules>",
  effects: {
    AP: 10.0,
  },
  from: [3, 8],
  icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Set6/Arcanist.TFT_Set6.dds",
  id: 38,
  name: "Arcanist Emblem",
  unique: true,
};

const challengerSpat = {
    "desc": "The holder gains the Challenger trait.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
    "effects": {
        "AS": 10.0
    },
    "from": [
        2,
        8
    ],
    "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Set6/Challenger.TFT_Set6.dds",
    "id": 28,
    "name": "Challenger Emblem",
    "unique": true
};

const academySpat = {
  "desc": "The holder gains the Academy trait.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
  "effects": {
      "Mana": 15.0
  },
  "from": [
      8,
      4
  ],
  "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Spatula/Set6/Academy.TFT_Set6.dds",
  "id": 48,
  "name": "Academy Emblem",
  "unique": true
};

const academyAugmentLunchBreak1 = {
    "desc": "TFT6_Augment_AcademyLunchBreak1_Description",
    "effects": {
        "{1e46f656}": 40.0,
        "{f9be09da}": 10.0
    },
    "from": [],
    "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/LunchBreak.TFT_Set6.dds",
    "id": 88,
    "name": "TFT6_Augment_AcademyLunchBreak1_Name",
    "unique": false
};

module.exports = {
  itemSplashes,
};
