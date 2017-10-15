import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {Page} from '../models/page.model.client';

// injecting service into module
@Injectable()
export class PageService {

  constructor(private router: Router) {

  }
  pages: Page[] = [
    new Page('321', 'Post 1', '456', 'Lorem'),
    new Page('432', 'Post 2', '456', 'Lorem'),
    new Page('543', 'Post 3', '456', 'Lorem')
  ];

  api = {

  };

  createPage(websiteId: String, page: Page) {
    user._id = Math.random().toString();
    this.users.push(user);
    return user;
  }
  findPageByWebsiteId(websiteId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }
  updatePage(pageId: String, page: Page) {
    for (const u in this.users) {
      if (this.users[u]._id === userId) {
        this.users[u].firstName = user.firstName;
        this.users[u].lastName =  user.lastName;
        this.users[u].email = user.email;
      }
    }
  }
  deletePage(pageId: String) {
    for (let u in this.users) {
      if (this.users[u]._id === userId) {
        let y = +u;
        this.users.splice(y, 1);
        return true;
      }
    }
    return false;
  }
  findPageById(pageId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }

}
