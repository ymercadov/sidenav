import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { lenguages, notifications, userItems } from './header-dummy-data';
import { Router } from '@angular/router';
import { ComunService } from '../service/Comun.Service';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() takeValue: EventEmitter<boolean> = new EventEmitter();
  @Input() collapsed = false;
  @Input() screenWidth = 0;  
  
  canShowSearchAsOverlay = false;
  selectedLanguage: any;
  languages = lenguages;
  notifications = notifications;
  userItems = userItems;
  authService: any;
//  isAuthenticate = false;
  

  constructor(private router: Router, private comunSevice: ComunService, private api: UsuariosService ){}

  @HostListener('window:resize', ['$event']) 
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {        
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
    
  }

  logout() {        
    this.api.logout();
      this.router.navigate(['/login']);
  }

  getHeadClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'head-trimed';
    } else {
      styleClass = 'head-md-screen'; 
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if(innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }  
}






