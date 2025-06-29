import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the not found message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Adjust selector/text according to your template
    expect(compiled.textContent?.toLowerCase()).toContain('404');
  });

  it('should have a link to navigate home if present', () => {
    const debugEl = fixture.debugElement.query(By.css('a[routerLink]'));
    expect(debugEl.attributes['routerLink']).toBeDefined();
  });
});
