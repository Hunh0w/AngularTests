import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalsListComponent } from './festivals-list.component';

describe('FestivalsListComponent', () => {
  let component: FestivalsListComponent;
  let fixture: ComponentFixture<FestivalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
