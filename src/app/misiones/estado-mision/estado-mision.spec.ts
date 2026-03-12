import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoMision } from './estado-mision';

describe('EstadoMision', () => {
  let component: EstadoMision;
  let fixture: ComponentFixture<EstadoMision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoMision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoMision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
