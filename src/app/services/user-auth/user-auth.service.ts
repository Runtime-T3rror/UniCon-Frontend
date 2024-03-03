import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}
  private loggedIn: boolean =
    this.getCookie('Authorization') === '' ? false : true;
  private user = {
    name: '',
    token: this.loggedIn ? this.getCookie('Authorization') : '',
  };
  private getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  getToken() {
    return this.user.token;
  }

  validateEmail = (email: string) => {
    const p =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return p.test(email);
  };

  is_authenticated() {
    return this.loggedIn;
  }
  loginUser(response: any) {
    this.loggedIn = true;
    const d = new Date();
    document.cookie =
      'Authorization=Bearer ' +
      response.token +
      '; expires=' +
      d.setMonth(d.getMonth() + 6).toString();
    this.user.token = response.token;
  }

  logoutUser() {
    this.user = {
      name: '',
      token: '',
    };
    this.loggedIn = false;
    document.cookie =
      'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  login(email: string, password: string) {
    return this.http.post('http://192.168.127.46:8080/v1/auth/login', {
      email: email,
      password: password,
    });
  }
  signup(enrollment: number) {
    return this.http.post('http://192.168.127.46:8080/v1/auth/register', {
      email: enrollment + '@ljku.edu.in',
    });
  }
}
