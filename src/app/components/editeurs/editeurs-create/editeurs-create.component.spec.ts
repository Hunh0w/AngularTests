import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeursCreateComponent } from './editeurs-create.component';

describe('EditeursCreateComponent', () => {
  let component: EditeursCreateComponent;
  let fixture: ComponentFixture<EditeursCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeursCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeursCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
