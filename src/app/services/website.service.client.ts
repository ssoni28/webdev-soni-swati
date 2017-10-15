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

  findWebsitesByUser(userId: String) {
    let requiredWebsites: Website[];
    for (const w in this.websites) {
      if (this.websites[w].developerId === userId) {
        requiredWebsites.push(this.websites[w]);
      }
    }
    return requiredWebsites;
  }

  createwebsite(userId: String, website: Website) {
    website._id = Math.random().toString();
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }
  findWebsiteById(websiteId: String) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        return this.websites[x];
      }
    }
  }
  updateWebsite(websiteId: String, website: Website) {
    for (const w in this.websites) {
      if (this.websites[w]._id === websiteId) {
        this.websites[w].name = website.name;
        this.websites[w].developerId = website.developerId;
        this.websites[w].description = website.description;
      }
    }
  }
  deleteWebsite(websiteId: String) {
    for (let w in this.websites) {
      if (this.websites[w]._id === websiteId) {
        let y = +w;
        this.websites.splice(y, 1);
        return true;
      }
    }
    return false;
  }

}
