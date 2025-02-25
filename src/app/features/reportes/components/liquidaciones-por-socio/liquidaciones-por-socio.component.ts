import { Component,ChangeDetectorRef,input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReportesService } from '../../services/reportes.service';
import { BusquedaPorSocioComponent } from "../../../../shared/components/busqueda/busqueda-por-socio/busqueda-por-socio.component";
import { IFiltroBusquedaSocio } from 'src/app/shared/models/filtro-busqueda-socio.model';
import { CardModule } from 'primeng/card';
import { TablaLiquidacionesSocioComponent } from "./tabla-liquidaciones-socio/tabla-liquidaciones-socio.component"; // ✅ Importar PrimeNG CardModule
import e from 'express';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-liquidaciones-por-socio',
  standalone: true,
  imports: [CommonModule, FormsModule, BusquedaPorSocioComponent, CardModule,TablaLiquidacionesSocioComponent], // ✅ Importar BusquedaPorSocioComponent
  templateUrl: './liquidaciones-por-socio.component.html',
  styleUrl: './liquidaciones-por-socio.component.scss'
})
export class LiquidacionesPorSocioComponent {
  public entregas: any[] = []; // ✅ Inicializamos como array vacío
  public resultado: any[] = []; // ✅ Inicializamos como array vacío
  cargando = false;
  errorMensaje = '';

  constructor(private reporteService: ReportesService,private cdr: ChangeDetectorRef) {}






  
  getDatos(event: IFiltroBusquedaSocio) {
    const camp = event.camp;
    const nroSocio = event.socio;
    const nroFet = event.fet;
  
    this.reporteService
      .getListLiquidaciones(camp, nroSocio, nroFet)
      .subscribe({
        next: (data: any) => {
          console.log('Datos recibidos:', data); // Depuración
          
          this.resultado = [...data]; 
          this.cdr.detectChanges(); // ✅ Se fuerza la detección de cambios
          console.log('Datos resultados:', this.resultado); // Depuración
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error); // Depuración
          alert('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo.'); // Mensaje amigable para el usuario
        },
      });
  }
  exportToExcel(): void {
    if (this.resultado.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.resultado);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Reporte': worksheet },
      SheetNames: ['Reporte']
    };

    XLSX.writeFile(workbook, 'Reporte_Entregas.xlsx');
  }
}
