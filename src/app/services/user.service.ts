import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
  public identity: number;
  public token: string;
  public url: string;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
    this.identity = 0;
    this.token = "";
  }

  getUsers(): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.url + 'users', { headers: headers });
  }

  getUserById(_id: number): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.url + 'users/' + _id, { headers: headers });
  }

  addUser(user_to_register: User){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
    let params = JSON.stringify(user_to_register);

    return this._http.post(this.url+'users', params, {headers: headers});
  }

  updateUser(user_to_update: User){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
    let params = JSON.stringify(user_to_update);

    return this._http.patch(this.url+'users/' + user_to_update.id, params, {headers: headers});
  }
}
