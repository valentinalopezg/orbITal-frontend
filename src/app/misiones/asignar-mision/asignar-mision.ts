// ──────────────────────────────────────────────────────────
// Asignar Misión — HU6
// Como Comandante de Flota quiero asignar un equipo a un
// planeta para iniciar una misión de conquista
// ──────────────────────────────────────────────────────────

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-asignar-mision',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar],
  templateUrl: './asignar-mision.html',
  styleUrl: './asignar-mision.scss',
})
export class AsignarMision {}