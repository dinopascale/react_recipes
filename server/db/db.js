const db = require('mongoose');

db.Promise = global.Promise;
db.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ReactRecipes');

module.exports = db;
