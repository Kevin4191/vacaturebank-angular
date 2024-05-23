import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user-service.service';
import { userDTO } from '../model/userDTO';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;
  userEmail: string = '';
  userPassword: string = '';
  noEmail = false;
  noPassword = false;
  

  constructor(private userService: UserService, private router: Router) {
    this.logInForm = new FormGroup({
      userEmail: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.logInForm.controls['userEmail'].valueChanges.subscribe(res => {
      this.userEmail = res;
    });
    this.logInForm.controls['userPassword'].valueChanges.subscribe(res => {
      this.userPassword = res;
    });
  }

  generateSessionId() {
    return Math.floor((Math.random() * 1000000) + 1).toString(); // Ensure the session ID is unique
  }

  logIn() {
    this.noEmail = this.logInForm.controls['userEmail'].invalid;
    this.noPassword = this.logInForm.controls['userPassword'].invalid;

    if (this.noEmail || this.noPassword) {
      return;
    }

    this.userService.postUser(this.logInForm.value).subscribe(
      res => {
        if (res) {
          const sessionId = this.generateSessionId();
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', sessionId);
          localStorage.setItem('userName', res.body.userName);
          localStorage.setItem('userEmail', res.body.userEmail);
          localStorage.setItem('userRole', res.body.userRole );
          localStorage.setItem('userId', res.body.employersEmployerId);
          this.userService.userDTO = res.body;
          this.router.navigate(['/home']);
        } else {
          console.log('Error during login');
          alert('Login failed. Please check your credentials and try again.');
        }
      },
      err => {
        console.log('Error during login:', err);
      }
    );
  }
}
