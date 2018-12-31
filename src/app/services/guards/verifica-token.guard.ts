import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
	providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

	constructor(public usuarioService: UsuarioService, 
		public router: Router) {}

	canActivate(): Promise<boolean> | boolean {
		const token = this.usuarioService.getToken();
		const payload = JSON.parse(atob(token.split('.')[1]));
		let expirado = this.expiroToken(payload.exp)
		if (expirado) {
			return false;
		}
		return this.verficaRenueva(payload.exp);
	}

	expiroToken(fecha: number) {
		let ahora = new Date().getTime() /1000;
		return fecha < ahora;
	}

	verficaRenueva(fecha: number): Promise<boolean>  {
		return new Promise((resolve, reject)=> {
			const tokenExp = new Date(fecha * 1000);
			const ahora = new Date();
			ahora.setTime( ahora.getTime() + ( 0.5 * 60 * 60 * 1000));
			if (tokenExp.getTime() > ahora.getTime()) {
				resolve(true);
			} else {
				this.usuarioService.renovarToken()
				.subscribe(() => {
					resolve(true)
				}, () => {
					reject(false);
					this.router.navigate(['/login']);
				});
			}
		});
	}
}
