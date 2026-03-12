// ──────────────────────────────────────────────────────────
// Registrar Equipo — HU3
// Como Comandante de Flota quiero registrar nuevos equipos
// de combate para asignarlos a misiones planetarias
// ──────────────────────────────────────────────────────────

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../../shared/sidebar/sidebar';

// Interfaz que define la estructura de un miembro dentro de un equipo
export interface Miembro {
  nombre: string;
  raza: string;
  poder: number;
  estado: 'activo' | 'en_mision' | 'reposo';
}

// Interfaz que define la estructura completa de un equipo de combate
export interface Equipo {
  id: number;
  nombre: string;
  tipo: 'sayayin' | 'soldado' | 'mercenario' | 'elite';
  rango: string;
  poderTotal: number;
  maxMisiones: number;
  especializaciones: string[];
  observaciones: string;
  miembros: Miembro[];
  estado: 'activo' | 'en_mision' | 'reposo';
  emoji: string;
}

@Component({
  selector: 'app-registrar-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Sidebar],
  templateUrl: './registrar.html',
  styleUrl: './registrar.scss'
})
export class RegistrarEquipoComponent {

  // ── Modelo del formulario para crear un nuevo equipo ──
  nuevoEquipo = {
    nombre: '',
    tipo: '',
    rango: 'D',
    poderTotal: 0,
    maxMisiones: 1,
    observaciones: '',
  };

  // ── Flags de especialización (checkboxes del formulario) ──
  especializaciones = {
    exterminio: false,
    captura: false,
    reconocimiento: false,
    extraccion: false,
  };

  // ── Modelo temporal para el miembro que se está por agregar ──
  nuevoMiembro = { nombre: '', raza: 'Sayayin', poder: 0 };

  // ── Lista de miembros agregados al equipo en el formulario actual ──
  // 🔧 MOCK: datos de ejemplo hasta que se integre el endpoint
  miembrosActuales: Miembro[] = [
    { nombre: 'Raditz', raza: 'Sayayin', poder: 1200,  estado: 'activo' },
    { nombre: 'Nappa',  raza: 'Sayayin', poder: 4000,  estado: 'activo' },
    { nombre: 'Zarbon', raza: 'Élite',   poder: 23000, estado: 'en_mision' },
  ];

  // ── Variables de filtrado para la lista de equipos ──
  filtroEquipos = '';
  filtroTipo    = '';

  // ── Catálogo de equipos registrados en el sistema ──
  // 🔧 MOCK: datos simulados hasta que el equipo de backend entregue el endpoint
  equipos: Equipo[] = [
    { id:1, nombre:'Escuadrón Vegeta',      tipo:'sayayin',   rango:'A',  poderTotal:120000, maxMisiones:3, especializaciones:['Exterminio'],                  observaciones:'', miembros:[], estado:'activo',    emoji:'🔥' },
    { id:2, nombre:'Fuerza Élite Frieza-1', tipo:'elite',     rango:'S',  poderTotal:530000, maxMisiones:5, especializaciones:['Exterminio','Captura'],         observaciones:'', miembros:[], estado:'en_mision', emoji:'⚡' },
    { id:3, nombre:'Mercenarios Guldo',     tipo:'mercenario',rango:'B',  poderTotal:44500,  maxMisiones:2, especializaciones:['Captura'],                     observaciones:'', miembros:[], estado:'activo',    emoji:'🗡' },
    { id:4, nombre:'Ginyu Force',           tipo:'elite',     rango:'S+', poderTotal:120000, maxMisiones:4, especializaciones:['Exterminio','Reconocimiento'],  observaciones:'', miembros:[], estado:'en_mision', emoji:'💀' },
    { id:5, nombre:'Unidad Dodoria',        tipo:'soldado',   rango:'A',  poderTotal:22000,  maxMisiones:3, especializaciones:['Extracción'],                  observaciones:'', miembros:[], estado:'activo',    emoji:'🌀' },
  ];

  // ── Control del toast de confirmación ──
  toastVisible  = false;
  toastMensaje  = '';
  private toastTimer: any;

  // ── Getters de disponibilidad para el resumen visual ──

  // Cuenta los equipos disponibles para nuevas misiones
  get disponibles() { return this.equipos.filter(e => e.estado === 'activo').length; }

  // Cuenta los equipos actualmente desplegados en misión
  get enMision()    { return this.equipos.filter(e => e.estado === 'en_mision').length; }

  // Cuenta los equipos en período de reposo o recuperación
  get enReposo()    { return this.equipos.filter(e => e.estado === 'reposo').length; }

  // Filtra la lista de equipos según texto libre y tipo de unidad seleccionado
  get equiposFiltrados(): Equipo[] {
    return this.equipos.filter(e => {
      const matchTexto = !this.filtroEquipos || e.nombre.toLowerCase().includes(this.filtroEquipos.toLowerCase());
      const matchTipo  = !this.filtroTipo   || e.tipo === this.filtroTipo;
      return matchTexto && matchTipo;
    });
  }

  // Agrega un nuevo miembro a la lista del equipo actual y limpia el formulario
  agregarMiembro() {
    if (!this.nuevoMiembro.nombre) return; // Validación: nombre requerido
    this.miembrosActuales.push({
      nombre: this.nuevoMiembro.nombre,
      raza:   this.nuevoMiembro.raza,
      poder:  this.nuevoMiembro.poder,
      estado: 'activo', // Todo miembro nuevo inicia como activo
    });
    this.nuevoMiembro = { nombre: '', raza: 'Sayayin', poder: 0 }; // Resetea el formulario de miembro
    this.mostrarToast('Miembro añadido al equipo ⚔️');
  }

  // Elimina un miembro de la lista por su índice
  eliminarMiembro(i: number) {
    this.miembrosActuales.splice(i, 1);
  }

  // Construye y registra un nuevo equipo en el catálogo
  registrarEquipo() {
    // Validación: nombre y tipo son campos obligatorios
    if (!this.nuevoEquipo.nombre || !this.nuevoEquipo.tipo) {
      this.mostrarToast('⚠ Completa nombre y tipo de unidad');
      return;
    }

    // Extrae solo las especializaciones marcadas como true y capitaliza su nombre
    const specs = Object.entries(this.especializaciones)
      .filter(([, v]) => v)
      .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

    // Mapa de emojis representativos por tipo de unidad
    const emojis: Record<string, string> = { sayayin:'🔥', soldado:'⚡', mercenario:'🗡', elite:'💀' };

    // Construye el objeto Equipo con los datos del formulario
    const equipo: Equipo = {
      id:                this.equipos.length + 1,
      nombre:            this.nuevoEquipo.nombre,
      tipo:              this.nuevoEquipo.tipo as any,
      rango:             this.nuevoEquipo.rango,
      // El poder total se calcula sumando el poder de los miembros; si no hay, usa el campo manual
      poderTotal:        this.miembrosActuales.reduce((a, m) => a + m.poder, 0) || this.nuevoEquipo.poderTotal,
      maxMisiones:       this.nuevoEquipo.maxMisiones,
      especializaciones: specs,
      observaciones:     this.nuevoEquipo.observaciones,
      miembros:          [...this.miembrosActuales], // Copia del array para evitar referencias compartidas
      estado:            'activo',
      emoji:             emojis[this.nuevoEquipo.tipo] ?? '⚔️',
    };

    this.equipos.unshift(equipo); // Inserta al inicio para mostrar el más reciente primero
    this.resetForm();
    this.mostrarToast('Equipo registrado exitosamente en el sistema imperial 🚀');
  }

  // Restablece todos los campos del formulario a sus valores iniciales
  resetForm() {
    this.nuevoEquipo = { nombre:'', tipo:'', rango:'D', poderTotal:0, maxMisiones:1, observaciones:'' };
    this.especializaciones = { exterminio:false, captura:false, reconocimiento:false, extraccion:false };
    this.miembrosActuales = [];
  }

  // Muestra un mensaje toast durante 3.2 segundos y luego lo oculta
  mostrarToast(msg: string) {
    this.toastMensaje = msg;
    this.toastVisible = true;
    clearTimeout(this.toastTimer); // Cancela cualquier timer previo para evitar cierres prematuros
    this.toastTimer = setTimeout(() => this.toastVisible = false, 3200);
  }

  // Retorna la clase CSS del badge según el tipo de unidad
  badgeTipo(tipo: string): string {
    const map: Record<string, string> = {
      sayayin:    'badge-sayayin',
      soldado:    'badge-soldado',
      mercenario: 'badge-mercenario',
      elite:      'badge-elite',
    };
    return map[tipo] ?? '';
  }

  // Retorna el texto visible del badge según el tipo de unidad
  labelTipo(tipo: string): string {
    const map: Record<string, string> = {
      sayayin:    'Sayayin',
      soldado:    'Soldado',
      mercenario: 'Mercenario',
      elite:      'Élite Imperial',
    };
    return map[tipo] ?? tipo;
  }

  // Retorna la clase CSS del badge según el estado del miembro
  badgeEstadoMiembro(estado: string): string {
    return estado === 'activo' ? 'badge-activo' : estado === 'en_mision' ? 'badge-mision' : 'badge-reposo';
  }

  // Retorna la clase CSS del badge según el estado del equipo
  badgeEstadoEquipo(estado: string): string {
    return estado === 'activo' ? 'badge-activo' : estado === 'en_mision' ? 'badge-mision' : 'badge-reposo';
  }

  // Retorna el texto visible del badge según el estado del equipo
  labelEstadoEquipo(estado: string): string {
    return estado === 'activo' ? '● Activo' : estado === 'en_mision' ? '● En Misión' : '◌ Reposo';
  }

  // Formatea el poder numérico en M (millones) o k (miles) para mejor legibilidad
  formatPoder(v: number): string {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
    if (v >= 1_000)     return (v / 1_000).toFixed(0) + 'k';
    return String(v);
  }
}