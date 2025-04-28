import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPanelsComponent } from './owned-panels.component';

describe('OwnedPanelsComponent', () => {
  let component: OwnedPanelsComponent;
  let fixture: ComponentFixture<OwnedPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnedPanelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnedPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
