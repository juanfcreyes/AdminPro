import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './login/register.component'
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component'
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/service.index';

const ROUTES: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '', component: PagesComponent, 
	canActivate: [LoginGuard], loadChildren: './pages/pages.module#PagesModule' },
	{ path: '**', component: NoPageFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true })