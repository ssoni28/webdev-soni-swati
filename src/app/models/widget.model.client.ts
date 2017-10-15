export class Widget {
  _id: String;
  widgetType: string;
  pageId: String;
  size: String;
  text: String;
  width: String;
  url: String;
  constructor(_id, widgetType, pageId, size, text, width, url) {
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
  }
}
