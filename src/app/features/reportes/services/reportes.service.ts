import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { URLService } from 'src/app/shared/services/url.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IFiltroBusquedaSocio } from 'src/app/shared/models/filtro-busqueda-socio.model';

// Interfaz para la respuesta de la API
export interface Entrega {
  fet: number;
  socio: number;
  nombre: string;
  fecha: string;
  puerta: number;
  romaneo: number;
  formulario: string;
  liquidacion: number;
  kilos: number;
  bruto: number;
  codigoCamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

   constructor(
     private urlService: URLService,
     private http: HttpClient
      ) { }

  async obtenerEntregas(campañas: string, nroSocio: number | null, nroFet: string | null): Promise<any>
 {
    
    const requestBody =
         {
                      Campañas: campañas,
                      NroSocio: nroSocio,
                      NroFet: nroFet
                     };
    console.log('Datos enviados:', requestBody); // ✅ Depuración

    try {
    
      const response = await fetch(this.urlService.backURL+'/reportes/entregas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Respuesta recibida:', response); // ✅ Depuración

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

    
      const data = await response.json();
      console.log('Datos de la respuesta:', data); // ✅ Depuración

      return data; // ✅ Devolver los datos obtenidos
    } catch (error) {
      console.error('Error al obtener las entregas:', error);
      throw error; // ✅ Lanzar el error para que el componente lo maneje
    }
  }
  
  getListLiquidaciones(campañas: string, nroSocio: string | null, nroFet: string | null) {
    // Configura los headers
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    // Configura los parámetros (si es necesario)
    let httpParams = new HttpParams();
  
    // Opciones de la solicitud
    const options = {
      headers: httpHeaders,
      params: httpParams,
    };
  
    // Cuerpo de la solicitud
    const requestBody = {
      Campañas: campañas,
      NroSocio: nroSocio,
      NroFet: nroFet,
    };
  
    console.log('Enviando solicitud POST a:', this.urlService.backURL + '/reportes/entregas'); // Depuración
    console.log('Datos enviados:', requestBody); // Depuración
  
    try {
      // Realiza la solicitud POST
      const response = this.http.post(this.urlService.backURL + '/reportes/entregas', requestBody, options)
        .pipe(
          map((resp: any) => {
            console.log('Respuesta recibida:', resp); // Depuración
            return resp; // Devuelve la respuesta completa (sin acceder a resp.data)
          })
        );
  
      return response; // Retorna el observable para que el componente se suscriba
    } catch (error) {
      console.error('Error en la solicitud POST:', error); // Depuración
      throw new Error('No se pudo obtener la lista de liquidaciones. Por favor, inténtelo de nuevo más tarde.'); // Mensaje amigable
    }
  }
}
