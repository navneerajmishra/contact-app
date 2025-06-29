import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { ToastService } from '@shared/services';
import { ContactsStore } from '@store/store';
import { MockContactsStore } from '@store/mock/contacts.store.mock';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
      providers: [
        ToastService,
        {
          provide: ContactsStore,
          useClass: MockContactsStore
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('should call ToastService.show when store.error() returns a value', () => {
  //const toastService = TestBed.inject(ToastService);
  const store = TestBed.inject(ContactsStore);

  const errorMessage = 'Some error';
  spyOn(store, 'error').and.returnValue(errorMessage);
  const showSpy = spyOn(toastService, 'show');

  // Re-create component to trigger effect with mocked error
  fixture = TestBed.createComponent(ErrorComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  expect(showSpy).toHaveBeenCalledWith({
    message: 'Some error',
    type: 'error',
    duration: 50000,
  });
});

it('should not call ToastService.show when store.error() does not return a value', () => {
  const toastService = TestBed.inject(ToastService);
  const store = TestBed.inject(ContactsStore);

  spyOn(store, 'error').and.returnValue('');
  const showSpy = spyOn(toastService, 'show');

  // Re-create component to trigger effect with mocked error
  fixture = TestBed.createComponent(ErrorComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  expect(showSpy).not.toHaveBeenCalled();
});
});
