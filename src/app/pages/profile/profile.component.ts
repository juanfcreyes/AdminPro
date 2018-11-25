import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styles: []
})
export class ProfileComponent implements OnInit {

	private imagenTemp: string;
	private usuario: Usuario;
	private imagen: File ;

	constructor(private usuarioService: UsuarioService) {
		this.usuario = this.usuarioService.getUsuario();
	}

	ngOnInit() {
	}

	guardar(usuario:Usuario) {
		this.usuario.nombre = usuario.nombre;
		if(!this.usuario.google) {
			this.usuario.email = usuario.email;
		}
		this.usuarioService.actualizarUsuario(this.usuario)
		.subscribe(() => {
			swal('Usuario actualizado', usuario.nombre, 'success');
		})
		
	}

	selecionarImagen(archivo: File) {
		if(!archivo) {
			this.imagen = undefined;
			return;
		}

		if(archivo.type.indexOf('image') < 0) {
			this.imagen = undefined;
			swal('Solo Imagenes', 'El archivo seleccioando no es una imagen', 'error');
			return;
		}
		this.imagen = archivo;
		const reader = new FileReader();
		reader.readAsDataURL(archivo);
		reader.onload = () => {
			this.imagenTemp = reader.result.toString();
		};
	}

	cambiarImagen() {
		this.usuarioService.cambiarImagen(this.imagen, this.usuario._id);
	}


}
