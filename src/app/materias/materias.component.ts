import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriasService } from '../service/materias.service';
import { materias } from '../entidades/materias';
import { inscritos } from '../entidades/inscritos';
import { EstudiantesmateriasService } from '../service/estudiantesmaterias.service';
import { estudiantesmaterias } from '../entidades/estudiantesmaterias';
import { estudiantesmateriasresponse } from '../entidades/estudiantesmateriasresponse';
import { UsuariosService } from '../service/usuarios.service';
import { usuarios } from '../entidades/usuarios';
import { profesoresmateriasresponse } from '../entidades/profesoresmateriasresponse';
import { profesoresmaterias } from '../entidades/profesoresmaterias';
import { ProfesormateriasService } from '../service/profesormaterias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
})
export class MateriasComponent implements OnInit {
  constructor(
    private router: Router,
    private api: MateriasService,
    private apiEstudiante: EstudiantesmateriasService,
    private apiProfesor: ProfesormateriasService
  ) {}

  showModal = false;
  modalMessage = '';
  modalTitle = 'Error';
  data: materias[] = [];
  dataUsuarios: usuarios[] = [];
  dataestudiantesmateriasresponse: estudiantesmateriasresponse[] = [];
  inscritodata: inscritos[] = [];
  dropdownOpen = false;
  searchTerm = '';
  selectedMateria: any = null;
  tipoUsuario = Number(localStorage.getItem('tipousuario'));

  materiasSelEsudiantes: estudiantesmateriasresponse[] = [];
  materiasSelProfesores:profesoresmateriasresponse[] = [];
  mostrarModal = false;
  userid = Number(localStorage.getItem('userid'));

  ngOnInit(): void {
    this.getAll();
    this.getMateriasAsignadas(this.userid);
  }

  getMateriasAsignadas(id: number) {

if(this.tipoUsuario == 1) {
  this.apiEstudiante.get(id).subscribe({
      next: (res: estudiantesmateriasresponse[]) => {
        this.materiasSelEsudiantes = res;        
      },
      error: (err) => {
        console.error('Error al obtener materias asignadas', err);
      },
    });
}else{
  this.apiProfesor.get(id).subscribe({
      next: (res: profesoresmateriasresponse[]) => {
        this.materiasSelProfesores = res;        
      },
      error: (err) => {
        console.error('Error al obtener materias asignadas', err);
      },
    });
}


    
  }

  getAll() {
    this.api.getAll().subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
      },
      (err) => {}
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => (this.dropdownOpen = false), 200);
  }

  selectMateria(materia: any) {
    const yaSeleccionada = (this.tipoUsuario == 1) ?this.materiasSelEsudiantes.some((m) => m.materiaId === materia.id) :
                                                    this.materiasSelProfesores.some((m) => m.materiaId === materia.id);
    if (!yaSeleccionada) {
      if (this.tipoUsuario == 1) {
        const itemSelecionado: estudiantesmateriasresponse = {
          id: 0,
          estudianteId: 0,
          materiaId: materia.id,
          nombreMateria: materia.nombre,
        };
        this.materiasSelEsudiantes.push(itemSelecionado);
        this.selectedMateria = materia;
        this.api.getInscritos(this.userid, materia.id).subscribe(
          (res) => {
            this.inscritodata = res;
            console.log(this.inscritodata);
            this.abrirModal();
          },
          (err) => {}
        );
      }else{
        
        const itemSelecionado: profesoresmateriasresponse = {
          id: 0,
          profesorId: 0,
          materiaId: materia.id,
          nombreMateria: materia.nombre,
        };
        this.materiasSelProfesores.push(itemSelecionado);
        this.selectedMateria = materia;
        this.api.getInscritos(this.userid, materia.id).subscribe(
          (res) => {
            this.inscritodata = res;
            console.log(this.inscritodata);
            //this.abrirModal();
          },
          (err) => {}
        );
      }
    }
    this.dropdownOpen = false;
    this.searchTerm = '';
  }

  guardarMaterias() {                                                     

    if (this.tipoUsuario == 1){
      const listaGuardar: estudiantesmaterias[] = this.materiasSelEsudiantes.map((m) => ({Id: 0, estudianteId: this.userid, materiaId: m.materiaId }));
       this.apiEstudiante.post(listaGuardar).subscribe({
      next: (res) => {
        this.modalTitle = 'Éxito';
        this.modalMessage = 'Se registró correctamente';
        this.showModal = true;
      },
      error: (err) => {
        let mensaje = 'Error desconocido';
        console.error('Error en el backend:', err);
        if (err.error && typeof err.error === 'object') {
          mensaje = err.error[0].description;
          console.log('mensaje 1 ' + mensaje);
        } else if (typeof err.error === 'string') {
          try {
            const parsed = JSON.parse(err.error);
            mensaje = parsed.message || mensaje;
            console.log('mensaje 2 ' + mensaje);
          } catch {
            mensaje = err.error;
            console.log('mensaje 3 ' + mensaje);
          }
        }
        this.modalMessage = mensaje;
        this.showModal = true;
      },
    });
    }else{
      const listaGuardar: profesoresmaterias[] = this.materiasSelProfesores.map((m) => ({Id: 0, profesorId: this.userid, materiaId: m.materiaId }));
       this.apiProfesor.post(listaGuardar).subscribe({
      next: (res) => {
        this.modalTitle = 'Éxito';
        this.modalMessage = 'Se registró correctamente';
        this.showModal = true;
      },
      error: (err) => {
        let mensaje = 'Error desconocido';
        console.error('Error en el backend:', err);
        if (err.error && typeof err.error === 'object') {
          mensaje = err.error[0].description;
          console.log('mensaje 1 ' + mensaje);
        } else if (typeof err.error === 'string') {
          try {
            const parsed = JSON.parse(err.error);
            mensaje = parsed.message || mensaje;
            console.log('mensaje 2 ' + mensaje);
          } catch {
            mensaje = err.error;
            console.log('mensaje 3 ' + mensaje);
          }
        }
        this.modalMessage = mensaje;
        this.showModal = true;
      },
    });
    }
  }

  cerrarModalPer(): void {
    this.showModal = false;
  }

  eliminarMateriaEstudiante(materia: estudiantesmateriasresponse) {
    const index = this.materiasSelEsudiantes.findIndex(
      (m) => m.materiaId === materia.materiaId
    );
    if (index !== -1) {
      const itemEliminar: estudiantesmaterias = {
        Id: materia.id,
        estudianteId: materia.estudianteId,
        materiaId: materia.materiaId,
      };

      this.apiEstudiante.delete(itemEliminar).subscribe({
        next: (res) => {
          // Eliminación exitosa
          this.materiasSelEsudiantes.splice(index, 1);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.modalTitle = 'Error';
          this.modalMessage = 'No se pudo eliminar la materia';
          this.showModal = true;
        },
      });
    }
  }
  eliminarMateriaProfesores(materia: profesoresmateriasresponse) {
    const index = this.materiasSelEsudiantes.findIndex(
      (m) => m.materiaId === materia.materiaId
    );
    if (index !== -1) {
      const itemEliminar: estudiantesmaterias = {
        Id: materia.id,
        estudianteId: materia.profesorId,
        materiaId: materia.materiaId,
      };

      this.apiEstudiante.delete(itemEliminar).subscribe({
        next: (res) => {
          // Eliminación exitosa
          this.materiasSelEsudiantes.splice(index, 1);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.modalTitle = 'Error';
          this.modalMessage = 'No se pudo eliminar la materia';
          this.showModal = true;
        },
      });
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  get filteredMaterias() {
    return this.data.filter((m) =>
      m.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
