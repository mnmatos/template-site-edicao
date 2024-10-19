import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSmallComponent } from './contact-small.component';

describe('ContactSmallComponent', () => {
  let component: ContactSmallComponent;
  let fixture: ComponentFixture<ContactSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
