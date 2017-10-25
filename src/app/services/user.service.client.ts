import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

// injecting service into module
@Injectable()
export class UserService {

  baseUrl = environment.baseUrl;
  constructor(private http: Http) {

  }
  /* users: User[] = [
     new User('123', 'alice', 'alice', 'Alice', 'Wonder'),
     new User('234', 'bob', 'bob', 'Bob', 'Marley'),
     new User('345', 'charly', 'charly', 'Charly', 'Garcia'),
     new User('456', 'jannunzi', 'jannunzi', 'Jose', 'Annunzi')
   ];
 */
  /* api = {
     'createUser'   : this.createUser,
     'findUserById' : this.findUserById
   };
 */

  findUserByCredentials(username, password) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
  createUser(user: User) {
    const url = this.baseUrl + '/api/user/';
    return this.http.post(url, user)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  findUserById(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  updateUser(userId: String, user: User) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.put(url, user)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
  deleteUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  findUserByUsername(username: String) {
    const url = this.baseUrl + '/api/user?username/' + username;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
