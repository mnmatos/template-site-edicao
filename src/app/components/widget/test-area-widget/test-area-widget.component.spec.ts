import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaWidgetComponent } from './text-area-widget.component';

describe('TestAreaWidgetComponent', () => {
  let component: TextAreaWidgetComponent;
  let fixture: ComponentFixture<TextAreaWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
