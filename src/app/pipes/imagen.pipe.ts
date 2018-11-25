import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
	name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

	transform(img: string, tipo: string = 'usuarios'): any {
		const url = URL_SERVICIOS + '/imagenes';

		if (!img) {
			return url + 'noImage';
		}

		if (img.indexOf('https') >=0 ) {
			return img;
		}

		return `${url}/${tipo}/${img}`;
	}

}
