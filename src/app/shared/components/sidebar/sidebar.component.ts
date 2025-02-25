import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  submenus: { [key: string]: boolean } = {};

  constructor(public authService: AuthService, private router: Router) {}

  // Método para alternar submenús
  toggleSubmenu(menu: string) {
    this.submenus[menu] = !this.submenus[menu];
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige al login
  }
}