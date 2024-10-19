import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePoemViewComponent } from './table-poem-view.component';

describe('TablePoemViewComponent', () => {
  let component: TablePoemViewComponent;
  let fixture: ComponentFixture<TablePoemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePoemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePoemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
