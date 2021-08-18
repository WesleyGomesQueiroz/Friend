import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  userData: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) { }

  autorize() {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userData.value.token}` 
      })
    };
  }

  getAllFriends(data: any) {
    this.autorize();

    return this.httpClient.post(`${environment.friend_API}v1/Friend/get-all-friends`, data, this.httpOptions);
  }


}
