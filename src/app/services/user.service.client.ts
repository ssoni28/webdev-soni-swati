import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SharedService} from './shared.service.client';

// injecting service into module
@Injectable()
export class UserService {

  newUrl = environment.baseUrl;
  constructor(private http: Http,
              private sharedService: SharedService,
              private router: Router) {

  }
  /* api = {
     'createUser'   : this.createUser,
     'findUserById' : this.findUserById
   };
 */

  options: RequestOptions = new RequestOptions();

  login(username: String, password: String) {

    this.options.withCredentials = true; // jga

    const body = {
      username : username,
      password : password
    };
    return this.http.post(this.newUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  logout() {
    this.options.withCredentials = true;
    return this.http.post(this.newUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(this.newUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user;
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  register(username, password) {
    const url = this.newUrl + '/api/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username: String, password: String): Observable<any> {
    const url = this.newUrl + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
  createUser(user: any) {
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
