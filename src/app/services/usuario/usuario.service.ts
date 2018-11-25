import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	private ID_FIELD = 'id';
	private TOKEN_FIELD = 'token';
	private USUARIO_FIELD = 'usuario';

	private usuario: Usuario = null;
	private token: string = ''; 

	constructor(public http: HttpClient, private router: Router, 
		private subirArchivoService: SubirArchivoService) {	
		this.cargarStorage();
	}

	/**
	 * getUsuario
	 */
	public getUsuario(): Usuario {
		return this.usuario;	
	}


	/**
	 * Guarda los datos del usuario en el localstorage
	 * @param id 
	 * @param token 
	 * @param usuario 
	 */
	private guardarStorage(id: string, token: string, usuario: Usuario) {
		localStorage.setItem(this.ID_FIELD, id);
		localStorage.setItem(this.TOKEN_FIELD, token);
		localStorage.setItem(this.USUARIO_FIELD, JSON.stringify(usuario));
		this.usuario = usuario;
		this.token = token;
	}

	/**
	 * Carga los datos del local storage
	 */
	private cargarStorage() {
		if (localStorage.getItem(this.TOKEN_FIELD)) {
			this.token = localStorage.getItem(this.TOKEN_FIELD);
			this.usuario = JSON.parse(localStorage.getItem(this.USUARIO_FIELD));
		}
	}

	/**
	 * Verifica si un usuario esta logeado
	 */
	public estaLogeado(): boolean {
		return this.token.length > 5;
	}

	/**
	 * Servicio para autenticacion al sistema a traves de google
	 * @param token 
	 */
	public loginGoogle(token: string) {
		const url = URL_SERVICIOS + '/login/google';
		return this.http.post(url, {token})
		.pipe(map((res: any) => {
			this.guardarStorage(res.id, res.token, res.usuario);
			return true;
		}));
	}

	/**
	 * Servicio para autenticacion al sistema de forma nativa 
	 * @param usuario 
	 * @param recordar 
	 */
	public login(usuario: Usuario, recordar: boolean = false) {
		if (recordar) {
			localStorage.setItem('email', usuario.email);
		} else {
			localStorage.removeItem('email');
		}
		const url = URL_SERVICIOS + '/login';
		return this.http.post(url, usuario).pipe(map((res: any) => {
			this.guardarStorage(res.id, res.token, res.usuario);
			return true;
		}));
	}
	
	/**
	 * Cierra la sesio de un usuario
	 */
	logout() {
		this.usuario = null;
		this.token = '';
		localStorage.removeItem(this.TOKEN_FIELD);
		localStorage.removeItem(this.USUARIO_FIELD);
		this.router.navigate(['/login'])
	}

	/**
	 * Servicio para guardar un nuevo usuario
	 * @param usuario 
	 */
	public crearUsuario(usuario: Usuario) {
		const url = `${URL_SERVICIOS}/usuario/`;
		return this.http.post(url, usuario);
	}

	/**
	 * Servicio para actualizar datos del usuario
	 * @param usuario 
	 */
	public actualizarUsuario(usuario: Usuario) {
		const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
		return this.http.put(url, usuario).pipe(map((res: any) => {
			const {usuario} = res;
			this.guardarStorage(usuario._id, this.token, usuario);
			return true;
		}));
	}

	cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
		.then( (res: any) => {
			this.usuario.img = res.img;
			this.guardarStorage(id, this.token, this.usuario);
			swal('Imagen Actualizada', this.usuario.nombre, 'success');
		}).catch((res) => {
			
		});
	}


}
