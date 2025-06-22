import { TestBed } from '@angular/core/testing';
import { ContactsService, ContactApiModel } from './contacts-service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { API_URL } from '../../../api-url';
import { Contact } from '../../../store/model/contact';
import { provideHttpClient } from '@angular/common/http';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000/contacts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: baseUrl },
      ]
    });
    service = TestBed.inject(ContactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all contacts', () => {
    const apiContacts: ContactApiModel[] = [
      {
        id: '1',
        phone: '123-456-7890',
        first_name: 'Alice',
        last_name: 'Smith',
        avatar: 'avatar1.png',
        email: 'alice@example.com',
        company: 'Acme',
        job_title: 'Engineer',
        created_on: new Date('2023-01-01')
      }
    ];

    service.getAllContacts().subscribe(contacts => {
      expect(contacts.length).toBe(1);
      expect(contacts[0].firstName).toBe('Alice');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(apiContacts);
  });

  it('should delete a contact', () => {
    const apiContact: ContactApiModel = {
      id: '1',
      phone: '123-456-7890',
      first_name: 'Alice',
      last_name: 'Smith',
      avatar: 'avatar1.png',
      email: 'alice@example.com',
      company: 'Acme',
      job_title: 'Engineer',
      created_on: new Date('2023-01-01')
    };

    service.deleteContact('1').subscribe(contact => {
      expect(contact.id).toBe('1');
      expect(contact.firstName).toBe('Alice');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(apiContact);
  });

  it('should create a contact', () => {
    const contact: Contact = {
      id: null,
      phone: { number: '123-456-7890', extension: '101' },
      firstName: 'Bob'
    };

    const apiContact: ContactApiModel = {
      id: '2',
      phone: '123-456-7890',
      first_name: 'Bob'
    };

    service.createOrUpdateContact(contact).subscribe(result => {
      expect(result.firstName).toBe('Bob');
      expect(result.id).toBe('2');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(apiContact);
  });

  it('should update a contact', () => {
    const contact: Contact = {
      id: '2',
      phone: { number: '123-456-7890', extension: '101' },
      firstName: 'Bob'
    };

    const apiContact: ContactApiModel = {
      id: '2',
      phone: '123-456-7890',
      first_name: 'Bob'
    };

    service.createOrUpdateContact(contact).subscribe(result => {
      expect(result.firstName).toBe('Bob');
      expect(result.id).toBe('2');
    });

    const req = httpMock.expectOne(`${baseUrl}/2`);
    expect(req.request.method).toBe('PUT');
    req.flush(apiContact);
  });
});