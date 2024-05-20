import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css'],
  providers: [UserService]
})
export class ProfileAddComponent implements OnInit {
  public user: User;
  public url: string;
  public operation: string;
  public alertMessage: string;
  closeResult = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.url = GLOBAL.url;
    this.user = new User(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', new Date, '', '', new Date, new Date);
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.user.rol = 'administrador';
    this.user.rolSecondary = 'vcard';
    this.user.foto = 'img/administradores/admin.png';
    this._userService.addUser(this.user).subscribe(
      response => {
        if (!response) {
          this.alertMessage = 'Error en el servidor!!!';
          Swal.fire({
            icon: 'error',
            title: this.alertMessage
          });
        } else {
          this.alertMessage = 'El usuario se ha agregado correctamente';
          Swal.fire({
            icon: 'success',
            title: this.alertMessage,
            showConfirmButton: true,
            confirmButtonText: "Ok"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this._router.navigate(['profiles']);
            } 
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
}
