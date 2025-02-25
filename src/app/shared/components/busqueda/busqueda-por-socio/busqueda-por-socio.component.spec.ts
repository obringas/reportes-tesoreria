import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorSocioComponent } from './busqueda-por-socio.component';

describe('BusquedaPorSocioComponent', () => {
  let component: BusquedaPorSocioComponent;
  let fixture: ComponentFixture<BusquedaPorSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPorSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPorSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
