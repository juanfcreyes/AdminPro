import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './login/register.component'
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component'

const ROUTES: Routes = [
  { 
    path:'',
    component: PagesComponent,
    children: [
      { path:'graficas', component: GraficasComponent }, 
      { path:'progress', component: ProgressComponent }, 
      { path:'dashboard', component: DashboardComponent }, 
      { path:'', redirectTo: '/dashboard' , pathMatch: 'full' }, 
    ]
  },
  { path:'login', component: LoginComponent }, 
  { path:'register', component: RegisterComponent }, 
  { path:'**', component: NoPageFoundComponent }, 
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES , {useHash: true})