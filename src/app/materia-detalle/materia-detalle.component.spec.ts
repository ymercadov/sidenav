import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaDetalleComponent } from './materia-detalle.component';

describe('MateriaDetalleComponent', () => {
  let component: MateriaDetalleComponent;
  let fixture: ComponentFixture<MateriaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriaDetalleComponent]
    });
    fixture = TestBed.createComponent(MateriaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
