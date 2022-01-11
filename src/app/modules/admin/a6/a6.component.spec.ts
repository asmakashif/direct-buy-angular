import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A6Component } from './a6.component';

describe('A6Component', () => {
  let component: A6Component;
  let fixture: ComponentFixture<A6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(A6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
