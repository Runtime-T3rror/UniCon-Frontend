import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
  providers: [UserAuthService],
})
export class UserAuthComponent {
  @ViewChild('enrollment') enrollmentField: ElementRef | undefined;
  @ViewChild('email') emailField: ElementRef | undefined;
  @ViewChild('password') passwordField: ElementRef | undefined;
  authMode: boolean = false;
  error: boolean = false;
  errorMsg: string = 'Error Message';
  constructor(private user: UserAuthService, private route: Router) {}

  onLogin() {
    const email = this.emailField?.nativeElement;
    const password = this.passwordField?.nativeElement;
    if (this.user.validateEmail(email.value) && password.value.length > 8) {
      email.disabled = true;
      password.disabled = true;
      this.user.login(email.value, password.value).subscribe(
        (response) => {
          this.error = false;
          email.disabled = false;
          password.disabled = false;
          this.route.navigate(['/']);
        },
        (error) => {
          this.error = true;
          email.disabled = false;
          password.disabled = false;
          this.errorMsg = 'Invalid Credentials!';
        }
      );
    } else {
      this.error = true;
      email.disabled = false;
      password.disabled = false;
      this.errorMsg = 'Please enter correct email or password!';
    }
  }

  changeAuthMode() {
    this.authMode = !this.authMode;
    this.error = false;
  }
}
