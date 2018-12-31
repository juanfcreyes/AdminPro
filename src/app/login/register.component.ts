import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

	forma: FormGroup;

	constructor(public usuarioService: UsuarioService, public router: Router) { 

	}

	ngOnInit() {
		init_plugins();

		this.forma = new FormGroup({
			nombre: new FormControl(null, Validators.required ),
			correo: new FormControl(null, [Validators.required, Validators
			.email]),
			password: new FormControl(null, Validators.required),
			passwordC: new FormControl(null, Validators.required),
			condiciones: new FormControl(false)
		}, {
			validators: this.comprobarPassword('password', 'passwordC')
		});

		this.forma.setValue({
			nombre: 'Juan',
			correo: 'juan@hotmail.com',
			password: '123456',
			passwordC: '123456',
			condiciones: true
		})
	}


	/**
	 * Valida que la informacion del formulario sea correcta
	 */
	validarFormulario() {
		if (this.forma.invalid) {
			return;
		}
		if (!this.forma.value.condiciones) {
			swal('Importante', 'Debe aceptar las condiciones', 'warning');
			return;
		}
		this.registrarUsuario();
	}

	/**
	 * Registra un usuario s}
	 */
	registrarUsuario() {
		const usuario = new Usuario(
			this.forma.value.nombre,
			this.forma.value.correo,
			this.forma.value.password
		);	
		this.usuarioService.crearUsuario(usuario)
		.subscribe(() => {
			swal('Registro Correcto', 'Usuario registrado con éxito', 'success');
			this.router.navigate(['/login']);
		});
	}


	/**
	 * Comprueba si dos campos del formulario tiene el mismo valor
	 * @param campo1 
	 * @param campo2 
	 */
	comprobarPassword(campo1: string, campo2: string ) {
		return (gruop: FormGroup) => {
			const valor1 = gruop.controls[campo1].value;
			const valor2 = gruop.controls[campo2].value;
			if (valor1 === valor2) {
				return null;
			}
			return {
				noIguales: true
			}
		}
	}

}
