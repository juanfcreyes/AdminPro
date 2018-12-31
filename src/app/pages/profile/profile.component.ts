import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { ImagenService } from 'src/app/utilitario/utilitario.index';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styles: []
})
export class ProfileComponent implements OnInit {

	public imagenTemp: string;
	public usuario: Usuario;
	public imagen: File ;

	constructor(public usuarioService: UsuarioService,
		public imagenService: ImagenService) {
		this.usuario = this.usuarioService.getUsuario();
	}

	ngOnInit() {
	}

	guardar(usuario:Usuario) {
		this.usuario.nombre = usuario.nombre;
		if(!this.usuario.google) {
			this.usuario.email = usuario.email;
		}
		this.usuarioService.actualizarUsuario(this.usuario).subscribe();
		
	}

	selecionarImagen(archivo: File) {
		this.imagen = this.imagenService.selecionarImagen(archivo);
		this.imagenService.crearImagenTemporal(archivo)
		.then( res => {
			this.imagenTemp = res;
		});;
	}

	cambiarImagen() {
		this.usuarioService.cambiarImagen(this.imagen, this.usuario._id);
	}


}
