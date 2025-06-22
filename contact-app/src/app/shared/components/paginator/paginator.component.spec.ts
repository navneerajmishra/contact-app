import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { PaginationOption } from '@shared/models';
import { By } from '@angular/platform-browser';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    const option: PaginationOption = {
      pageNumber: 1,
      pageSize: 10
    }
    fixture.componentRef.setInput('options', option);
    fixture.componentRef.setInput('total', 43);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have total pages', () => {

    expect((component as any).totalPages()).toEqual(5);
  });

  it('should have previous button disabled if page number is 1', () => {
    const debugElement = fixture.debugElement;
    const disabled = debugElement.query(By.css('[aria-label="Previous Page"]')).nativeElement.disabled;
    expect(disabled).toBeTrue();
  });

  it('should have previous button disabled if page number is less than total pages', () => {
    const debugElement = fixture.debugElement;
    const disabled = debugElement.query(By.css('[aria-label="Next Page"]')).nativeElement.disabled;
    expect(disabled).toBeFalse();
  });

  it('should not have previous button disabled if page number is greater than 2', () => {
    const option: PaginationOption = {
      pageNumber: 2,
      pageSize: 10
    };
    fixture.componentRef.setInput('options', option);
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const disabled = debugElement.query(By.css('[aria-label="Previous Page"]')).nativeElement.disabled;
    expect(disabled).toBeFalse();
  });

  it('should not have next button disabled if page number is last', () => {
    const option: PaginationOption = {
      pageNumber: 5,
      pageSize: 10
    };
    fixture.componentRef.setInput('options', option);
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const disabled = debugElement.query(By.css('[aria-label="Next Page"]')).nativeElement.disabled;
    expect(disabled).toBeTrue();
  });
});
