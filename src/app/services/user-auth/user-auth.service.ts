import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}
  validateEmail = (email: string) => {
    const p =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return p.test(email);
  };
  login(email: string, password: string) {
    return this.http.post('https://het-rtugsh.firebaseio.com/login.json', {
      email: email,
      password: password,
    });
  }
}
