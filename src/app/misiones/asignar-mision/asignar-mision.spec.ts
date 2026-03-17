import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMision } from './asignar-mision';

describe('AsignarMision', () => {
  let component: AsignarMision;
  let fixture: ComponentFixture<AsignarMision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarMision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarMision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
