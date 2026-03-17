// ──────────────────────────────────────────────────────────
// Registrar Equipo — HU4
// Como Comandante de Flota quiero registrar equipos de
// combate para disponer de unidades para misiones
// ──────────────────────────────────────────────────────────

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-registrar-equipo',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar],
  templateUrl: './registrar-equipo.html',
  styleUrl: './registrar-equipo.scss',
})
export class RegistrarEquipo {

  // 🔧 MOCK: lista de integrantes del equipo
  integrantes = [
    { nombre: 'Ginyu',   poder: '120,000', raza: 'Mutante',    claseRaza: 'badge-purple' },
    { nombre: 'Recoome', poder: '65,000',  raza: 'Alienígena', claseRaza: 'badge-info' },
    { nombre: 'Burter',  poder: '55,000',  raza: 'Alienígena', claseRaza: 'badge-info' }
  ];
}