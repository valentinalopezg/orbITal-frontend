import { Component } from '@angular/core';

@Component({
  selector: 'app-registrar-equipo',
  imports: [],
  templateUrl: './registrar-equipo.html',
  styleUrl: './registrar-equipo.scss',
})
export class RegistrarEquipo {
  
  // Creamos nuestra lista real de datos
  integrantes = [
    { nombre: 'Ginyu', poder: '120,000', raza: 'Mutante', claseRaza: 'badge-purple' },
    { nombre: 'Recoome', poder: '65,000', raza: 'Alienígena', claseRaza: 'badge-info' },
    { nombre: 'Burter', poder: '55,000', raza: 'Alienígena', claseRaza: 'badge-info' }
  ];

}
