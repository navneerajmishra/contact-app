import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { By } from '@angular/platform-browser';

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let component: ConfirmDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and message', () => {
    fixture.componentRef.setInput('title', 'Confirm Delete');
    fixture.componentRef.setInput('message', 'Are you sure you want to delete?');
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector('#confirm-dialog-title');
    const messageEl = fixture.nativeElement.querySelector('#confirm-dialog-message');
    expect(titleEl.textContent).toContain('Confirm Delete');
    expect(messageEl.textContent).toContain('Are you sure you want to delete?');
  });

  it('should emit true when confirm button is clicked', (done) => {
    fixture.componentRef.setInput('title', 'Confirm');
    fixture.componentRef.setInput('message', 'Proceed?');
    fixture.detectChanges();

    component.onClose.subscribe((result: boolean) => {
      expect(result).toBeTrue();
      done();
    });

    const confirmBtn = fixture.debugElement.query(By.css('button[aria-label="Confirm action"]'));
    confirmBtn.nativeElement.click();
  });

  it('should emit false when cancel button is clicked', (done) => {
    fixture.componentRef.setInput('title', 'Confirm');
    fixture.componentRef.setInput('message', 'Proceed?');
    fixture.detectChanges();

    component.onClose.subscribe((result: boolean) => {
      expect(result).toBeFalse();
      done();
    });

    const cancelBtn = fixture.debugElement.query(By.css('button[aria-label="Cancel action"]'));
    cancelBtn.nativeElement.click();
  });

  it('should emit false when close button is clicked', (done) => {
    fixture.componentRef.setInput('title', 'Confirm');
    fixture.componentRef.setInput('message', 'Proceed?');
    fixture.detectChanges();

    component.onClose.subscribe((result: boolean) => {
      expect(result).toBeFalse();
      done();
    });

    const closeBtn = fixture.debugElement.query(By.css('button[aria-label="Close dialog"]'));
    closeBtn.nativeElement.click();
  });
});
