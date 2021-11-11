import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliverySettingComponent } from './home-delivery-setting.component';

describe('HomeDeliverySettingComponent', () => {
  let component: HomeDeliverySettingComponent;
  let fixture: ComponentFixture<HomeDeliverySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeliverySettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeliverySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
