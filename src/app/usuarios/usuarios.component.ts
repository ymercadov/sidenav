import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { usuarios } from '../entidades/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  constructor(private router: Router, private api: UsuariosService) {}

  usuario: usuarios = new usuarios();
  mostrarModal = false;
  modalTitle = 'Error';
  modalMessage = '';
  showModal = false;
  userid = Number(localStorage.getItem('userid'));

  ngOnInit(): void {
    this.get(this.userid);
  }
  get(id: number) {
    this.api.get(id).subscribe(
      (res) => {
        this.usuario = res;
        console.log(this.usuario);
      },
      (err) => {}
    );
  }

  OnCancelar(): void {
    this.router.navigate(['/dashboard']);
  }

  OnActualizar(data: any): void {

    if (data.invalid) {
      data.control.markAllAsTouched();
      return;
    }
    const nuevoUsuario = Object.assign(new usuarios(), data.value);
    this.api.update(this.usuario).subscribe({
      next: (res) => {
        this.modalTitle = 'Actualización exitosa';
        this.modalMessage =
          'Los datos del usuario fueron actualizados correctamente.';
        this.showModal = true;
      },
      error: (err) => {
        let mensaje = 'Error desconocido';
        console.error('Error en el backend:', err);
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
        this.modalTitle = 'Error';
        this.modalMessage = mensaje;
        this.showModal = true;
      },
    });
  }

  cerrarModalPer(): void {
    this.showModal = false;    
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
}
