import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import { ColumnType, IHeaderItem, TableComponent } from 'src/app/shared/components/table/table/table.component';

@Component({
  selector: 'app-tabla-liquidaciones-socio',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './tabla-liquidaciones-socio.component.html',
  styleUrl: './tabla-liquidaciones-socio.component.scss',
})
export class TablaLiquidacionesSocioComponent implements OnInit {
  @Input() datos: any[] = [];

  headers: IHeaderItem[] = [
    { key: 'fet', label: 'FET', type: ColumnType.text },
    { key: 'socio', label: 'Socio', type: ColumnType.text },
    { key: 'nombre', label: 'Nombre', type: ColumnType.text },
    { key: 'fecha', label: 'Fecha', type: ColumnType.text },
    { key: 'puerta', label: 'Puerta', type: ColumnType.text },
    { key: 'romaneo', label: 'Romaneo', type: ColumnType.text },
    { key: 'formulario', label: 'Formulario', type: ColumnType.text },
    { key: 'liquidacion', label: 'Liquidación', type: ColumnType.text },
    { key: 'kilos', label: 'Kilos', type: ColumnType.text },
    { key: 'bruto', label: 'Bruto', type: ColumnType.currency },
    { key: 'codigoCamp', label: 'Código Campaña', type: ColumnType.text },
  ];

  ngOnInit(): void {
    console.log('Datos recibidos en la tabla:', this.datos); // Verifica si los datos llegan aquí
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos']) {
      console.log('Datos en TablaLiquidacionesSocioComponent:', this.datos);
    }
  }
}