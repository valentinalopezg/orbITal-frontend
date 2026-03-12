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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/planetas/listar',
    pathMatch: 'full'
  },
  {
    path: 'app',
    children: [
      {
        path: 'planetas/listar',
        loadComponent: () =>
          import('./pages/planetas/listar/listar').then(m => m.ListarComponent)
      },
      {
        path: 'equipos/registrar',
        loadComponent: () =>
          import('./pages/equipos/registrar/registrar').then(m => m.RegistrarEquipoComponent)
      },
      { path: '**', redirectTo: 'app/planetas/listar' }
    ]
  }
];