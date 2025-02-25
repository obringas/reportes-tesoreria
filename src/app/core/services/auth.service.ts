
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLService } from 'src/app/shared/services/url.service';
import * as CryptoJS from 'crypto-js';
@Injectable({
 
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private encryptionKey = 'mySecretKey12345';
  private iv = '1234567890123456';

  constructor(private router: Router,
   // private http: HttpClient,
    private urlService: URLService,
  ) {}

  loginestatico(username: string, password: string): boolean {
    if (username === 'obringas' && password === '123456') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', 'fake-jwt-token'); // Simula un token
      }
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem('token') !== null;
  }
  
 
  login(username: string, password: string): Promise<boolean> {
    const key = CryptoJS.enc.Utf8.parse(this.encryptionKey);
    const iv = CryptoJS.enc.Utf8.parse(this.iv);

    const encryptedUsername = CryptoJS.AES.encrypt(username, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();

    const encryptedPassword = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();

    // URL de la solicitud
    const url = this.urlService.backURL+ '/auth/login';
    console.log('URL de la solicitud:', url); // Depuración: Verifica la URL

    // Datos que se envían
    const requestBody = {
        applicationName: "UtilidadesTesoreria",
        userName: encryptedUsername,
        password: encryptedPassword
    };
    console.log('Datos enviados:', requestBody); // Depuración: Verifica los datos enviados

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        console.log('Respuesta recibida:', response); // Depuración: Verifica la respuesta HTTP
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
    })
    .then(data => {
        console.log('Datos de la respuesta:', data); // Depuración: Verifica los datos de la respuesta
        if (data.token) {  // Suponiendo que la API devuelve un token en "data.token"
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token); // Guarda el token real en localStorage
            }
            this.isAuthenticated = true;
            return true; // Indica autenticación exitosa
        } else {
            throw new Error("Credenciales incorrectas");
        }
    })
    .catch(error => {
        console.error('Error en la autenticación:', error); // Depuración: Captura errores
        return false; // Indica autenticación fallida
    });
}


 
}
