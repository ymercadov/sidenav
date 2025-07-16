import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirComponent } from './inscribir.component';

describe('InscribirComponent', () => {
  let component: InscribirComponent;
  let fixture: ComponentFixture<InscribirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscribirComponent]
    });
    fixture = TestBed.createComponent(InscribirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
