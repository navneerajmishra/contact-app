import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { ContactsStore } from '@store/store';
import { MockContactsStore } from '@store/mock/contacts.store.mock';
import { ConfirmDialogService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TableComponent } from '@shared/components';
import { signal } from '@angular/core';

describe('ContactListComponent', () => {
    let component: ContactListComponent;
    let fixture: ComponentFixture<ContactListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ContactListComponent],
        providers: [
          ConfirmDialogService,
          {
            provide: Router,
            useValue: jasmine.createSpyObj('Router', [
              'navigate',
              'navigateByUrl',
            ]),
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {},
              params: of(),
              queryParams: of({}),
              queryParamMap: of({
                get: () => null
              }),
            }
          },
          {
            provide: ContactsStore,
            useClass: MockContactsStore,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ContactListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    

    it('should call router.navigate to "new" on createContact()', () => {
      const router = TestBed.inject(Router);
      component['createContact']();
      expect(router.navigate).toHaveBeenCalledWith(['new'], { relativeTo: jasmine.anything() });
    });

    it('should call router.navigate to contact id on onRowClick()', () => {
      const router = TestBed.inject(Router);
      const data = { data: { id: '123' } } as any;
      component['onRowClick'](data);
      expect(router.navigate).toHaveBeenCalledWith(['123'], { relativeTo: jasmine.anything() });
    });

    it('should call router.navigate to edit contact on onUpdate()', () => {
      const router = TestBed.inject(Router);
      const data = { data: { id: '123' } } as any;
      component['onUpdate'](data);
      expect(router.navigate).toHaveBeenCalledWith(['edit', '123'], { relativeTo: jasmine.anything() });
    });

    it('should update query params on onPageChange()', () => {
      const router = TestBed.inject(Router);
      component['onPageChange'](2);
      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: jasmine.anything(),
        queryParams: { pn: 2 },
        queryParamsHandling: 'merge',
      });
    });

    it('should update query params on onSearchChange()', () => {
      const router = TestBed.inject(Router);
      component['onSearchChange']('john');
      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: jasmine.anything(),
        queryParams: { ss: 'john' },
        queryParamsHandling: 'merge',
      });
    });

    it('should update query params on onSortChange()', () => {
      const router = TestBed.inject(Router);
      const sortOption = { field: 'name', order: 'desc' };
      component['onSortChange'](sortOption as any);
      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: jasmine.anything(),
        queryParams: { sb: 'name', so: 'desc' },
        queryParamsHandling: 'merge',
      });
    });

    it('should call confirm dialog and delete contact if confirmed', async () => {
      const confirmDialog = TestBed.inject(ConfirmDialogService);
      const store = TestBed.inject(ContactsStore);
      spyOn(confirmDialog, 'confirm').and.returnValue(Promise.resolve(true));
      const deleteSpy = store.optimisticDelete;
      const data = { data: { id: '123', name: 'John Doe' } } as any;
      await component['onDelete'](data);
      expect(confirmDialog.confirm).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith('123');
    });

    it('should not delete contact if confirm dialog is cancelled', async () => {
      const confirmDialog = TestBed.inject(ConfirmDialogService);
      const store = TestBed.inject(ContactsStore);
      spyOn(confirmDialog, 'confirm').and.returnValue(Promise.resolve(false));
      const deleteSpy = store.optimisticDelete;
      
      const data = { data: { id: '123', name: 'John Doe' } } as any;
      await component['onDelete'](data);
      expect(confirmDialog.confirm).toHaveBeenCalled();
      expect(deleteSpy).not.toHaveBeenCalled();
    });
  })