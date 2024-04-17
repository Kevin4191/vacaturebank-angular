import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWindowDialogComponent } from './profile-window-dialog.component';

describe('ProfileWindowDialogComponent', () => {
  let component: ProfileWindowDialogComponent;
  let fixture: ComponentFixture<ProfileWindowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileWindowDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileWindowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
