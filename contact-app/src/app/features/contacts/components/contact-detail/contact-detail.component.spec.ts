import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailComponent } from './contact-detail.component';
import { ContactsStore } from '@store/store';
import { MockContactsStore } from '@store/mock/contacts.store.mock';

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;
  let store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailComponent],
      providers: [
        {
          provide: ContactsStore,
          useClass: MockContactsStore
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the contact for a given id', () => {
    expect(component.selectedContact()).toEqual(
      {
      id: '1',
      phone: { number: '123-456-7890', extension: '101' },
      firstName: 'Alice',
      lastName: 'Smith',
      avatar: 'https://example.com/avatar1.png',
      email: 'alice@example.com',
      company: 'Acme Corp',
      jobTitle: 'Engineer',
      createdOn: new Date('2023-01-01')
    }
    );
  });
});
