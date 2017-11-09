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
  api = {
    'createWidget'   : this.createWidget,
    'findWidgetById' : this.findWidgetById
  };

  createWidget(pageId: string, widget: any) {
    const url = this.newUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget)
      .map((response: Response) => {
      return response.json();
    });
  }
  findWidgetsByPageId(pageId: String) {
    const url = this.newUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url)
      .map((response: Response) => {
      return response.json();
    });
  }
  updateWidget(widgetId: String, widget: any) {
    const url = this.newUrl + '/api/widget/' + widgetId;
    return this.http.put(url, widget)
      .map((response: Response) => {
      return response.json();
    });
  }
  deleteWidget(widgetId: String) {
    const url = this.newUrl + '/api/widget/' + widgetId;
    return this.http.delete(url)
      .map((response: Response) => {
      return response.json();
    });
  }
  findWidgetById(widgetId: String) {
    const url = this.newUrl + '/api/widget/' + widgetId;
    return this.http.get(url)
      .map((response: Response) => {
      return response.json();
    });
  }

}
