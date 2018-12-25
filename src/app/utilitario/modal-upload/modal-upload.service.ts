import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ModalUploadService {

	public id: string;
	public tipo: string;
	public img: string;
	public oculto: string = 'oculto';
	public notificacion = new EventEmitter<any>();

	constructor() {	}

	public ocultarModal() {
		this.oculto = 'oculto';
		this.tipo = undefined;
		this.id = undefined;
	}

	public mostrarModal(tipo: string, id: string) {
		this.oculto = '';
		this.id = id;
		this.tipo = tipo;
	}
}
