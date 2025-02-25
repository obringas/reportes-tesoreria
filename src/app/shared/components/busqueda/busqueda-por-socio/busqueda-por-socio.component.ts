import { Component, EventEmitter, Output } from '@angular/core';
import { IFiltroBusquedaSocio } from 'src/app/shared/models/filtro-busqueda-socio.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'; // Importa PrimeNG ButtonModule
import {CardModule} from 'primeng/card'; // Importa PrimeNG CardModule

@Component({
  selector: 'app-busqueda-por-socio',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule, CardModule], // ✅ Se importan los módulos necesarios
  templateUrl: './busqueda-por-socio.component.html',
  styleUrls: ['./busqueda-por-socio.component.scss'] // ✅ Corregido "styleUrl" -> "styleUrls"
})
export class BusquedaPorSocioComponent {
  @Output() clickBuscar = new EventEmitter<IFiltroBusquedaSocio>(); // ✅ Se especifica el tipo del EventEmitter

  public filtro: IFiltroBusquedaSocio = {
    socio: '',
    fet: '',
    nombre: '',
    camp: ''
  };


  filtrosActivosText = '';

  constructor() {}

  buscar(): void {
    // ✅ Emitimos los datos correctos
    this.clickBuscar.emit({ ...this.filtro });

    // ✅ Construimos el texto de los filtros activos
    const filtros = [];
    if (this.filtro.socio) filtros.push(`Socio: ${this.filtro.socio}`);
    if (this.filtro.fet) filtros.push(`FET: ${this.filtro.fet}`);
    if (this.filtro.nombre) filtros.push(`Nombre: ${this.filtro.nombre}`);
    if (this.filtro.camp) filtros.push(`Campaña: ${this.filtro.camp}`);

    this.filtrosActivosText = filtros.length ? `Filtros Activos: ${filtros.join(', ')}` : '';
  }
}
