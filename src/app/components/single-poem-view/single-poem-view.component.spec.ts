import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePoemViewComponent } from './single-poem-view.component';

describe('SinglePoemViewComponent', () => {
  let component: SinglePoemViewComponent;
  let fixture: ComponentFixture<SinglePoemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePoemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePoemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
