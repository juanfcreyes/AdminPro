import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ImagenService {

	constructor() { }

	/**
	 * Funcion para seleccionar imgen
	 * @param archivo 
	 */
	selecionarImagen(archivo: File) : File {
		if (!archivo) {
			return undefined;
		}
		if (archivo.type.indexOf('image') < 0) {
			swal('Solo Imagenes', 'El archivo seleccioando no es una imagen', 'error');
			return undefined;
		}
		return archivo;
		
	}

	/**
	 * Funcion que genera una url temp de una imagen
	 * @param archivo 
	 */
	crearImagenTemporal(archivo: File) : Promise<string> {
		const reader = new FileReader();
		reader.readAsDataURL(archivo);
		return new Promise((resolve, reject) => {
			reader.onload = () => {
				resolve(reader.result.toString())
			};
		});
	}
}
