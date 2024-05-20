import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: any;
  public url: string;
  public urlresources: string;
  public alertMessage: string;

  constructor(
    private _userService: UserService,
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
    this.urlresources = GLOBAL.urlresources;
    this.alertMessage = "";
    this.user = new User(0, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", new Date, "", "", new Date, new Date);
  }

  ngOnInit(): void {
    this.getUser(1);
  }

  ngOnDestroy(): void {
  }

  /**
   * Get user object.
   * @param _id
   */
  getUser(_id: number){
    let id = _id;

    this._userService.getUserById(id).subscribe(
      response => {
        if(!response){
          //this._router.navigate(['/']);
        }else{
          this.user = response.result;
          console.log(this.user);
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;

          console.log(error);
        }
      }
    );
  }

}
