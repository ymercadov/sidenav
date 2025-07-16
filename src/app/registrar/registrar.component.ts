import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { usuarios } from '../entidades/usuarios';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  constructor(private router: Router, private api: UsuariosService) {}

   usuario = {
    tipousuariosId: null,
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  };

  OnCancelar(): void {
    this.router.navigate(['/login']);
  }

  Onregister(data: any): void {
    debugger
    if (data.invalid) {
      data.control.markAllAsTouched();
      return;
    }

    const nuevoUsuario = Object.assign(new usuarios(), data.value);
    this.api.post(nuevoUsuario)      
        .subscribe
        ({
          next: (res) => {
         
            this.router.navigate(['/login']);
          },
          error: (err) => {
           let mensaje = 'Error desconocido';
          console.error("Error en el backend:", err);
          if (err.error && typeof err.error === 'object') {
            mensaje = err.error.message;
          } else if (typeof err.error === 'string') {
            try {
              const parsed = JSON.parse(err.error);
              mensaje = parsed.message || mensaje;
            } catch {
              mensaje = err.error;
            }
          }
          alert(mensaje);
        }
        });
    console.log('Datos del usuario:', data);
    //this.router.navigate(['/login']);
  }
}
