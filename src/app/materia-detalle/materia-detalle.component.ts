import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { materias } from '../entidades/materias';
import { MateriasService } from '../service/materias.service';

@Component({
  selector: 'app-materia-detalle',
  templateUrl: './materia-detalle.component.html',
  styleUrls: ['./materia-detalle.component.scss']
})
export class MateriaDetalleComponent implements OnInit {
   innerWidth: any;
constructor(private router: Router, private api: MateriasService) {}

  data: materias[] = []

  ngOnInit(): void {    
    this.innerWidth = window.innerWidth;        
    this.getAll();
  }

  getAll(){
      this.api.getAll()
    .subscribe(res => {
      this.data = res;   
      console.log(this.data);
    }, err => {            
    });
  }

    @HostListener('window:resize', ['$event'])
    onresize(event: any) {
      this.innerWidth = window.innerWidth;
    }
  
    getClass(): string {
      return this.innerWidth < 925 ? 'row-md' : 'row';
    }
    
} 
