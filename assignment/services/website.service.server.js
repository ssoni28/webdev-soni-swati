module.exports = function (app) {

  var websiteModel = require("../model/website/website.model.server");

  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.delete("/api/website/:websiteId", deleteWebsite);

function findAllWebsitesForUser(req, res) {
  var userId = req.params['userId'];
  websiteModel
    .findAllWebsitesForUser(userId)
    .then(function (websites) {
      res.json(websites);
    });
  /*var requiredWebsites = [];
  for (const w in websites) {
    if (websites[w].developerId === userId) {
      requiredWebsites.push(websites[w]);
    }
  }
  res.json(requiredWebsites);*/
}

function createWebsite(req, res) {
  var website = req.body;
  var userId = req.params['userId'];
  website.developerId = userId;
  websiteModel
    .createWebsiteForUser(userId, website)
    .then(function (website) {
      websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
          res.json(websites);
        });
    });
 // websites.push(website);
 // res.json(website);
}

function updateWebsite(req, res) {
  var website = req.body;
  var websiteId = req.params['websiteId'];
  websiteModel
    .updateWebsite(websiteId, website)
    .then(function (websites) {
      res.json(websites);
    });
/*  for (const w in websites) {
    if (websites[w]._id === websiteId) {
      websites[w] = website;
    }
  }
  res.json(website);*/
}
function deleteWebsite(req, res) {
  var websiteId = req.params['websiteId'];
  websiteModel
    .deleteWebsite(websiteId)
    .then(function (websites) {
      "use strict";
      res.json(websites);
    });
 /* for (let w in websites) {
    if (websites[w]._id === websiteId) {
      let y = +w;
      websites.splice(y, 1);
    }
  }
  res.json({});*/
}

function findWebsiteById(req, res) {
  var websiteId = req.params['websiteId'];
  websiteModel
    .findWebsiteById(websiteId)
    .then(function (websites) {
      res.json(websites);
    });
 /* var website;
  for (let x = 0; x < websites.length; x++) {
    if (websites[x]._id === websiteId) {
      website = websites[x];
      if (website) {
        res.json(website);
      } else {
        res.json(null);
      }
    }
  }*/
}

};
