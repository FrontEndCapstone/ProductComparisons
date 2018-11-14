const { Tent, Shirt, db } = require('./index.js');

db.dropCollection('tents', ()=>{});
db.dropCollection('shirts', ()=>{});

let campTitleOptions1 = ['REI', 'REI Co-op', 'Marmot', 'Mountain', 'Kelty', 'Tepui', 'Alps', 'Himalayan', 'Andes', 'Karakoram', 'Pyrenees', 'Sierra', 'Tian Shan', 'Ural', 'Cascade', 'Pamir', 'Alaska', 'Atlas', 'Uinta', 'Teton', 'Sawatch', 'Blue Ridge', 'Absaroka', 'Transantarctic', 'Big Agnes'];

let campTitleOptions2 = ['Limestone', 'Kingdom', 'Silhouette', 'Nature', 'Dome', 'Hut', 'Cabin', 'Lair', 'Quartz', 'Diamond', 'Jade', 'Howlite', 'Trailblazer', 'Obsidian', 'Coleman', 'Vango', 'Outwell', 'Cabella', 'Columbia', 'Castle', 'Fortress', 'Utopia', 'Safe Haven'];

let shirtTitleOptions1 = ['Intrepid', 'Sahara', 'Stealth', 'Bermuda', 'Backwoods', 'Patagonia', 'Bermuda', 'Balanced', 'All Around', 'Silver Woods', 'Bronze Ridge', 'Skyline', 'Shattered', 'Avant', 'REI Co-op', 'Bernal', 'Nine Trails', 'Lybek', 'Recycled', 'Columbia', 'Active', 'True Crew', 'Ollivanders'];

let shirtTitleOptions2 = ['Heathered', 'Mountain', 'Sweat-Resistant', 'Weatherproof', 'Sierra Collection', 'Lightweight', 'Tamiami', 'Henley', 'High Movement', 'Element', 'Breathable', 'Dry', 'Arcteryx', 'Middle-Earth', 'Asgard', 'Atlantis', 'Gotham', 'Ole', 'Trademark', 'Mithril'];

let idCount = 1;

function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number((Math.random() * (max - min)).toFixed(2));
}

function getShirtData(num) {
  let data = [];
  let limit = num + idCount;
  for(idCount; idCount < limit; idCount++) {

    let titlePart1 = shirtTitleOptions1[getRandInt(0, shirtTitleOptions1.length - 1)];
    let titlePart2 = shirtTitleOptions2[getRandInt(0, shirtTitleOptions2.length - 1)];

    let obj = {
      _id: idCount,
      imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/shirtsResized/S${idCount}.jpg`,
      title: `${titlePart1} ${titlePart2} Shirt`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(10, 85),
      productType: 'Shirt'
    }
    data.push(obj);
  }
  return data;
}

function getTentData(num) {
  let data = [];
  let limit = num + idCount;
  for(idCount; idCount < limit; idCount++) {

    let sleepNum = getRandInt(1, 10);
    let sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`

    let titlePart1 = campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
    let titlePart2 = campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

    let obj = {
      _id: idCount,
      imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/tentsResized/${idCount}.jpg`,
      title: `${titlePart1} ${titlePart2} Tent`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(100, 400),
      sleepingCapacity: sleepCap,
      packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
      numberOfDoors: getRandInt(1, 2),
      bestUse: 'Camping',
      productType: 'Tent'
    }
    data.push(obj);
  }
  return data;
}

tentData = getTentData(51);
shirtData = getShirtData(51);

Tent.create(tentData)
  .then(() => Shirt.create(shirtData))
  .then(() => db.close())
  .catch((err) => console.log('DB SEED ERROR', err));