module.exports = function (app) {

  var pageModel = require("../model/page/page.model.server");

  app.post("/api/website/:websiteId/page", createPage);
  app.put("/api/page/:pageId", updatePage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.delete("/api/page/:pageId", deletePage);

 /* var pages = [
    { _id: '321', name: 'Post 1', websiteId: '456', description: 'Lorem' },
    { _id: '432', name: 'Post 2', websiteId: '456', description: 'Lorem' },
    { _id: '543', name: 'Post 3', websiteId: '456', description: 'Lorem' },
    { _id: '23423', name: 'Page 1', websiteId: '890', description: 'Lorem' },
    { _id: '12132', name: 'Page 2', websiteId: '890', description: 'Lorem' },
    { _id: '11111', name: 'Page 3', websiteId: '890', description: 'Lorem' }
  ];
*/
  function createPage(req, res) {
   var page = req.body;
   var websiteId = req.params['websiteId'];
   pageModel
     .createPage(websiteId, page)
     .then(function (page) {
      pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
          res.json(pages);
        });
     });
  /* page._id = Math.random().toString();
   pages.push(page);
   res.json(page);*/
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel
      .findAllPagesForWebsite(websiteId)
      .then(function (requiredPages) {
        res.json(requiredPages);
      });
   /* var requiredPages = [];
    for (let x = 0; x < pages.length; x++) {
      if (pages[x].websiteId === websiteId) {
        requiredPages.push(pages[x]);
      }
    }
    res.json(requiredPages);*/
  }

  function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    pageModel
      .updatePage(pageId, page)
      .then(function (pages) {
        res.json(pages);
      })
    /*for (const p in pages) {
      if (pages[p]._id === pageId) {
       pages[p] = page;
      }
    }
    res.json(page);*/
  }
  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel
      .deletePage(pageId)
      .then(function (pages) {
        res.json(pages);
      });
    /*for (let p in pages) {
      if (pages[p]._id === pageId) {
        let y = +p;
        pages.splice(y, 1);
      }
    }
    res.json(null);*/
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
      .findPageById(pageId)
      .then(function (page) {
        res.json(page);
      });
    /*var page;
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        page = pages[x];
      }
    }
    res.json(page);*/
  }
};
