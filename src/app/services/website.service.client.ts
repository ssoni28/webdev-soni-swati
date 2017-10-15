import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {Website} from '../models/website.model.client';

// injecting service into module
@Injectable()
export class WebsiteService {

  constructor(private router: Router) {

  }
  websites: Website[] = [
    new Website('123', 'Facebook', '456', 'Lorem'),
    new Website('234', 'Tweeter', '456', 'Lorem'),
    new Website('456', 'Gizmodo', '456', 'Lorem'),
    new Website('890', 'Go', '123', 'Lorem'),
    new Website('567', 'Tic Tac Toe', '123', 'Lorem'),
    new Website('678', 'Checkers', '123', 'Lorem'),
    new Website('789', 'Chess', '234', 'Lorem')
  ];


  api = {

  };

  findWebsiteByUser(userId: String) {
    let requiredUser;
    for (const x in this.users) {
      if (this.users[x].username === username && this.users[x].password === password) {
        requiredUser = this.users[x];
        return requiredUser;
      }
    }
    const errorMsg = this.makeError(username, password);
    return errorMsg;
  }

  makeError(username, password) {
    for (const u in this.users) {
      if (this.users[u].username === username && this.users[u].password !== password) {
        return 'Password is not correct.';
      }
    }
    return 'Username does not exists';
  }
  createwebsite(userId: String, website: Website) {
    user._id = Math.random().toString();
    this.users.push(user);
    return user;
  }
  findWebsiteById(websiteId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }
  updateWebsite(websiteId: String, website: Website) {
    for (const u in this.users) {
      if (this.users[u]._id === userId) {
        this.users[u].firstName = user.firstName;
        this.users[u].lastName =  user.lastName;
        this.users[u].email = user.email;
      }
    }
  }
  deleteWebsite(websiteId: String) {
    for (let u in this.users) {
      if (this.users[u]._id === userId) {
        let y = +u;
        this.users.splice(y, 1);
        return true;
      }
    }
    return false;
  }

}
