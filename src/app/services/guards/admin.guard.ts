import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
	providedIn: 'root'
})

export class AdminGuard implements CanActivate {

	constructor(public usuarioService: UsuarioService, public router: Router) {}

	canActivate() {
		if(this.usuarioService.getUsuario().role === 'ADMIN_ROLE') {
			return true;
		} else {
			this.router.navigate(['dashboard'])
			return false;	
		}
		
	}
}
