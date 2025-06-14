import { TestBed } from '@angular/core/testing';

import { ContactsDataService } from './contacts-data.service';

describe('ContactsDataService', () => {
  let service: ContactsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
