// ──────────────────────────────────────────────────────────
// Estado de Misión — HU8
// Como Comandante de Flota quiero monitorear el estado de
// una misión para supervisar el progreso de la conquista
// ──────────────────────────────────────────────────────────

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-estado-mision',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar],
  templateUrl: './estado-mision.html',
  styleUrl: './estado-mision.scss',
})
export class EstadoMision {}