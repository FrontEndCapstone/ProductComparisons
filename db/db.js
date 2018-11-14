const { Pool, Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log(`connected to PSQL DB`);
});

const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
    tents(
      _id bigserial PRIMARY KEY NOT NULL,
      imageURL varchar(140),
      title varchar(60),
      ranking bigint,
      reviews smallint,
      price integer,
      sleepingCapacity varchar(20),
      packagedWeight varchar(10),
      numberOfDoors smallint,
      bestUse varchar(20),
      productType varchar(10)
    );

    CREATE TABLE IF NOT EXISTS
    shirts(
      _id bigserial PRIMARY KEY NOT NULL,
      imageURL varchar(140),
      title varchar(60),
      ranking bigint,
      reviews smallint,
      price integer,
      productType varchar(10)
    );

    CREATE INDEX tents_type_index ON tents (productType);
    CREATE INDEX shirt_type_index ON shirts (productType);`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

module.exports = {
  createTables
};
require('make-runnable');