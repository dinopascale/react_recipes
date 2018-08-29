const db = require('mongoose');

db.Promise = global.Promise;
console.log('connecting to database');
db.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/ReactRecipes',
  (err, database) => {
    const myDatabase = database.db('ReactRecipes');
  }
);

module.exports = db;
