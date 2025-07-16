import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { loginmodel } from '../entidades/loginmodel';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Output() takeValue: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private api: UsuariosService) {}
  showModal = false;
  modalMessage = '';
  modalTitle = 'Error';
  loginmodelview = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    debugger;
    this.takeValue.emit(false);
  }
  Onlogin(data: any): void {
    if (data.invalid) {
      data.control.markAllAsTouched();
      return;
    }
    debugger;
    const loginModel = Object.assign(new loginmodel(), data.value);

    this.api.login(loginModel).subscribe({
      next: (response) => {
        if (response.result) {
          this.router.navigate(['dashboard']);
        } else {
          this.modalMessage = "login fallido, respuesta no válida";
        this.showModal = true;
        }
      },
      error: (error) => {

         this.modalMessage = "login fallido, respuesta no válida";
        this.showModal = true;

        console.log('login failed');
        console.log(error);
      },
    });
  }

  cerrarModalPer(): void {
    this.showModal = false;
  }
  GoToRegister(): void {
    this.router.navigate(['/registrar']);
  }
}
