import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  userId: String;
  user: any;
  username: String;
  firstName: String;
  lastName: String;
  password: String;
  verifyPassword: String;
  email: String;
  errorFlag: boolean;
  errorMsg = 'Password does not match';
  alreadyExistsFlag: boolean;
  alreadyExistsMsg = 'User already exists';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
  }

  register() {
    this.errorFlag = false;
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    if (this.password !== this.verifyPassword) {
      this.errorFlag = true;
      return;
    }
    this.userService
      .register(this.username, this.password)
      .subscribe((user) => {
        this.sharedService.user = user;
        this.router.navigate(['/user', user._id]);
      });
  }

 /* createUser() {
    this.errorFlag = false;
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    if (this.password === this.verifyPassword) {
      const user = {
        username: this.username,
        password: this.password
      };
     // const user = new User(' ', this.username, this.password, ' ', ' ');
      this.userService.createUser(user)
        .subscribe(
          (newUser: any) => {
            this.router.navigate(['/user/', newUser._id]);
          },
          (error: any) => {
            this.errorFlag = true;
          }
        );
    }
  }
*/
  cancel() {
    this.router.navigate(['/login']);
  }
}
