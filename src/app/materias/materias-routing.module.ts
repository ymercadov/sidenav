import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InscribirComponent } from './inscribir/inscribir.component';


const routes: Routes = [
  {path:'inscribir', component:InscribirComponent, data:{title: 'Inscribir'}}
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MateriasRoutingModule { }
