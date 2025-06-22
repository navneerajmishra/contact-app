import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initials when imageUrl is not set', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.componentRef.setInput('imageUrl', '');
    fixture.detectChanges();
    const initials = fixture.nativeElement.textContent;
    expect(initials).toContain('JD');
  });

  it('should display the image when a valid imageUrl is set', (done) => {
    fixture.componentRef.setInput('name', 'Jane Smith');
    // Mock Image to always call onload
    const restore = mockImageConstructor('onload');
    fixture.componentRef.setInput('imageUrl', 'https://example.com/avatar.png');
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.src).toContain('https://example.com/avatar.png');
      restore();
      done();
    }, 10);
  });

  it('should not display the image when an invalid imageUrl is set', (done) => {
    fixture.componentRef.setInput('name', 'Jane Smith');
    // Mock Image constructor
    const restore = mockImageConstructor('onerror');
    fixture.componentRef.setInput('imageUrl', 'https://example.com/invalid.png');
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeNull();
      const initials = fixture.nativeElement.textContent;
      expect(initials).toContain('JS');
      restore();
      done();
    }, 10);
  });

  it('should compute initials correctly', () => {
    fixture.componentRef.setInput('name', 'Alice Bob Carol');
    fixture.detectChanges();
    expect(component['initials']()).toBe('ABC');
  });
});

function mockImageConstructor(onloadOrError: 'onload' | 'onerror') {
  const original = window.Image;
  (window as any).Image = function () {
    setTimeout(() => {
      if (typeof this[onloadOrError] === 'function') this[onloadOrError]();
    }, 0);
    return this;
  };
  return () => { window.Image = original; };
}