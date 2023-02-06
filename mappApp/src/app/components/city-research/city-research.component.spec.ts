import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityResearchComponent } from './city-research.component';

describe('CityResearchComponent', () => {
  let component: CityResearchComponent;
  let fixture: ComponentFixture<CityResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityResearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
