import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  authService= inject(UsuariosService);
    router= inject(Router);

    ngOnInit(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
