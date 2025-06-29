import {
    ChangeDetectionStrategy,
    Component,
    Signal,
    computed,
    effect,
    inject,
    signal,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent, TableComponent } from '@shared/components';
import { ContactsStore } from '@store/store';
import { Contact, RequestStatus } from '@store/model';
import { filterMap, sortByStringField } from '@shared/utilities';
import { Field, PaginationOption, SortOption, SortOrder } from '@shared/models';
import { ConfirmDialogService } from '@shared/services';

export type ContactsViewModel = {
    id: string;
    name: string;
    jobTitle?: string;
    company?: string;
    phone: string;
    email?: string;
    avatar?: string;
    createdOn?: Date;
};

@Component({
    selector: 'ca-contact-list',
    imports: [CommonModule, TableComponent, LoadingIndicatorComponent],
    templateUrl: './contact-list.component.html',
    host: {
        class: 'flex flex-col gap-4 h-full'
    },
    styleUrl: './contact-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
    readonly #store = inject(ContactsStore);
    readonly #router = inject(Router);
    readonly #activatedRoute = inject(ActivatedRoute);
    readonly #confirm = inject(ConfirmDialogService);

    loadingStatus: Signal<RequestStatus>;

    protected readonly columns: Signal<Field<ContactsViewModel>[]> = signal([
        {
            id: 'id',
            name: 'Id',
            type: 'string',
            isHidden: true,
            isSortable: false,
        },
        {
            id: 'name',
            name: 'Name',
            type: 'string',
            isHidden: false,
            isSortable: true,
        },
        {
            id: 'company',
            name: 'Company',
            type: 'string',
            isHidden: false,
            isSortable: false,
        },
        {
            id: 'phone',
            name: 'Phone',
            type: 'string',
            isHidden: false,
            isSortable: false,
        },
        {
            id: 'email',
            name: 'email',
            type: 'string',
            isHidden: false,
            isSortable: true,
        },
        {
            id: 'jobTitle',
            name: 'Job title',
            type: 'string',
            isHidden: false,
            isSortable: false,
        },
        {
            id: 'createdOn',
            name: 'Created On',
            type: 'date',
            isHidden: true,
            isSortable: false,
        },
    ]);

    
    protected readonly searchString = signal<string>('');
    protected readonly paginationOptions = signal<PaginationOption>({
        pageNumber: 1,
        pageSize: 10,
    });
    protected readonly sortOption = signal<SortOption<ContactsViewModel>>({
        field: 'name',
        order: 'asc',
    });

    protected readonly filteredContactList: Signal<ContactsViewModel[]> =
        computed(() => {
            const contacts = this.#store.contactEntities();
            const searchString = this.searchString().toLowerCase().trim();
            return filterMap<Contact, ContactsViewModel>(
                contacts,
                (contact): ContactsViewModel | undefined => {
                    const valuesToCompare = [
                        contact.firstName,
                        contact.lastName,
                        contact.email,
                    ];
                    return !searchString ||
                        valuesToCompare.some((value) =>
                            value?.toLowerCase().includes(searchString)
                        )
                        ? {
                              id: contact.id!,
                              company: contact.company ?? '',
                              jobTitle: contact.jobTitle ?? '',
                              name: `${contact.firstName} ${
                                  contact.lastName ?? ''
                              }`,
                              phone: contact.phone.extension ? `${contact.phone.number} x${contact.phone.extension}` : contact.phone.number,
                              email: contact.email,
                          }
                        : undefined;
                }
            );
        });

    readonly #sortedContactList: Signal<ContactsViewModel[]> = computed(() => {
        const sortOption = this.sortOption();

        return sortByStringField(
            this.filteredContactList(),
            sortOption.field as keyof ContactsViewModel,
            sortOption.order
        );
    });

    protected readonly paginatedContacts: Signal<ContactsViewModel[]> =
        computed(() => {
            const { pageNumber, pageSize } = this.paginationOptions();

            return this.#sortedContactList().slice(
                (pageNumber - 1) * pageSize,
                pageNumber * pageSize
            );
        });

    constructor() {
        this.loadingStatus = this.#store.requestStatus;
        this.#activatedRoute.queryParamMap.subscribe((params) => {
            const pageNumber = params.get('pn') ?? 1;
            const pageSize = params.get('ps') ?? 10;
            const sortOrder = params.get('so') as SortOrder | null;
            this.paginationOptions.set({
                pageNumber: Number(pageNumber),
                pageSize: Number(pageSize),
            });
            this.sortOption.update((previousValue) => ({
                field: (params.get('sb') ??
                    previousValue.field) as keyof ContactsViewModel,
                order: sortOrder ?? previousValue.order,
            }));
            this.searchString.set(params.get('ss') ?? '');
        });
        
    }

    protected createContact() {
        this.#router.navigate(['new'], {relativeTo: this.#activatedRoute});
    }

    protected onRowClick(data: { data: ContactsViewModel }) {
        // Todo open view contact detail component
        this.#router.navigate([data.data.id], {relativeTo: this.#activatedRoute});
    }

    protected onUpdate(data: { data: ContactsViewModel }) {
        // Todo open view contact detail component
        this.#router.navigate(['edit', data.data.id], {relativeTo: this.#activatedRoute});
    }

    protected onPageChange(pageNumber: number | null) {
        this.#updateQueryParams({
            pn: pageNumber,
        });
    }

    protected onSearchChange(searchString: string) {
        this.#updateQueryParams({
            ss: searchString?.trim(),
        });
    }

    protected onSortChange(sortOption: SortOption<ContactsViewModel>) {
        this.#updateQueryParams({
            sb: sortOption.field,
            so: sortOption.order,
        });
    }

    protected async onDelete(data: { data: ContactsViewModel }) {
        const confirmed = await this.#confirm.confirm(
            'Are you sure you want to delete this contact?',
            data.data.name
        );
        if (confirmed) {
            this.#store.optimisticDelete(data.data.id);
        }
    }

    #updateQueryParams(queryParams: Params) {
        this.#router.navigate([], {
            relativeTo: this.#activatedRoute,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }
}
