// ──────────────────────────────────────────────────────────
// Estado de Misión — HU8
// Como Comandante de Flota quiero monitorear el estado de
// una misión para supervisar el progreso de la conquista
// ──────────────────────────────────────────────────────────

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../../shared/sidebar/sidebar';

export interface TimelineItem {
  titulo: string;
  descripcion: string;
  fecha: string;
  completado: boolean;
}

export interface MisionDetalle {
  id: string;
  planeta: string;
  fechaInicio: string;
  fechaLimite: string;
  estado: 'en_progreso' | 'completada' | 'cancelada';
  progreso: number;
  diasRestantes: number;
  zonasCompletadas: number;
  zonasTotal: number;
  nivelAmenaza: 'Bajo' | 'Medio' | 'Alto' | 'Extremo';
  equipo: {
    id: number;
    nombre: string;
    integrantes: number;
    poderTotal: number;
    reporte: string;
  };
  timeline: TimelineItem[];
}

@Component({
  selector: 'app-estado-mision',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar],
  templateUrl: './estado.html',
  styleUrl: './estado.scss',
})
export class EstadoMision implements OnInit {

  // ── Datos de la misión activa ──
  // 🔧 MOCK: reemplazar por GET /api/misiones/{id}
  mision: MisionDetalle = {
    id: 'M-2024-047',
    planeta: 'Namek',
    fechaInicio: '2026-02-10',
    fechaLimite: '2026-04-15',
    estado: 'en_progreso',
    progreso: 68,
    diasRestantes: 18,
    zonasCompletadas: 5,
    zonasTotal: 7,
    nivelAmenaza: 'Alto',
    equipo: {
      id: 1,
      nombre: 'Escuadrón Ginyu',
      integrantes: 5,
      poderTotal: 200000,
      reporte: 'Zona central con resistencia. Poder local estimado 90,000. Solicitando refuerzos.',
    },
    timeline: [
      { titulo: 'Misión asignada',        descripcion: 'Escuadrón Ginyu desplegado', fecha: '2026-02-10', completado: true  },
      { titulo: 'Llegada al planeta',     descripcion: 'En órbita',                  fecha: '2026-02-14', completado: true  },
      { titulo: 'Inicio de operaciones',  descripcion: 'Zonas norte y sur OK',        fecha: '2026-02-15', completado: true  },
      { titulo: 'Fase crítica — Zona Central', descripcion: 'En curso · Resistencia detectada', fecha: '', completado: false },
      { titulo: 'Verificación y conquista', descripcion: 'Pendiente',               fecha: '', completado: false },
    ],
  };

  // ── Estado de pantalla ──
  cargando: boolean = false;

  ngOnInit(): void {
    // 🔧 Aquí irá: this.misionService.getMision(id).subscribe(...)
  }

  // 🔧 MOCK: reemplazar por PATCH /api/misiones/{id}/estado
  actualizarEstado(nuevoEstado: 'completada' | 'cancelada' | 'refuerzo_solicitado') {
    this.cargando = true;
    setTimeout(() => {
      this.mision.estado = nuevoEstado === 'completada' ? 'completada'
                         : nuevoEstado === 'cancelada'  ? 'cancelada'
                         : 'en_progreso';
      this.cargando = false;
    }, 800);
  }

  get badgeEstado(): string {
    return this.mision.estado === 'completada' ? 'badge-success'
         : this.mision.estado === 'cancelada'  ? 'badge-danger'
         : 'badge-warn';
  }

  get labelEstado(): string {
    return this.mision.estado === 'completada' ? 'COMPLETADA'
         : this.mision.estado === 'cancelada'  ? 'CANCELADA'
         : 'EN PROGRESO';
  }
}