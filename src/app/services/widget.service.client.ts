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

  newUrl = environment.baseUrl;
  constructor(private http: Http) {

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
    const url = this.newUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget).map((response: Response) => {
      return response.json();
    });
  }
  findWidgetsByPageId(pageId: String) {
    const url = this.newUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
  updateWidget(widgetId: String, widget: Widget) {
    const url = this.newUrl + '/api/widget/' + widgetId;
    return this.http.put(url, widget).map((response: Response) => {
      return response.json();
    });
  }
  deleteWidget(widgetId: String) {
    const url = this.newUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
  findWidgetById(widgetId: String) {
    const url = this.newUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

}
