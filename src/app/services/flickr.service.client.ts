import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {

  key = '8157313f8190c7e2f535bccd5e247600';
  secret = 'ac1f961b247b412b';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  constructor(private _http: Http) {}

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    console.log(url);
    return this._http.get(url);
  }

}
