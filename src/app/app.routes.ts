import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list';
import { UserFormComponent } from './pages/user-form/user-form';

export const routes: Routes = [
{path: '', redirectTo: 'users/form', pathMatch: 'full'},
{path: 'users/list', component: UserListComponent},
{path: 'users/form', component: UserFormComponent},
];
