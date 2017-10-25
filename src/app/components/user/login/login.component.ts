import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  hello: String;
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password';

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.errorFlag = false;
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.findUserByCredentials(this.username, this.password)
      .subscribe(
        (user: User) => {
          this.errorFlag = false;
          this.router.navigate(['/user', user._id]);
        },
        (error: any) => {
          this.errorFlag = true;
        }
      );
  }
}
