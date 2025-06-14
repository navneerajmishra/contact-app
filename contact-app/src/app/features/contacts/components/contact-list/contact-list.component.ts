import {
    ChangeDetectionStrategy,
    Component,
    Signal,
    computed,
    inject,
    input,
    signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Field, LoadingIndicatorComponent, PaginationOption, TableComponent } from '@shared/components';
import { ContactsStore } from '@store/store';
import { Contact } from '@store/model';

type ContactsViewModel = {
    id: string;
    name: string;
    jobTitle?: string;
    company?: string;
    phone: string;
    avatar?: string;
};

@Component({
    selector: 'ca-contact-list',
    imports: [CommonModule, TableComponent, LoadingIndicatorComponent],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
    readonly pno = input<number>(1);

    readonly #store = inject(ContactsStore);
    readonly #router = inject(Router);
    protected readonly contactsList: Signal<ContactsViewModel[]>;
    protected readonly columns: Signal<Field[]> = signal([
        {
            id: 'id',
            name: 'Id',
            isHidden: true,
        },
        {
            id: 'name',
            name: 'Name',
            isHidden: false,
        },
        {
            id: 'company',
            name: 'Company',
            isHidden: false,
        },
        {
            id: 'phone',
            name: 'Phone',
            isHidden: false,
        },
        {
            id: 'jobTitle',
            name: 'Job title',
            isHidden: false,
        },
    ]);
    protected readonly paginationOptions: Signal<PaginationOption> = computed(() => ({
        pageNumber: this.pno(),
        total: this.#store.contactEntities.length
    }));

    protected loadingStatus = this.#store.requestStatus;

    constructor() {
        this.contactsList = computed(() => {
            const contacts = this.#store.contactEntities();
            return (contacts ?? []).map(
                (c): ContactsViewModel => ({
                    id: c.id,
                    company: c.company ?? '',
                    jobTitle: c.jobTitle ?? '',
                    name: `${c.firstName} ${c.lastName ?? ''}`,
                    phone: c.phone,
                })
            );
        });
    }

    createContact() {
        this.#router.navigate(['/', 'new']);
    }

    onRowClick(data: {data: Contact; sourceEvent: Event}) {
        // Todo open view contact detail component
        this.#router.navigate(['/', 'edit', data.data.id]);
    }

    onPageChange(pageNumber: number) {
        this.#router.navigate(['/', 'contacts'], {
            queryParams: {
                pno: pageNumber
            },
            queryParamsHandling: 'merge'
        });
    }
}
