import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

// injecting service into module
@Injectable()
export class UserService {

  constructor(private router: Router) {

  }
  users: User[] = [
    new User('123', 'alice', 'alice', 'Alice', 'Wonder'),
    new User('234', 'bob', 'bob', 'Bob', 'Marley'),
    new User('345', 'charly', 'charly', 'Charly', 'Garcia'),
    new User('456', 'jannunzi', 'jannunzi', 'Jose', 'Annunzi')
  ];

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById
  };

  findUserByCredentials(username, password) {
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
  createUser(user: User) {
    user._id = Math.random().toString();
    this.users.push(user);
    return user;
  }
  findUserById(userId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }
  updateUser(userId: String, user: User) {
    for (const u in this.users) {
      if (this.users[u]._id === userId) {
        this.users[u].firstName = user.firstName;
        this.users[u].lastName =  user.lastName;
      }
    }
  }
  deleteUser(userId: String) {
    for (const u in this.users) {
      if (this.users[u]._id === userId) {
        const y = +u;
        this.users.splice(y, 1);
        return true;
      }
    }
    return false;
  }
  findUserByUsername(username: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }

}
