const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const {Pool, Client} = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;

const dotenv = require('dotenv');
dotenv.config();

const randTent =()=> {
  let sleepNum = parseInt(Math.random()*10);
  return {
    imageURL: faker.image.avatar(),
    title: faker.company.bs(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*400+100),
    sleepingCapacity: sleepNum>7?
      `8+ people`:`${sleepNum}-person`,
    packagedWeight: parseInt(Math.random()*25+12),
    numberOfDoors: parseInt(Math.random()*2+1),
    bestUse: 'Camping',
    productType: 'Tent'
  };
};

const randShirt =()=> {
  return {
    imageURL: faker.image.avatar(),
    title: faker.company.bs(),
    ranking: (Math.random()*5).toFixed(2),
    reviews: parseInt(Math.random()*100),
    price: parseInt(Math.random()*85+10),
    productType: 'Shirt'
  };
};

//write to csv
const qtyTents = 10;
const qtyShirts = 10;

const shirtCols = 'imageURL, title, ranking, reviews, price, productType';
const tentCols = 'imageURL, title, ranking, reviews, price, sleepingCapacity, packagedWeight, numberOfDoors, bestUse, productType';

var writer = csvWriter({sendHeaders:false});
writer.pipe(fs.createWriteStream(path.join(__dirname,'shirts.csv')));
for (let i = 0; i< qtyShirts; i++){
  writer.write(randShirt());
}
writer.end();

var writer = csvWriter({sendHeaders:false});
writer.pipe(fs.createWriteStream(path.join(__dirname,'tents.csv')));
for (let j = 0; j< qtyTents; j++){
  writer.write(randTent());
}

//copy from csv
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();

const executeQuery = (targetTable) => {
    const execute = (target, callback) => {
        client.query(`Truncate ${target}`, (err) => {
                if (err) {
                client.end()
                callback(err)
                } else {
                console.log(`Truncated ${target}`)
                callback(null, target)
                }
            })
    }
    execute(targetTable, (err) =>{
        if (err) return console.log(`Error in Truncate Table: ${err}`)
        let stream = client.query(copyFrom(`COPY ${targetTable} (${columns}) FROM STDIN CSV`));
        let fileStream = fs.createReadStream(inputFile);

        fileStream.on('error', (error) =>{
            console.log(`Error in creating read stream ${error}`);
        });
        stream.on('error', (error) => {
            console.log(`Error in creating stream ${error}`);
        });
        stream.on('end', () => {
            console.log(`Completed loading data into ${targetTable}`);
            client.end();
        });
        fileStream.pipe(stream);
    })
}

let inputFile = path.join(__dirname,'shirts.csv');
console.log(inputFile);
let table = 'shirts';
let columns = shirtCols;

executeQuery(table);

// CREATE INDEX tents_type_index ON tents (productType);
// CREATE INDEX shirt_type_index ON shirts (productType);`;