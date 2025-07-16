import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { HeaderComponent } from './header/header.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { AuthComponent } from './auth/auth.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './service/interceptor';

import { MateriasComponent } from './materias/materias.component';
import { MessageModalComponent } from './shared/modal/message-modal/message-modal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LogoutComponent } from './logout/logout.component';
import { MateriaDetalleComponent } from './materia-detalle/materia-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,    
    SublevelMenuComponent,
    HeaderComponent,
    AuthComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    RegistrarComponent,
    MateriasComponent,
    MessageModalComponent,
    UsuariosComponent,
    LogoutComponent,
    MateriaDetalleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    CdkMenuModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
