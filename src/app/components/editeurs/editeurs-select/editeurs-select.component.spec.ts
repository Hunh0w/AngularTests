import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeursSelectComponent } from './editeurs-select.component';

describe('EditeursSelectComponent', () => {
  let component: EditeursSelectComponent;
  let fixture: ComponentFixture<EditeursSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeursSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeursSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
