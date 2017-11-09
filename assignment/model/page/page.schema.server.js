var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
  websiteId: {type:mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
  name: String,
  title: string,
  description: String,
  widgets: [{type:mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
  dateCreated: Date
}, {collection: 'page'});

module.exports = PageSchema;
