var mongoose = require('mongoose');
var WebsiteSchema = mongoose.Schema({
  _user: String,
  name: String,
  description: String,
  pages: String,
  dateCreated: Date,
  salary: Number
}, {collection: 'user'});
module.exports = UserSchema;
