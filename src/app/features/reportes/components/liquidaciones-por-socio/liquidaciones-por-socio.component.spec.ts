import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionesPorSocioComponent } from './liquidaciones-por-socio.component';

describe('LiquidacionesPorSocioComponent', () => {
  let component: LiquidacionesPorSocioComponent;
  let fixture: ComponentFixture<LiquidacionesPorSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidacionesPorSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidacionesPorSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
