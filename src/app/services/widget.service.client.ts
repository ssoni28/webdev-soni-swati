import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {Widget} from "../models/widget.model.client";

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
    new Widget('678', 'YOUTUBE', '321', '', '', '100%', 'https://youtu.be/AM2Ivdi9c4E'),
    new Widget('789', 'HTML', '321', '', '<p>Lorem ipsum</p>', '', '')

  ];

  api = {

  };

  createWidget(pageId: string, widget: Widget) {
    user._id = Math.random().toString();
    this.users.push(user);
    return user;
  }
  findWidgetsByPageId(pageId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }
  updateWidget(widgetId: String, widget: Widget) {
    for (const u in this.users) {
      if (this.users[u]._id === userId) {
        this.users[u].firstName = user.firstName;
        this.users[u].lastName =  user.lastName;
        this.users[u].email = user.email;
      }
    }
  }
  deleteWidget(widgetId: String) {
    for (let u in this.users) {
      if (this.users[u]._id === userId) {
        let y = +u;
        this.users.splice(y, 1);
        return true;
      }
    }
    return false;
  }
  findWidgetById(widgetId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }

}
