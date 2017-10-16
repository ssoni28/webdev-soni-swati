import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  userId: String;
  user: User;
  username: String;
  firstName: String;
  lastName: String;
  password: String;
  verifyPassword: String;
  email: String;
  errorFlag: boolean;
  errorMsg = 'Password does not match';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    if (this.password === this.verifyPassword) {
      const user = new User('', this.username, this.password, '', '');
      const newUser = this.userService.createUser(user);
      if (newUser) {
        console.log(newUser);
        this.router.navigate(['/user', newUser._id]);
      }
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
