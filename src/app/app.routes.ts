// ──────────────────────────────────────────────────────────
// app.routes.ts — Define las rutas de navegación del sistema
// Cada ruta conecta una URL con su pantalla correspondiente
// ──────────────────────────────────────────────────────────

import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { RegistroUsuario } from './pages/registro-usuario/registro-usuario';
import { RegistrarPlaneta } from './pages/planetas/registrar/registrar';
import { ListarComponent } from './pages/planetas/listar/listar';
import { RegistrarEquipoComponent } from './pages/equipos/registrar/registrar';

export const routes: Routes = [
  // Ruta raíz: redirige automáticamente al login al entrar a la app
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Pantalla de inicio de sesión (HU1)
  { path: 'login', component: Login },

  // Pantalla de registro de nuevos usuarios — solo administradores (HU0)
  { path: 'registrar-usuario', component: RegistroUsuario },

  // Pantalla de registro de nuevo planeta en el catálogo (HU2b)
  // ⚠ Debe ir ANTES de /planetas para que Angular no lo interprete como subruta
  { path: 'planetas/registrar', component: RegistrarPlaneta },

  // Pantalla de listado y consulta del catálogo planetario (HU2)
  { path: 'planetas', component: ListarComponent },

  // Pantalla de registro de equipos de combate (HU3)
  { path: 'equipos/registrar', component: RegistrarEquipoComponent },

  // Ruta comodín: cualquier URL no reconocida redirige al login
  { path: '**', redirectTo: 'login' }
];