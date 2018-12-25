import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from 'src/app/utilitario/utilitario.index';

declare var swal:any;

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styles: []
})
export class UsuariosComponent implements OnInit {

	usuarios: Usuario[] = [];
	desde: number = 0;
	totalRegistros: number = 0;
	cargando: Boolean = true;
	termino: string = '';

	constructor(private usuarioService: UsuarioService,
		private modalUploadService: ModalUploadService) { }

	ngOnInit() {
		this.cargarUsuarios(false);
		this.modalUploadService.notificacion.subscribe(() => {
			this.cargarUsuarios(true);
		});
	}

	/**
	 * Funcion para cargar los usuarios por defecto
	 */
	cargarUsuarios(cambioPagina) {
		this.desde = cambioPagina ? this.desde : 0;
		this.cargando = true;
		this.usuarioService.cargarUsuarios(this.desde).subscribe((res : any) => {
			this.totalRegistros = res.total;
			this.usuarios = res.usuarios;
			this.cargando = false;
		});
	}

	/**
	 * Funcion para controlar el cambio de pagina
	 * @param valor 
	 */
	cambiarDesde(valor: number) {
		const desde = this.desde + valor;
		if (desde >= this.totalRegistros || desde < 0) {
			return;
		}
		this.desde = desde;
		this.consultarUsuarios();
	}

	/**
	 * Determina si realiza una couslta de usurio por filtro o sin el
	 */
	consultarUsuarios() {
		if (this.termino.length <= 0) {
			this.cargarUsuarios(true);
		} else {
			this.buscarUsuarios(true);
		}
	}
	
	/**
	 * Busca usuario por un termino de busqueda
	 * @param termino 
	 */
	buscarUsuarios(cambioPagina) {
		if (this.termino.length <= 0) {
			this.cargarUsuarios(cambioPagina);
			return;
		}
		this.desde = cambioPagina ? this.desde : 0;
		this.cargando = true;
		this.usuarioService.buscarUsuarios(this.termino, true, this.desde).subscribe((res:any)=> {
			this.usuarios = res.usuarios;
			this.totalRegistros = res.total;
			this.cargando = false;
		});
	}

	/**
	 * Borra a un usuario del sistema
	 * @param usuario 
	 */
	borrarUsuario(usuario: Usuario) {
		if (usuario._id === this.usuarioService.getUsuario()._id) {
			swal('No puede borrar usuario', 'No se puede borrar así mismo', 'error');
			return;
		}
		swal({
			title: '¿Esta seguro?',
			text: `Esta a punto de borrar a '${usuario.nombre}`,
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then( (borrar) => {
			if (borrar) {
				this.usuarioService.borrarUsuario(usuario._id)
				.subscribe(()=> {
					swal('Usuario Borrado', 'El usuario ha sido borrado correctamente', 'success');
					this.cargarUsuarios(true);
				});
			}
		});
	}
	
	/**
	 * Actualiza la informacion de un usuario 
	 * @param usuario 
	 */
	guardarUsuario(usuario: Usuario) {
		this.usuarioService.actualizarUsuario(usuario).subscribe();
	}

	/**
	 * Muesta el modal para editar imagen
	 */
	mostrarModal(usaurio: Usuario) {
		this.modalUploadService.mostrarModal('usuarios', usaurio._id);
	}


}
