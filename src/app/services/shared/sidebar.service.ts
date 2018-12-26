import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public menu: any = null;
	constructor(private usuarioService: UsuarioService) {
		
	}

	cargarMenu() {
		this.menu = this.usuarioService.getMenu();
	}
}
