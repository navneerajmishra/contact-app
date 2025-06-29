import { Injectable, signal, computed } from '@angular/core';
import { Contact } from '../model/contact';

// Mimic the entity map structure for rollback logic
const contactEntityMap = (contacts: Contact[]) =>
  contacts.reduce((map, contact) => {
    if (contact.id) map[contact.id] = contact;
    return map;
  }, {} as Record<string, Contact>);

@Injectable()
export class MockContactsStore {
  // Dummy contacts
  private _contacts = [
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
    },
    {
      id: '2',
      phone: { number: '987-654-3210', extension: '202' },
      firstName: 'Bob',
      lastName: 'Johnson',
      avatar: 'https://example.com/avatar2.png',
      email: 'bob@example.com',
      company: 'Beta LLC',
      jobTitle: 'Manager',
      createdOn: new Date('2023-02-01')
    }
  ];

  // Signals to mimic store selectors
  contactEntities = signal<Contact[]>(this._contacts);
  contactEntityMap = signal<Record<string, Contact>>(contactEntityMap(this._contacts));

  // Mocked request status
  requestStatus = signal<'idle' | 'pending' | 'fulfilled' | { error: string }>('idle');
  
  
  // Computed properties
  error = computed(() => {
    const status = this.requestStatus();
    return typeof status === 'object' ? status.error : null;
  });

  isFulfilled = computed(() => {
    const status = this.requestStatus();
    return status === 'fulfilled';
  });


  // Mocked methods
  loadAll = jasmine.createSpy('loadAll');
  create = jasmine.createSpy('create');
  optimisticUpdate = jasmine.createSpy('optimisticUpdate');
  optimisticDelete = jasmine.createSpy('optimisticDelete');
}