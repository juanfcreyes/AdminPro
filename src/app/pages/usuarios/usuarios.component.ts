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

	private usuarios: Usuario[] = [];
	private desde: number = 0;
	private totalRegistros: number = 0;
	private cargando: Boolean = true;

	constructor(private usuarioService: UsuarioService,
		private modalUploadService: ModalUploadService) { }

	ngOnInit() {
		this.cargarUsuarios();
		this.modalUploadService.notificacion.subscribe(() => {
			this.cargarUsuarios();
		});
	}

	/**
	 * Funcion para cargar los usuarios por defecto
	 */
	private cargarUsuarios() {
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
	private cambiarDesde(valor: number) {
		const desde = this.desde + valor;
		if (desde >= this.totalRegistros || desde < 0) {
			return;
		}
		this.desde = desde;
		this.cargarUsuarios();

	}
	
	/**
	 * Busca usuario por un termino de busqueda
	 * @param termino 
	 */
	private buscarUsuarios(termino: string) {
		if(termino.length <= 0) {
			this.cargarUsuarios();
			return;
		}
		this.cargando = true;
		this.usuarioService.buscarUsuarios(termino).subscribe((res:any)=> {
			this.usuarios = res.usuarios;
			this.cargando = false;
		});
	}

	/**
	 * Borra a un usuario del sistema
	 * @param usuario 
	 */
	private borrarUsuario(usuario: Usuario) {
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
					this.cargarUsuarios();
				});
			}
		});
	}
	
	/**
	 * Actualiza la informacion de un usuario 
	 * @param usuario 
	 */
	private guardarUsuario(usuario: Usuario) {
		this.usuarioService.actualizarUsuario(usuario).subscribe();
	}

	/**
	 * Muesta el modal para editar imagen
	 */
	private mostrarModal(usaurio: Usuario) {
		this.modalUploadService.mostrarModal('usuarios', usaurio._id);
	}


}