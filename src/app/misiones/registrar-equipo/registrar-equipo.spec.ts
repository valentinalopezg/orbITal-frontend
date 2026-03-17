import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEquipo } from './registrar-equipo';

describe('RegistrarEquipo', () => {
  let component: RegistrarEquipo;
  let fixture: ComponentFixture<RegistrarEquipo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEquipo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEquipo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
