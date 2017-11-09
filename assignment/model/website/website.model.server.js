var mongoose = require('mongoose');
var WebsiteSchema = require("./website.schema.server");
var UserModel = require("../user/user.model.server");
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;


module.exports = WebsiteModel;

function createWebsiteForUser(userId, website) {
  var newWebsite = null;
  return WebsiteModel.create(website)
    .then(function (website) {
      newWebsite = website;
      UserModel.findUserById(userId)
        .then(function (user) {
          user.websites.push(newWebsite);
          return user.save();
      });
    });
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({developerId: userId})
    .populate('developerId')
    .exec();
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
  return WebsiteModel.update({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  return WebsiteModel.deleteOne({_id: websiteId});
}
