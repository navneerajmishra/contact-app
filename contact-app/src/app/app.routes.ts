import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'contacts',
                loadComponent: () =>
                    import(
                        './features/contacts/components/contact-list/contact-list.component'
                    ).then((c) => c.ContactListComponent),
            },
            {
                path: 'contacts/:id',
                loadComponent: () =>
                    import(
                        './features/contacts/components/contact-detail/contact-detail.component'
                    ).then((c) => c.ContactDetailComponent),
            },
            {
                path: 'new',
                loadComponent: () =>
                    import(
                        './features/contacts/components/create-edit-contact/create-edit-contact.component'
                    ).then((c) => c.CreateEditContactComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () =>
                    import(
                        './features/contacts/components/create-edit-contact/create-edit-contact.component'
                    ).then((c) => c.CreateEditContactComponent),
            },
        ],
    },
    { 
        path: '**', 
        loadComponent: () =>
            import('./core/components/not-found/not-found.component').then(
                (c) => c.NotFoundComponent
            ),
    },
];
