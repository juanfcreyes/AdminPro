import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: []
})
export class HeaderComponent implements OnInit {

	usuario: Usuario;

	constructor(private usuarioService: UsuarioService,
		private router:Router) { }

	ngOnInit() {
		this.usuario = this.usuarioService.getUsuario();
	}

	logout() {
		this.usuarioService.logout();
	}

	buscar(termino: string) {
		this.router.navigate(['/busqueda', termino ])
	}

}
