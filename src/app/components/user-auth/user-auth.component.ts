import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
  providers: [],
})
export class UserAuthComponent {
  @ViewChild('enrollment') enrollmentField: ElementRef | any;
  @ViewChild('email') emailField: ElementRef | any;
  @ViewChild('password') passwordField: ElementRef | any;
  @ViewChild('signupbtn') signupBtn: ElementRef | any;
  @ViewChild('loginbtn') loginBtn: ElementRef | any;
  authMode: boolean = false;
  error: boolean = false;
  verificationSent: boolean = false;
  errorMsg: string = 'Error Message';
  constructor(private user: UserAuthService, private router: Router) {}

  private disableSignUp() {
    this.enrollmentField.nativeElement.disabled = true;
    this.signupBtn.nativeElement.disabled = true;
  }
  private disableLogIn() {
    this.emailField.nativeElement.disabled = true;
    this.passwordField.nativeElement.disabled = true;
    this.loginBtn.nativeElement.disabled = true;
  }
  private enableSignUp() {
    this.enrollmentField.nativeElement.disabled = false;
    this.signupBtn.nativeElement.disabled = false;
  }
  private enableLogIn() {
    this.emailField.nativeElement.disabled = false;
    this.passwordField.nativeElement.disabled = false;
    this.loginBtn.nativeElement.disabled = false;
  }

  onLogin() {
    this.disableLogIn();
    const email = this.emailField.nativeElement;
    const password = this.passwordField.nativeElement;
    if (this.user.validateEmail(email.value) && password.value.length >= 8) {
      this.user.login(email.value, password.value).subscribe(
        (response) => {
          this.error = false;
          this.user.loginUser(response);
          this.router.navigate(['']);
          this.enableLogIn();
        },
        (error) => {
          this.error = true;
          this.errorMsg = 'Invalid Credentials!';
          this.enableLogIn();
        }
      );
    } else {
      this.error = true;
      this.errorMsg = 'Please enter correct email or password!';
      this.enableLogIn();
    }
  }

  onSignUp() {
    this.disableSignUp();
    const enrollment = this.enrollmentField.nativeElement;
    if (enrollment.value.length == 14) {
      enrollment.disabled = true;
      this.user.signup(enrollment.value).subscribe(
        (response) => {
          this.verificationSent = true;
          this.error = false;
          this.enableSignUp();
        },
        (error) => {
          if (error.status == 400) {
            this.error = true;
            this.errorMsg = 'Enrollment Number not found!';
          }
          this.enableSignUp();
        }
      );
    } else {
      this.error = true;
      this.errorMsg = 'Please enter correct Enrollment Number!';
      this.enableSignUp();
    }
  }

  changeAuthMode() {
    this.authMode = !this.authMode;
    this.error = false;
  }
}
