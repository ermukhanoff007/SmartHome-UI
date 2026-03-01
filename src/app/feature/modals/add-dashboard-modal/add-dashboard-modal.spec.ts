import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardModal } from './add-dashboard-modal';

describe('AddDashboardModal', () => {
  let component: AddDashboardModal;
  let fixture: ComponentFixture<AddDashboardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDashboardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
