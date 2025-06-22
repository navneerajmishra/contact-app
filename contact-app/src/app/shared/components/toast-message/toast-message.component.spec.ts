import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastMessageComponent } from './toast-message.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('ToastMessageComponent', () => {
    let component: ToastMessageComponent;
    let fixture: ComponentFixture<ToastMessageComponent>;
    let componentRef: ComponentRef<ToastMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToastMessageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToastMessageComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the toast message', () => {
        componentRef.setInput('toastMessage', {
            message: 'Test message',
            type: 'success',
        });
        fixture.detectChanges();
        const messageEl = fixture.debugElement.query(
            By.css('#toast-message-text')
        );
        expect(messageEl.nativeElement.textContent).toContain('Test message');
    });

    it('should show success icon for success type', () => {
        componentRef.setInput('toastMessage', {
            message: 'Success!',
            type: 'success',
        });
        fixture.detectChanges();
        const icon = fixture.debugElement.query(By.css('.text-green-500'));
        expect(icon).toBeTruthy();
    });

    it('should show error icon for error type', () => {
        componentRef.setInput('toastMessage', {
            message: 'Error!',
            type: 'error',
        });
        fixture.detectChanges();
        const icon = fixture.debugElement.query(By.css('.text-red-500'));
        expect(icon).toBeTruthy();
    });

    it('should emit onClose when close button is clicked', (done) => {
        fixture.componentRef.setInput('toastMessage', {
            message: 'Close me',
            type: 'success',
        });
        fixture.detectChanges();
        const closeBtn = fixture.debugElement.query(
            By.css('button[aria-label="Close notification"]')
        );
        expect(closeBtn).toBeTruthy(); // Debug: ensure button exists
        
        component.onClose.subscribe(() => {
            expect(true).toBeTrue();
            done();
        });
        closeBtn.nativeElement.click();
    });
});
