import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts',
    'pathMatch': 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'contacts',
        loadComponent: () =>
          import('./features/contacts/components/contact-list/contact-list.component').then(
            (c) => c.ContactListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/contacts/components/create-edit-contact/create-edit-contact.component').then(
            (c) => c.CreateEditContactComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/contacts/components/create-edit-contact/create-edit-contact.component').then(
            (c) => c.CreateEditContactComponent
          ),
      },
    ],
  },
];
