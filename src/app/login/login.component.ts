import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { GOOGLE_CLIENT_ID } from '../config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	recuerdame: boolean = false;
	email: string;
	auth2: any;

	constructor(private router: Router,
		 private usuarioService: UsuarioService,
		 private zona: NgZone) { 
		 }

	ngOnInit() {
		init_plugins();
		this.googleInit();
		this.email = localStorage.getItem('email') || '';
		if (this.email.length > 0) {
			this.recuerdame = true;
		}
	}

	ingresar(forma: NgForm) {
		if (forma.invalid) {
			return;
		}
		const usuario = new Usuario(null, forma.value.email, forma.value.password);
		this.usuarioService.login(usuario, this.recuerdame).subscribe(() => {
			this.router.navigate(['/dashboard']);
		});
	}

	googleInit() {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: GOOGLE_CLIENT_ID,
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});
			this.attachSingin(document.getElementById('btn_google'));
		});
	}

	attachSingin(elemento) {
		this.auth2.attachClickHandler(elemento, {}, (googleUser) => {
			this.usuarioService.loginGoogle(googleUser.
				getAuthResponse().id_token).subscribe(() => {
					this.zona.run(() => {
						
						this.router.navigate(['/dashboard']);
					})
				});
		});
		elemento.blur();
	}

}
