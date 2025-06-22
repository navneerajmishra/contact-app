import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldErrorDirective } from './form-field-error.directive';

@Component({
  imports: [ReactiveFormsModule, FormFieldErrorDirective],
  template: `
    <form>
      <input [formControl]="control" caFormFieldError [caFormFieldError]="customMessages" />
    </form>
  `
})
class TestHostComponent {
  control = new FormControl('', [Validators.required, Validators.email]);
  customMessages: Record<string, string> | '' = { required: 'Custom required', email: 'Custom email' };
}

describe('FormFieldErrorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TestHostComponent, FormFieldErrorDirective],
      //declarations: [TestHostComponent, FormFieldErrorDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should not show error initially', () => {
    const errorEl = fixture.nativeElement.querySelector('small');
    expect(errorEl).toBeNull();
  });

  it('should show required error after blur when empty', () => {
    inputEl.triggerEventHandler('blur', {});
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('small');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Custom required');
    expect(inputEl.nativeElement.classList).toContain('border-red-300');
  });

  it('should show email error after blur when invalid email', () => {
    host.control.setValue('not-an-email');
    inputEl.triggerEventHandler('blur', {});
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('small');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Custom email');
    expect(inputEl.nativeElement.classList).toContain('border-red-300');
  });

  it('should remove error when valid', () => {
    host.control.setValue('test@example.com');
    host.control.markAsTouched();
    inputEl.triggerEventHandler('blur', {});
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('small');
    expect(errorEl).toBeNull();
    expect(inputEl.nativeElement.classList).not.toContain('border-red-300');
  });

  it('should use default messages if customMessages is empty', () => {
    host.customMessages = '';
    host.control.setValue('');
    inputEl.triggerEventHandler('blur', {});
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('small');
    expect(errorEl.textContent).toContain('This field is required.');
  });
})