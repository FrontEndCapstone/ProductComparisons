const { Pool, Client } = require('pg');
const connectionString = ''

const pool = new Pool({
  connectionString: connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
});

var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;

pg.connect(function(err, client, done) {
  var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
  var fileStream = fs.createReadStream('some_file.tsv')
  fileStream.on('error', done);
  stream.on('error', done);
  stream.on('end', done);
  fileStream.pipe(stream);
});