import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public user: UserAuthService, private router: Router) {}
  logOut() {
    this.user.logoutUser();
    this.router.navigate(['/auth']);
  }
}
