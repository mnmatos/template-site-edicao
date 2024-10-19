import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemModuleComponent } from './poem-module.component';

describe('TestViewComponent', () => {
  let component: PoemModuleComponent;
  let fixture: ComponentFixture<PoemModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoemModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
