// ──────────────────────────────────────────────────────────
// Sidebar — Componente de navegación lateral
// Presente en todas las pantallas del sistema tras el login
// Muestra el menú principal y los datos del usuario activo
// ──────────────────────────────────────────────────────────

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  // ── Datos del usuario activo mostrados en el panel inferior del sidebar ──
  // Valores por defecto en caso de que localStorage esté vacío
  usuario = { nombre: 'Usuario', rol: 'Sin rol', iniciales: 'U' };

  // Router inyectado para redirigir al login tras cerrar sesión
  constructor(private router: Router) {}

  // Al iniciar el componente, carga los datos del usuario desde localStorage
  // Estos datos fueron guardados al hacer login exitoso en login.ts
  ngOnInit() {
    const u = localStorage.getItem('usuario');
    if (u) {
      const data = JSON.parse(u);
      this.usuario = {
        nombre:    data.nombre || 'Usuario',
        rol:       data.rol    || 'Sin rol',
        // Toma las primeras 2 letras del nombre en mayúsculas (ej: "Zarbon" → "ZA")
        iniciales: (data.nombre || 'U').substring(0, 2).toUpperCase()
      };
    }
  }

  // Elimina la sesión del usuario de localStorage y redirige al login
  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}