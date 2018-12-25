import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService, ImagenService } from 'src/app/utilitario/utilitario.index';

@Component({
	selector: 'app-modal-upload',
	templateUrl: './modal-upload.component.html',
	styles: []
})
export class ModalUploadComponent implements OnInit {

	imagenTemp: string;
	imagen: File;

	constructor(private subirArchivoService: SubirArchivoService,
		private modalUploadService: ModalUploadService, 
		private imagenService: ImagenService) { }

	ngOnInit() {
		
	}

	/**
	 * Funcion para cerrar el modal
	 */
	cerrarModal() {
		this.imagen = undefined;
		this.imagenTemp = undefined;
		this.modalUploadService.ocultarModal();
		(<HTMLInputElement>document.getElementById('imagen')).value = '';
	}

	/**
	 * Funcion para seleccionar el modal
	 * @param archivo 
	 */
	selecionarImagen(archivo: File) {
		this.imagen = this.imagenService.selecionarImagen(archivo);
		this.imagenService.crearImagenTemporal(archivo)
		.then( res => {
			this.imagenTemp = res;
		});;
	}

	subirImagen() {
		this.subirArchivoService.subirArchivo(this.imagen, 
			this.modalUploadService.tipo, 
			this.modalUploadService.id).then((res) => {
				this.modalUploadService.notificacion.emit(res);
				this.cerrarModal();
			})
	}
}
