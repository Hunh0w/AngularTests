import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxListComponent } from './jeux-list.component';

describe('JeuxListComponent', () => {
  let component: JeuxListComponent;
  let fixture: ComponentFixture<JeuxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
