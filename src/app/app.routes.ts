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
import { AsignarMision } from './pages/misiones/asignar/asignar';
import { EstadoMision } from './pages/misiones/estado/estado';

export const routes: Routes = [
  // Ruta raíz: redirige automáticamente al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login (HU15)
  { path: 'login', component: Login },

  // Registro de usuario
  { path: 'registrar-usuario', component: RegistroUsuario },

  // ⚠ planetas/registrar ANTES de planetas para que Angular no lo confunda
  { path: 'planetas/registrar', component: RegistrarPlaneta },

  // Listar planetas (HU2)
  { path: 'planetas', component: ListarComponent },

  // Registrar equipo (HU4)
  { path: 'equipos/registrar', component: RegistrarEquipoComponent },

  // Asignar misión (HU6)
  { path: 'misiones/asignar', component: AsignarMision },

  // Estado de misión (HU8)
  { path: 'misiones/estado', component: EstadoMision },

  // Ruta comodín
  { path: '**', redirectTo: 'login' }
];