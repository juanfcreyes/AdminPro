import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index'
import { Usuario } from '../../models/usuario.model';

@Component({
	selector: 'app-siderbar',
	templateUrl: './siderbar.component.html',
	styles: []
})
export class SiderbarComponent implements OnInit {

	usuario: Usuario;

	constructor(public siderbarService: SidebarService,
		public usuarioService: UsuarioService) { }

	ngOnInit() {
		this.usuario = this.usuarioService.getUsuario();
		this.siderbarService.cargarMenu();
	}

	logout() {
		this.usuarioService.logout();
	}

}
