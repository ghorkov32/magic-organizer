import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedClassesComponent } from './added-classes.component';

describe('AddedClassesComponent', () => {
  let component: AddedClassesComponent;
  let fixture: ComponentFixture<AddedClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddedClassesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
