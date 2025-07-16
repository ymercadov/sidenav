import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MateriasComponent } from './materias/materias.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { MateriaDetalleComponent } from './materia-detalle/materia-detalle.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },      
      { path: 'materias', component: MateriasComponent, canActivate: [authGuard] },   
      { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard]},  
      { path: 'materia-detalle', component: MateriaDetalleComponent, canActivate: [authGuard] },  
      { path: 'logout', component: LogoutComponent },  

    ]//,
    // data: { title: 'Login' },
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: AuthComponent },
      { path: 'registrar', component: RegistrarComponent }
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
