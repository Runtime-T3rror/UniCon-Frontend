import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  constructor(private http: HttpClient, private user: UserAuthService) {}
  private tt: any;

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

  fetchTT() {
    let h: any = new HttpHeaders();
    h = h.set('Authorization', this.getCookie('Authorization'));
    return this.http.get('http://192.168.127.46:8080/v1/timetable', {
      headers: h,
    });
  }
}
