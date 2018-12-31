import { RouterModule, Routes } from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';

const ROUTES: Routes = [
	{ path: 'graficas', component: GraficasComponent, data: { titulo: 'Gráficas' } },
	{ path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
	{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
	{ path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
	{
		path: 'dashboard',
		component: DashboardComponent,
		data: { titulo: 'Dashboard' },
		canActivate: [VerificaTokenGuard]
	},
	{ path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de tema' } },
	{ path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
	{ path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
	{
		path: 'usuarios', component: UsuariosComponent,
		data: { titulo: 'Mantenimiento de usuarios' }, canActivate: [AdminGuard]
	},
	{ path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
	{ path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
	{ path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES)