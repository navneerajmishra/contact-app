import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Should display loader when show is true
  it('should display loader when show is true', () => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('.animate-spin'));
    expect(loader).toBeTruthy();
  });

  //Should display loader when show is true
  it('should hide loader when show is false', () => {
    fixture.componentRef.setInput('show', false);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('[role="status"]'));
    expect(loader).toBeFalsy();
  });
});
