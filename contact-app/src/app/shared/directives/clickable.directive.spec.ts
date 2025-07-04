import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickableDirective } from './clickable.directive';
import { By } from '@angular/platform-browser';

@Component({
  imports: [ClickableDirective],
  template: `<div [caClickable]="isClickable" (caClick)="clicked($event)"></div>`
})
class TestHostComponent {
  isClickable = true;
  clicked = jasmine.createSpy('clicked');
}

describe('ClickableDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickableDirective, TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit caClick when clickable and clicked', () => {
    const div = fixture.debugElement.query(By.directive(ClickableDirective)).nativeElement;
    div.click();
    expect(host.clicked).toHaveBeenCalled();
  });

  it('should set cursor to pointer when clickable', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div.style.cursor).toBe('pointer');
  });

  it('should set cursor to default when not clickable', () => {
    host.isClickable = false;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('div');
    expect(div.style.cursor).toBe('default');
  });
});