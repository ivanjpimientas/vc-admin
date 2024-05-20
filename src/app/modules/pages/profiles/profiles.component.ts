import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';

declare let $: any;

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  providers: [UserService]
})
export class ProfilesComponent implements OnInit, OnDestroy {
  public user: any;
  public users: any = [];
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
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
  }

  /**
   * Get testimoniales object list.
   */
  getUsers(){

    this._userService.getUsers().subscribe(
      response => {
        if(!response){
          //this._router.navigate(['/']);
        }else{
          this.users = response.result;
          console.log(this.users);
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
