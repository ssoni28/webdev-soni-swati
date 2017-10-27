module.exports = function (app) {

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  var widgets = [
    {_id: '123', widgetType: 'HEADER', pageId: '321', size: 2, text: 'GIZMODO'},
    {_id: '234', widgetType: 'HEADER', pageId: '321', size: 4, text: 'Lorem ipsum'},
    {_id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%', url: 'http://lorempixel.com/400/200/'},
    {_id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
    {_id: '567', widgetType: 'HEADER', pageId: '321', size: 5, text: 'Lorem ipsum'},
    {_id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%', url: 'https://www.youtube.com/embed/nhyc5ca3eVw'},
    {_id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'}
  ];

  function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params['pageId'];
    var widgetId = Math.random().toString();
    if (widget.widgetType === 'HEADING') {
      var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":widget.size,
        "text":widget.text,"width":'',"url":'' };
      widgets.push(widget);
      res.json(widget);
    } else if (widget.widgetType === 'IMAGE') {
      var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":'',
        "text":'',"width":widget.width,"url":widget.url};
      widgets.push(widget);
      res.json(widget);
    } else if (widget.widgetType === 'HTML') {
      var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":'',
        "text":widget.text,"width":'',"url":''};
      widgets.push(widget);
      res.json(widget);
    } else if (widget.widgetType === 'YOUTUBE') {
      var w = {"_id":widgetId,"widgetType":widget.widgetType,"pageId":pageId,"size":'',
        "text":'',"width":widget.width,"url":widget.url};
      widgets.push(widget);
      res.json(widget);
    } else{
      res.status(404).send({error:"Not found "});
    }

  }
  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    var requiredWidgets = [];
    for (var x in widgets) {
      if (widgets[x].pageId === pageId) {
        requiredWidgets.push(widgets[x]);
      }
    }
    res.json(requiredWidgets);
  }
  function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    var updatedWidget = widgets.find(function (widget) {
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
    }
  }
  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    for (var w in widgets) {
      if (widgets[w]._id === widgetId) {
        var y = +w;
        widgets.splice(y, 1);
      }
    }
  }
  function findWidgetById(req, res) {
    var widget;
    var widgetId = req.params['widgetId'];
    for (var x in widgets) {
      if (widgets[x]._id === widgetId) {
        widget = widgets[x];
      }
    }
    if(widget) {
      res.json(widget);
    } else {
      res.status(404).send({error:"Not Found"});
    }
  }

};
