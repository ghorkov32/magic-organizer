import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedClassComponent } from './created-class.component';

describe('CreatedClassComponent', () => {
  let component: CreatedClassComponent;
  let fixture: ComponentFixture<CreatedClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedClassComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
