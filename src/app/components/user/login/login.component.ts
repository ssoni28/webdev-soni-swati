import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.errorFlag = false;
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    const currentUser = this.userService.findUserByCredentials(this.username, this.password);
    if (currentUser) {
      console.log(currentUser);
      this.router.navigate(['/user', currentUser._id]);
    }
    this.errorFlag = true;
  }
}
