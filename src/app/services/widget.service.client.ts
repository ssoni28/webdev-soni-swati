import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {Widget} from '../models/widget.model.client';

// injecting service into module
@Injectable()
export class WidgetService {

  constructor(private router: Router) {

  }
  widgets: Widget[] = [
    new Widget('123', 'HEADING', '321', '2', 'GIZMODO', '', ''),
    new Widget('234', 'HEADING', '321', '4', 'Lorem ipsum', '', ''),
    new Widget('345', 'IMAGE', '321', '', '', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('456', 'HTML', '321', '', '<p>Lorem ipsum</p>', '', ''),
    new Widget('567', 'HEADING', '321', '4', 'Lorem ipsum', '', ''),
    new Widget('678', 'YOUTUBE', '321', '', '', '100%', 'https://www.youtube.com/embed/nhyc5ca3eVw'),
    new Widget('789', 'HTML', '321', '', '<p>Lorem ipsum</p>', '', '')

  ];
  api = {
    'createWidget'   : this.createWidget,
    'findWidgetById' : this.findWidgetById
  };

  createWidget(pageId: string, widget: Widget) {
    const widgetId: String =  Math.random().toString();
    if (widget.widgetType === 'HEADING') {
      const w: Widget = new Widget(widgetId, widget.widgetType, pageId, widget.size, widget.text, '', '');
      this.widgets.push(w);
    } else if (widget.widgetType === 'IMAGE') {
      const w: Widget = new Widget(widgetId, widget.widgetType, pageId, '', '', widget.width, widget.url);
      this.widgets.push(w);
    } else if (widget.widgetType === 'HTML') {
      const w: Widget = new Widget(widgetId, widget.widgetType, pageId, '', widget.text, '', '');
      this.widgets.push(w);
    } else if (widget.widgetType === 'YOUTUBE') {
      const w: Widget = new Widget(widgetId, widget.widgetType, pageId, '', '', widget.width, widget.url);
      this.widgets.push(w);
    }
  }
  findWidgetsByPageId(pageId: String) {
    const requiredWidgets: Widget[] = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId) {
        requiredWidgets.push(this.widgets[x]);
      }
    }
    return requiredWidgets;
  }
  updateWidget(widgetId: String, widget: Widget) {
    for (const w in this.widgets) {
      if (this.widgets[w]._id === widgetId) {
        this.widgets[w].url = widget.url;
        this.widgets[w].width = widget.width;
        this.widgets[w].text = widget.text;
        this.widgets[w].size = widget.size;
        this.widgets[w].pageId = widget.pageId;
        this.widgets[w].widgetType = widget.widgetType;
      }
    }
  }
  deleteWidget(widgetId: String) {
    for (let w in this.widgets) {
      if (this.widgets[w]._id === widgetId) {
        let y = +w;
        this.widgets.splice(y, 1);
        return true;
      }
    }
    return false;
  }
  findWidgetById(widgetId: String) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        return this.widgets[x];
      }
    }
  }

}
