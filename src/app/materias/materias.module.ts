import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasRoutingModule } from './materias-routing.module';

import { InscribirComponent } from './inscribir/inscribir.component';

@NgModule({
  declarations: [    
    
    InscribirComponent    
  ],
  imports: [
    CommonModule,    
    MateriasRoutingModule
  ]   
})
export class MateriasModule { }
