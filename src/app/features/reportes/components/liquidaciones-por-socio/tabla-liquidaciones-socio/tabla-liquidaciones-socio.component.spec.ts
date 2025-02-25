import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaLiquidacioesSocioComponent } from './tabla-liquidaciones-socio.component';

describe('TablaLiquidacioesSocioComponent', () => {
  let component: TablaLiquidacioesSocioComponent;
  let fixture: ComponentFixture<TablaLiquidacioesSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaLiquidacioesSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaLiquidacioesSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
