import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFulfilledComponent } from './orders-fulfilled.component';

describe('OrdersFulfilledComponent', () => {
  let component: OrdersFulfilledComponent;
  let fixture: ComponentFixture<OrdersFulfilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersFulfilledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFulfilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
