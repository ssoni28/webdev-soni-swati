import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: String;
  username: String;
  firstName: String;
  lastName: String;
  password: String;
  user: User;
  email: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password!';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });

    this.getUser();
  }

  getUser() {
    const currentUser = this.userService.findUserById(this.userId)
      .subscribe(
        (data: any) => {
          this.username = data.username;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.email = data.email;
        },
        (error: any) => {

        }
      );
  }

  logout() {
    this.router.navigate(['/login']);
  }
  updateUser() {
    const user = new User(this.userId, this.username, this.password, this.firstName, this.lastName);
    user.email = this.email;
    this.userService.updateUser(this.userId, user);
    this.ngOnInit();
  }

  deleteUser() {
    this.userService.deleteUser(this.userId);
    this.router.navigate(['/login']);
  }

}
