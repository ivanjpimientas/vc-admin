import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css'],
  providers: [UserService]
})
export class ProfileDetailComponent implements OnInit {
  public _idUser: number;
  public user: User;
  public url: string;
  public urlresources: string;
  public alertMessage: string;
  closeResult = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.url = GLOBAL.url;
    this.urlresources = GLOBAL.urlresources;
    this.user = new User(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', new Date, '', '', new Date, new Date);
  }

  ngOnInit(): void {
    this.getUserObject();
  }

  getUserObject(){
    this._route.params.forEach((params: Params) => {
      let id = params['id_user'];
      this._idUser = id;

      this._userService.getUserById(id).subscribe(
        response => {
          if(!response){
            this._router.navigate(['/']);
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
    });
  }
}
