


import { Routes } from '@angular/router';
import { RegistrarEquipo } from './misiones/registrar-equipo/registrar-equipo';
// IMPORTANTE: Asegúrate de que las rutas de abajo coincidan con los nombres exactos de tus componentes
import { AsignarMision } from './misiones/asignar-mision/asignar-mision';
import { EstadoMision } from './misiones/estado-mision/estado-mision';
import { Monitoreo } from './misiones/monitoreo/monitoreo';

export const routes: Routes = [
  { path: 'registrar-equipo', component: RegistrarEquipo },
  { path: 'asignar-mision', component: AsignarMision },
  { path: 'estado-mision', component: EstadoMision },
  { path: 'monitoreo', component: Monitoreo },
  { path: '', redirectTo: '/registrar-equipo', pathMatch: 'full' } // Ruta por defecto
];
