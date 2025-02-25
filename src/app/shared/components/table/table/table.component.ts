import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'; // Importa PrimeNG ButtonModule
import {CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';


export enum ColumnType {
  numeric = 'numeric',
  text = 'text',
  roundMumeric = 'round-numeric',
  date = 'date',
  datetime = 'datetime',
  check = 'check',
  buttons = 'buttons',
  currency = 'currency',
}
 
export enum EnumColumnAling {
  left = 'left',
  right = 'right',
  center = 'center',
}
 
export interface IRowButton {
  icon?: string;
  color: string;
  label?: string;
  class?:string;
  pTooltip?:string;
  action: (index: number) => any;
}
 
export interface IHeaderItem {
  label: string;
  key: string;
  type: ColumnType;
  align?: EnumColumnAling;
  headerAlign?: EnumColumnAling;
  filterable?: boolean;
  eventColumnId?: number;
  buttons?: IRowButton[];
  check?:ICheck[];
}
 
export interface IFilterData {
  filter: string;
  column: number;
}
 
export interface ILazyLoadData {
  Filters: IFilterData[];
  Page: number;
  Size: number;
  Type: [];
}
 export interface ICheck {
    action: (checked: boolean, rowData: any) => void;
 }

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule, CardModule,TableModule], // ✅ Se importan los módulos necesarios
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {
  @Input() value: any[] = [];
  @Input() header: IHeaderItem[] = []; //ListHeader model, we need to change this
 
  @Input() multiple?: boolean = false;
  @Input() selection: string = 'single';
 
  @Input() useLazy: boolean = true;
  @Input() totalRecords: number = 0;
  @Input() loading: boolean = true;
 
  @Output() changeFilterData = new EventEmitter();
  @Output() deshacer = new EventEmitter();
 
  @Output() onSelectFire: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged = new EventEmitter<number[]>();
  @Output() checkecChanged= new EventEmitter<boolean>();
 
  selectedClients: any[] = [];
  public markSelected: any;
 
  
  selectedItem: any;
 
  constructor(
    
  ) {
    this.loading = true;
  }
  ngOnInit() {
    
    
  }
   
     
 
  ngOnChanges(): void {
    this.loading = false;
    
      console.log('Datos recibidos en TableComponent:', this.value);
      console.log('Headers recibidos en TableComponent:', this.header);
    
    
 
  }
 
  filter(event: any) {
    console.log(event);
  }
 
  handleDeshacerClick(value: any) {
    this.deshacer.emit(value);
  }
 
  seeSelection() {
    this.onSelectFire.emit(this.selectedItem);
  }
 
  clear(table: Table) {
    table.clear();
  }
 
  isNumber(value: any) {
    return !isNaN(value);
  }
 
 
onCheckChange(event: any, cliente: any, column: IHeaderItem): void {
  event.stopPropagation(); // Detener la propagación para evitar que otros manejadores reaccionen.
  const shouldBeChecked = event.target.checked;
 
}

  handleLazyLoadEvent(event: any) {
    console.log(event.filters);
    if (this.useLazy) {
      const data: ILazyLoadData = {
        Filters: [],
        Page: 0,
        Size: 20,
        Type: [],
      };
 
      for (let i = 0; i < Object.keys(event.filters).length; i++) {
        if (event.filters[i][0].value != null) {
          const backFilter = {
            column: i,
            filter: event.filters[i][0].value,
          };
          data.Filters.push(backFilter);
        }
      }
 
      let page = event.first / event.rows + 1;
      data.Page = page;
 
      this.changeFilterData.emit(data);
    }
  }
  isClientSelected (cliente:any): boolean
  {
    return this.selectedClients.some(
      (selected)=> selected.iD_SolucionAI===cliente.iD_SolucionAI
    );
  }
  formatValue(value: any, column: IHeaderItem): any {
    if (value === null || value === undefined) {
      // Valores por defecto según el tipo de dato
      switch (column.key) {
        case 'edadMin':
        case 'edadMax':
        case 'añosRestantes':
        case 'cantCuotas':
          return 0; // Mostrar 0 en valores numéricos
 
        case 'cuota':
        case 'otrosGastos':
          return 0.00; // Mostrar 0 en valores monetarios
 
        case 'moneda':
        case 'apellido':
        case 'nombre':
        case 'estudio':
          return 'No especificado'; // Mostrar "No especificado" en textos
 
        default:
          return '-'; // Si hay otros campos, mostrar "-"
      }
    }
    return value; // Si no es null, devolver el valor original
  }
 
}