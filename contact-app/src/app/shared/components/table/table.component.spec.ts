import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('values', []);
    fixture.componentRef.setInput('fields', []);
    fixture.componentRef.setInput('key', '');
    fixture.componentRef.setInput('totalRecords', 0);
    fixture.componentRef.setInput('paginationOptions', {});

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
