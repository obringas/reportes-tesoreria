import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password)
    .then(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
        console.log('✅ Login exitoso');
      } else {
        console.log('❌ Credenciales incorrectas');
      }
    });
  }

  async login1() {
    const isAuthenticated = await this.authService.login(this.username, this.password);
    
    
    if (isAuthenticated) {
      this.router.navigate(['/reportes/components/liquidaciones-por-socio']);
      console.log('✅ Login exitoso');
    } else {
      this.errorMessage = "Usuario o contraseña incorrectos";
      console.log('❌ Credenciales incorrectas');
    }
  }
}
