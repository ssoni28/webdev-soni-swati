import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

// injecting service into module
@Injectable()
export class UserService {

  newUrl = environment.baseUrl;
  constructor(private http: Http) {

  }
  /* api = {
     'createUser'   : this.createUser,
     'findUserById' : this.findUserById
   };
 */

  findUserByCredentials(username: String, password: String): Observable<any> {
    const url = this.newUrl + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
  createUser(user: User) {
    const url = this.newUrl + '/api/user/';
    return this.http.post(url, user)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  findUserById(userId: String) {
    const url = this.newUrl + '/api/user/' + userId;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  updateUser(userId: String, user: User) {
    const url = this.newUrl + '/api/user/' + userId;
    return this.http.put(url, user)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
  deleteUser(userId: String) {
    const url = this.newUrl + '/api/user/' + userId;
    return this.http.delete(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  findUserByUsername(username: String) {
    const url = this.newUrl + '/api/user?username/' + username;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
