import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeursListComponent } from './editeurs-list.component';

describe('EditeursListComponent', () => {
  let component: EditeursListComponent;
  let fixture: ComponentFixture<EditeursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeursListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
