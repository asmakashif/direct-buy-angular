import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A7Component } from './A7.component';

describe('A7Component', () => {
  let component: A7Component;
  let fixture: ComponentFixture<A7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(A7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
