// ──────────────────────────────────────────────────────────
// Registrar Planeta — HU2b
// Como Comandante de Flota quiero registrar nuevos planetas
// para añadirlos al catálogo galáctico del Imperio
// ──────────────────────────────────────────────────────────

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Sidebar } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Sidebar],
  templateUrl: './registrar.html',
  styleUrl: './registrar.scss'
})
export class RegistrarPlaneta {

  // ── Variables del formulario: Datos Generales ──
  nombre: string = '';
  coordenadasX: string = '';
  coordenadasY: string = '';
  atmosfera: string = 'Nitrógeno-Oxígeno'; // valor por defecto del select
  nivelTecnologico: string = 'Primitivo';  // valor por defecto del select
  poblacion: string = '';

  // ── Variables del formulario: Evaluación de Recursos ──
  recursos: string[] = [];           // lista de recursos confirmados (se muestran como tags)
  nuevoRecurso: string = '';         // valor temporal del input antes de confirmar
  mostrarInputRecurso: boolean = false; // controla la visibilidad del input de recurso
  dificultad: string = 'Medio';      // valor por defecto del select
  valorEstimado: string = '';
  estado: string = 'Identificado';   // estado inicial del planeta en el catálogo

  // ── Variables de estado de la pantalla ──
  cargando: boolean = false;   // deshabilita el botón mientras se procesa el registro
  exitoso: boolean = false;    // muestra la alerta verde tras un registro exitoso
  errorMessage: string = '';   // muestra la alerta roja si hay error de validación

  // Router inyectado para redirigir al catálogo tras el registro exitoso
  constructor(private router: Router) {}

  // Muestra el input para escribir un nuevo recurso
  agregarRecurso() {
    this.mostrarInputRecurso = true;
  }

  // Agrega el recurso escrito a la lista y oculta el input (se dispara con Enter)
  confirmarRecurso() {
    if (this.nuevoRecurso.trim()) {
      this.recursos.push(this.nuevoRecurso.trim());
      this.nuevoRecurso = '';
      this.mostrarInputRecurso = false;
    }
  }

  // Valida el formulario y simula el registro del planeta
  registrar() {
    this.errorMessage = '';
    this.exitoso = false;

    // Validación: nombre y coordenadas son campos obligatorios
    if (!this.nombre || !this.coordenadasX || !this.coordenadasY) {
      this.errorMessage = 'Por favor complete los campos obligatorios: nombre y coordenadas.';
      return;
    }

    this.cargando = true;

    // 🔧 MOCK: simula el delay de una petición HTTP al backend (800ms)
    // Reemplazar con llamada al servicio cuando esté disponible el endpoint
    setTimeout(() => {
      this.exitoso = true;
      this.cargando = false;
      // Redirige al catálogo de planetas 1.5s después para que el usuario vea la confirmación
      setTimeout(() => this.router.navigate(['/planetas']), 1500);
    }, 800);
  }

  // Restablece todos los campos del formulario a sus valores iniciales
  limpiar() {
    this.nombre          = '';
    this.coordenadasX    = '';
    this.coordenadasY    = '';
    this.atmosfera       = 'Nitrógeno-Oxígeno';
    this.nivelTecnologico = 'Primitivo';
    this.poblacion       = '';
    this.recursos        = [];
    this.dificultad      = 'Medio';
    this.valorEstimado   = '';
    this.estado          = 'Identificado';
    this.errorMessage    = '';
    this.exitoso         = false;
  }
}