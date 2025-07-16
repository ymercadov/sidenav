import { Component, Input } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  
  @Input() collapsed = false;
 

  isSideNavCollapsed = false;
  screenWidth = window.innerWidth;

      getBodyClass(): string {
      let styleClass = '';
      if(this.collapsed && this.screenWidth > 768 ) {
        styleClass = 'body-trimed';
      } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 ) {
        styleClass = 'body-md-screen';
      }
      return styleClass;
    }
  onToggleSideNav(data: SideNavToggle) {
     this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  onTakeValue(value: any) {
    // lógica si necesitas manejar eventos desde el header
  }
}
