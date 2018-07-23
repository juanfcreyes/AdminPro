import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const ROUTES: Routes = [
  { 
    path:'',
    component: PagesComponent,
    children: [
      { path:'graficas', component: GraficasComponent }, 
      { path:'progress', component: ProgressComponent }, 
      { path:'dashboard', component: DashboardComponent }, 
      { path:'account-settings', component: AccountSettingsComponent }, 
      { path:'', redirectTo: '/dashboard' , pathMatch: 'full' }, 
    ]
  } 
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES)