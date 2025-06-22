import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { ContactsStore } from '@store/store';
import { MockContactsStore } from '@store/mock/contacts.store.mock';
import { ConfirmDialogService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent],
      providers: [
        ConfirmDialogService,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']) },
      { 
        provide: ActivatedRoute, 
        useValue: {
          snapshot: { paramMap: { get: () => '123' } },
          params: of({ id: '123' }),
          queryParams: of({}),
          queryParamMap: of({}),
          // add more as needed for your test
        }
      },
        {
          provide: ContactsStore,
          useClass: MockContactsStore
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
