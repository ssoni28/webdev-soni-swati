var mongoose = require('mongoose');
var WidgetSchema = require("./widget.schema.server");
var PageModel = require("../page/page.model.server");
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
  var newWidget = null;
  return WidgetModel.create(widget)
    .then(function (widget) {
      newWidget = widget;
      PageModel.findPageById(pageId)
        .then(function (page) {
          page.widgets.push(newWidget);
          return page.save();
        });
    });
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({pageId: pageId})
    .populate('pageId')
    .exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return WidgetModel.update({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  return WidgetModel.deleteOne({_id: widgetId});
}

function reorderWidget(pageId, start, end) {

}
