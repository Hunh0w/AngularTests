import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxCreateComponent } from './jeux-create.component';

describe('JeuxCreateComponent', () => {
  let component: JeuxCreateComponent;
  let fixture: ComponentFixture<JeuxCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuxCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuxCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
