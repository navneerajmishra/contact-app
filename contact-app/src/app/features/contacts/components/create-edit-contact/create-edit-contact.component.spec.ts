import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditContactComponent } from './create-edit-contact.component';
import { ContactsStore } from '@store/store';
import { MockContactsStore } from '@store/mock/contacts.store.mock';

describe('CreateEditContactComponent', () => {
  let component: CreateEditContactComponent;
  let fixture: ComponentFixture<CreateEditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditContactComponent],
      providers: [{
        provide: ContactsStore,
        useClass: MockContactsStore
    }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
