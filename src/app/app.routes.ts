// ──────────────────────────────────────────────────────────
// app.routes.ts — Define las rutas de navegación del sistema
// Cada ruta conecta una URL con su pantalla correspondiente
// ──────────────────────────────────────────────────────────

// Routes: tipo de Angular que define el arreglo de rutas
import { Routes } from '@angular/router';
// Se importa cada pantalla que tenga una ruta asignada
import { Login } from './pages/login/login';
import { RegistroUsuario } from './pages/registro-usuario/registro-usuario';
import { RegistrarPlaneta } from './pages/planetas/registrar/registrar';
import { ListarComponent } from './pages/planetas/listar/listar';
import { RegistrarEquipoComponent } from './pages/equipos/registrar/registrar';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registrar-usuario', component: RegistroUsuario },
  { path: 'planetas/registrar', component: RegistrarPlaneta },
  { path: 'planetas', component: ListarComponent },
  { path: 'equipos/registrar', component: RegistrarEquipoComponent },
  { path: '**', redirectTo: 'login' }
];