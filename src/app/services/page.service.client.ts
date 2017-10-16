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
    'createPage'   : this.createPage,
    'findPageById' : this.findPageById
  };

  createPage(websiteId: String, page: Page) {
    page._id = Math.random().toString();
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }
  findPageByWebsiteId(websiteId: String) {
    const requiredPages: Page[] = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        requiredPages.push(this.pages[x]);
      }
    }
    return requiredPages;
  }
  updatePage(pageId: String, page: Page) {
    for (const p in this.pages) {
      if (this.pages[p]._id === pageId) {
        this.pages[p].websiteId = page.websiteId;
        this.pages[p].name = page.name;
        this.pages[p].description = page.description;
      }
    }
  }
  deletePage(pageId: String) {
    for (let p in this.pages) {
      if (this.pages[p]._id === pageId) {
        let y = +p;
        this.pages.splice(y, 1);
        return true;
      }
    }
    return false;
  }
  findPageById(pageId: String) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        return this.pages[x];
      }
    }
  }

}
