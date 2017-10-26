
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import {Website} from '../models/website.model.client';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Response } from '@angular/http';

// injecting service into module
@Injectable()
export class WebsiteService {

  newUrl = environment.baseUrl;
  constructor(private http: Http) {

  }
  api = {
    'createWebsite'   : this.createWebsite,
    'findWebsiteById' : this.findWebsiteById
  };
  findWebsitesByUser(userId: String) {
    const url = this.newUrl + '/api/user/' + userId + '/website';
    return this.http.get(url)
      .map((response: Response) => {
      return response.json();
    });
  }

  createWebsite(userId: String, website: Website) {
    const url = this.newUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website)
      .map((response: Response) => {
      return response.json();
    });
  }

  updateWebsite(websiteId: String, website: Website) {
    const url = this.newUrl + '/api/website/' + websiteId;
    return this.http.put(url, website)
      .map((response: Response) => {
      return response.json();
      });
  }
  deleteWebsite(websiteId: String) {
    const url = this.newUrl + '/api/website/' + websiteId;
    return this.http.delete(url)
      .map((response: Response) => {
      return response.json();
      });
  }

  findWebsiteById(websiteId: String) {
    const url = this.newUrl + '/api/website/' + websiteId;
    return this.http.get(url)
      .map((response: Response) => {
      return response.json();
      });
  }

}
