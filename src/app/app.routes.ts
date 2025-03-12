import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { NextComponentComponent } from './components/next-component/next-component.component';

export const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'table', component: TableComponent },
  { path: 'next-component', component: NextComponentComponent }
];