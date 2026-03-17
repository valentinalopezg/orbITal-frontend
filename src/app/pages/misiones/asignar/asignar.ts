// ──────────────────────────────────────────────────────────
// Asignar Misión — HU6
// Como Comandante de Flota quiero asignar un equipo a un
// planeta para iniciar una misión de conquista
// ──────────────────────────────────────────────────────────

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../../../shared/sidebar/sidebar';

export interface PlanetaResumen {
  id: number;
  nombre: string;
  sector: string;
  coordenadas: string;
  dificultad: 'Baja' | 'Media' | 'Alta' | 'Extrema';
  poderRequerido: number;
  valorEstimado: number;
}

export interface EquipoDisponible {
  id: number;
  nombre: string;
  poderTotal: number;
  misionesCompletadas: number;
  reputacion: number;
  estado: 'disponible' | 'en_mision' | 'reposo';
}

@Component({
  selector: 'app-asignar-mision',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Sidebar],
  templateUrl: './asignar.html',
  styleUrl: './asignar.scss',
})
export class AsignarMision implements OnInit {

  // ── ID del planeta recibido por query param ──
  planetaId: number = 0;

  // ── Configuración de la misión ──
  prioridad: string = 'Normal';
  fechaLimite: string = '';
  notas: string = '';

  // ── Equipo seleccionado ──
  equipoSeleccionadoId: number | null = null;

  // ── Planeta activo en el formulario ──
  // 🔧 MOCK: reemplazar por GET /api/planetas/{id}
  planeta: PlanetaResumen = {
    id: 1,
    nombre: 'Namek',
    sector: 'Sector 7G',
    coordenadas: '-4.82, 11.34',
    dificultad: 'Media',
    poderRequerido: 75000,
    valorEstimado: 4500000,
  };

  // ── Equipos disponibles para este planeta ──
  // 🔧 MOCK: reemplazar por GET /api/equipos/disponibles?poderMinimo=75000
  equiposDisponibles: EquipoDisponible[] = [
    { id: 1, nombre: 'Escuadrón Ginyu',   poderTotal: 200000, misionesCompletadas: 23, reputacion: 4.9, estado: 'disponible' },
    { id: 2, nombre: 'Fuerza Saiyajin A', poderTotal: 90000,  misionesCompletadas: 41, reputacion: 4.7, estado: 'disponible' },
    { id: 3, nombre: 'Élite Zarbon',      poderTotal: 120000, misionesCompletadas: 15, reputacion: 4.5, estado: 'disponible' },
  ];

  // ── Estado de pantalla ──
  cargando: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lee el planetaId desde la URL (/misiones/asignar?planetaId=1)
    this.route.queryParams.subscribe(params => {
      this.planetaId = Number(params['planetaId']) || 0;
      // 🔧 Aquí irá: this.planetaService.getPlaneta(this.planetaId).subscribe(...)
    });
  }

  seleccionarEquipo(id: number) {
    this.equipoSeleccionadoId = id;
  }

  get equipoSeleccionado(): EquipoDisponible | undefined {
    return this.equiposDisponibles.find(e => e.id === this.equipoSeleccionadoId);
  }

  // 🔧 MOCK: reemplazar por POST /api/misiones
  confirmarAsignacion() {
    if (!this.equipoSeleccionadoId) return;
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
      this.router.navigate(['/misiones/estado']);
    }, 800);
  }
}