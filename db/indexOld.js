const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // this code solves a deprication warning for Mongoose mPromise
// mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true });
const URI = 'mongodb+srv://"YOUR USERNAME":"YOUR PASSWORD"@trailblazerdb-gztzi.mongodb.net/products'
mongoose.connect(URI, { useNewUrlParser: true });
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo DB is running');
});

let tentSchema = new mongoose.Schema({
  _id: Number,
  imageURL: String,
  title: String,
  ranking: Number,
  reviews: Number,
  price: Number,
  sleepingCapacity: String,
  packagedWeight: String,
  numberOfDoors: Number,
  bestUse: String,
  productType: String,
});

let shirtSchema = new mongoose.Schema({
  _id: Number,
  imageURL: String,
  title: String,
  ranking: Number,
  reviews: Number,
  price: Number,
  productType: String,
});

let Shirt = mongoose.model('Shirt', shirtSchema);
let Tent = mongoose.model('Tent', tentSchema);

module.exports.Tent = Tent;
module.exports.Shirt = Shirt;
module.exports.db = db;
