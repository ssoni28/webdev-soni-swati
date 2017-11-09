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

  newUrl = environment.baseUrl;
  constructor(private http: Http) {

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

  createPage(websiteId: String, page: any) {
    const url = this.newUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page).map((response: Response) => {
      return response.json();
    });
  }
  findPageByWebsiteId(websiteId: String) {
    const url = this.newUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
  updatePage(pageId: String, page: any) {
    const url = this.newUrl + '/api/page/' + pageId;
    return this.http.put(url, page).map((response: Response) => {
      return response.json();
    });
  }
  deletePage(pageId: String) {
    const url = this.newUrl + '/api/page/' + pageId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
  findPageById(pageId: String) {
    const url = this.newUrl + '/api/page/' + pageId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

}
