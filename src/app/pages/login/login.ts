// ──────────────────────────────────────────────────────────
// Login — HU1
// Como Comandante de Flota quiero iniciar sesión para
// acceder al sistema de control galáctico del Imperio
// ──────────────────────────────────────────────────────────

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  // ── Variables enlazadas con los inputs del formulario via [(ngModel)] ──
  email: string = '';              // campo: ID de Comandante
  password: string = '';           // campo: contraseña
  recordarSesion: boolean = false; // checkbox: mantener sesión activa

  // ── Variables de estado de la pantalla ──
  cargando: boolean = false;   // true mientras se procesa el login (deshabilita el botón)
  errorMessage: string = '';   // si tiene texto, la alerta roja aparece en el HTML via *ngIf

  // ── Usuarios de prueba ──
  // 🔧 MOCK: simula autenticación hasta que el backend entregue el endpoint real
  // Reemplazar por: this.authService.login(email, password).subscribe(...)
  private usuariosMock = [
    { email: 'zarbon@freezer.empire',  password: '1234', rol: 'Comandante de Flota', nombre: 'Zarbon'  },
    { email: 'dodoria@freezer.empire', password: '1234', rol: 'Comandante de Flota', nombre: 'Dodoria' },
    { email: 'freezer@freezer.empire', password: '1234', rol: 'Emperador',           nombre: 'Freezer' },
  ];

  // Router inyectado para navegar entre pantallas tras el login
  constructor(private router: Router) {}

  // Se ejecuta al hacer clic en "Acceder al Sistema" o presionar Enter en cualquier campo
  login() {

    // Limpia errores previos antes de un nuevo intento
    this.errorMessage = '';

    // Validación: ambos campos son obligatorios
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese su ID de comandante y contraseña.';
      return;
    }

    // Activa estado de carga: deshabilita el botón y cambia su texto a "Verificando..."
    this.cargando = true;

    // Simula el delay de una petición HTTP al backend (800ms)
    // 🔧 MOCK: eliminar este setTimeout al integrar el servicio real
    setTimeout(() => {

      // Busca un usuario que coincida con email Y contraseña
      const usuario = this.usuariosMock.find(
        u => u.email === this.email && u.password === this.password
      );

      if (usuario) {
        // Login exitoso: persiste los datos del usuario para usarlos en el sidebar y otras vistas
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirige a la pantalla principal del sistema
        this.router.navigate(['/planetas']);

      } else {
        // Credenciales incorrectas: muestra alerta roja en el HTML
        this.errorMessage = 'Credenciales inválidas. Verifique su ID de comandante.';
      }

      // Desactiva el estado de carga independientemente del resultado
      this.cargando = false;

    }, 800);
  }
}