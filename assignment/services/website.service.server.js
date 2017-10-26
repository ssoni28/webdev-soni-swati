module.exports = function(app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.delete("/api/website/:websiteId", deleteWebsite);
}

var websites = [
  {_id: '123', name: 'Facebook',    developerId: '456', description: 'Lorem'},
  {_id: '234', name: 'Tweeter',     developerId: '456', description: 'Lorem'},
  {_id: '456', name: 'Gizmodo',     developerId: '456', description: 'Lorem'},
  {_id: '890', name: 'Go',          developerId: '123', description: 'Lorem'},
  {_id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem'},
  {_id: '678', name: 'Checkers',    developerId: '123', description: 'Lorem'},
  {_id: '789', name: 'Chess',       developerId: '234', description: 'Lorem'}
];

function findAllWebsitesForUser(req, res) {
  var userId = req.params['userId'];
  var requiredWebsites = [];
  for (const w in websites) {
    if (websites[w].developerId === userId) {
      requiredWebsites.push(websites[w]);
    }
  }
 res.json(requiredWebsites);
}

function createWebsite(req, res) {
  var website = req.body;
  website._id = Math.random().toString();
  website.developerId = req.params['userId'];
  websites.push(website);
  res.json(website);
}

function updateWebsite(req, res) {
  var website = req.body;
  var websiteId = req.params['websiteId'];
  for (const w in websites) {
    if (websites[w]._id === websiteId) {
      websites[w] = website;
    }
  }
  res.json(website);
}
function deleteWebsite(req, res) {
  var websiteId = req.params['websiteId'];
  for (let w in websites) {
    if (websites[w]._id === websiteId) {
      let y = +w;
      websites.splice(y, 1);
    }
  }
  res.json({});
}

function findWebsiteById(req, res) {
  var websiteId = req.params['websiteId'];
  var website;
  for (let x = 0; x < websites.length; x++) {
    if (websites[x]._id === websiteId) {
      website = websites[x];
    }
      res.json(website);
  }
}
