import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuard } from '../services/guards/login.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';

const ROUTES: Routes = [
  { 
    path:'',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path:'graficas', component: GraficasComponent, data: { titulo: 'Gráficas'} },
      { path:'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}  }, 
      { path:'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}  }, 
      { path:'progress', component: ProgressComponent, data: { titulo: 'Progress'}  }, 
      { path:'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}  }, 
      { path:'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de tema'}  }, 
      { path:'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}  }, 
      { path:'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
      { path:'', redirectTo: '/dashboard' , pathMatch: 'full' }, 
    ]
  } 
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES)