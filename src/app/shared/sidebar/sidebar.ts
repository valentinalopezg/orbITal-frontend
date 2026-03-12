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
  usuario = { nombre: 'Usuario', rol: 'Sin rol', iniciales: 'U' };

  constructor(private router: Router) {}

  ngOnInit() {
    const u = localStorage.getItem('usuario');
    if (u) {
      const data = JSON.parse(u);
      this.usuario = {
        nombre: data.nombre || 'Usuario',
        rol: data.rol || 'Sin rol',
        iniciales: (data.nombre || 'U').substring(0, 2).toUpperCase()
      };
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}