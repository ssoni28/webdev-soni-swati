import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';

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
    private sharedService: SharedService,
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
     this.userService.findUserById(this.userId)
      .subscribe(
        (currentUser: User) => {
          this.user = currentUser;
          this.username = currentUser.username;
          this.firstName = currentUser.firstName;
          this.lastName = currentUser.lastName;
          this.email = currentUser.email;
        }
      );
  }

  logout() {
    this.userService.logout()
      .subscribe((data: any) => {
        this.router.navigate(['/login']);
      });
  }
  updateUser() {
    this.user.username = this.username;
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email = this.email;
    this.userService.updateUser(this.userId, this.user)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user', this.userId]);
        }
      );
  }

  deleteUser() {
    this.userService.deleteUser(this.userId)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/login']);
        }
      );
  }

}
