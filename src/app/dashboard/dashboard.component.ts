import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { estudianterelacionados } from '../entidades/estudianterelacionados';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  innerWidth: any;
  tipoUsuario = Number(localStorage.getItem('tipousuario'));
  constructor(private router: Router, private api: UsuariosService) {}

  data: estudianterelacionados[] = [];

  ngOnInit(): void {
    const userid = Number(localStorage.getItem('userid'));

    this.innerWidth = window.innerWidth;
    this.getAll(userid);
  }

  getAll(id: number) {
    this.api.getResgistrados(id).subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
      },
      (err) => {}
    );
  }

  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  getClass(): string {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }
}
