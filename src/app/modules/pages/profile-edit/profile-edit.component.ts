import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  providers: [UserService]
})
export class ProfileEditComponent implements OnInit {
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

  onSubmit(): void {
    this.user.rememberToken = '';
    this.user.emailTwo = '';
    this.user.emailVerifiedAt = new Date;
    this.user.createdAt = new Date;
    this.user.updatedAt = new Date;
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response) {
          this.alertMessage = 'Error en el servidor!!!';
          Swal.fire({
            icon: 'error',
            title: this.alertMessage
          });
        } else {
          this.alertMessage = 'El usuario se ha actualizado correctamente';

          if(!this.filesToUpload){
            //Redirección
          }else{
            this.makeFileRequest("", [], this.filesToUpload).then(
              (result: any) => {
                this.user.foto = result.foto;
              }
            );
          }

          Swal.fire({
            icon: 'success',
            title: this.alertMessage,
            showConfirmButton: false,
            timer: 1800
          });
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

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    //var token = this.token;

    return new Promise(function(resolve, reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++){
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      //xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
