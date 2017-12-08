module.exports = function (app) {

  var widgetModel = require("../model/widget/widget.model.server");
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname +'/../../public/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  /*var widgets = [
    {_id: '123', widgetType: 'HEADING', pageId: '321', size: 2, text: 'GIZMODO'},
    {_id: '234', widgetType: 'HEADING', pageId: '321', size: 4, text: 'Lorem ipsum'},
    {_id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%', url: 'http://lorempixel.com/400/200/'},
    {_id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
    {_id: '567', widgetType: 'HEADING', pageId: '321', size: 4, text: 'Lorem ipsum'},
    {_id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%', url: 'https://www.youtube.com/embed/nhyc5ca3eVw'},
    {_id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'}
  ];*/

  function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params["pageId"];
    widgetModel
      .createWidget(pageId, widget)
      .then(function (widget) {
        widgetModel
          .findAllWidgetsForPage(pageId)
          .then(function (widgets) {
            res.json(widgets);
          });
      });

    /* var widgetId = Math.random().toString();
     if (widget.widgetType === 'HEADING') {
       var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":widget.size,
         "text":widget.text,"width":'',"url":'' };
       widgets.push(w);
       res.json(w);
     } else if (widget.widgetType === 'IMAGE') {
       var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":'',
         "text":'',"width":widget.width,"url":widget.url};
       widgets.push(w);
       res.json(w);
     } else if (widget.widgetType === 'HTML') {
       var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":'',
         "text":widget.text,"width":'',"url":''};
       widgets.push(w);
       res.json(w);
     } else if (widget.widgetType === 'YOUTUBE') {
       var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":'',
         "text":'',"width":widget.width,"url":widget.url};
       widgets.push(w);
       res.json(w);
     } else{
       res.status(404).send({error:"Not found "});
     }*/

  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetModel
      .findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        res.json(widgets)
      });
    /*var requiredWidgets = [];
    for (var x in widgets) {
      if (widgets[x].pageId === pageId) {
        requiredWidgets.push(widgets[x]);
      }
    }
    res.json(requiredWidgets);*/
  }
  function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    widgetModel
      .updateWidget(widgetId, widget)
      .then(function (widgets) {
        res.json(widgets);
      });
    /* var updatedWidget = widgets.find(function (widget) {
       return widget._id === widgetId;
     });
     if(widget.widgetType === 'YOUTUBE'){
       updatedWidget.width = widget.width;
       updatedWidget.url = widget.url;
       res.json(updatedWidget);

     } else if(widget.widgetType === 'IMAGE'){
       updatedWidget.text = widget.text;
       updatedWidget.url = widget.url;
       updatedWidget.width = widget.width;
       res.json(updatedWidget);

     } else if(widget.widgetType === 'HEADING'){
       updatedWidget.text = widget.text;
       updatedWidget.size = widget.size;
       res.json(updatedWidget);

     } else{
       res.status(404).send({error:"Not Found"});
     }*/
  }
  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
      .deleteWidget(widgetId)
      .then(function (widgets) {
        res.json(widgets);
      })
    /* for (var w in widgets) {
       if (widgets[w]._id === widgetId) {
         var y = +w;
         widgets.splice(y, 1);
       }
     }*/
  }
  function findWidgetById(req, res) {
    var widget;
    var widgetId = req.params['widgetId'];
    widgetModel
      .findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
    /* for (var x in widgets) {
       if (widgets[x]._id === widgetId) {
         widget = widgets[x];
       }
     }
     if(widget) {
       res.json(widget);
     } else {
       res.status(404).send({error:"Not Found"});
     }*/
  }

  function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var url = '/uploads/'+filename;
    var w = {
      "type":"IMAGE",
      "pageId":pageId,
      "size":"",
      "text":"",
      "width":width,
      "url":url
    };
   // widget = getWidgetById(widgetId);
   // w.url = '/uploads/'+filename;
    if(widgetId === '') {
      widgetModel.createWidget(w)
        .then(function(w) {
          widgetId = w._id;
        });
    } else {
    widgetModel.updateWidget(widgetId, w)
      .then(function (result) {
       console.log("Image uploaded");
      });
    }
        var callbackUrl = "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
  }

  function getWidgetById(widgetId) {
    return widgetModel.findWidgetById(widgetId)
      .then(function (result) {
        if (result === null) {
          return null;
        }
        return result
      })
      .catch(function (error) {
        return null
      });
  }
};
