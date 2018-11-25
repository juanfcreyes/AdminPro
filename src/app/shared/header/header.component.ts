import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: []
})
export class HeaderComponent implements OnInit {

	usuario: Usuario;

	constructor(private usuarioService: UsuarioService) { }

	ngOnInit() {
		this.usuario = this.usuarioService.getUsuario();
	}

	logout() {
		this.usuarioService.logout();
	}
}
