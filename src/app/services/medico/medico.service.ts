import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
	providedIn: 'root'
})
export class MedicoService {

	private urlHospital = `${URL_SERVICIOS}/medico`

	constructor(private http: HttpClient,
		private usuarioService: UsuarioService) { }

	private getToken() {
		return this.usuarioService.getToken();
	}

	cargaMedicos() {
		return this.http.get(this.urlHospital);
	}

	buscarMedicos(termino: string) {
		const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
		return this.http.get(url);
	}

	cargarMedico(id: string) {
		const url = `${this.urlHospital}/${id}`;
		return this.http.get(url); 
	}

	borrarMedico(id: string) {
		const url = `${this.urlHospital}/${id}?token=${this.getToken()}`;
		return this.http.delete(url);
	}

	guardarMedico(medico: Medico) {
		const url = `${this.urlHospital}?token=${this.getToken()}`;
		return this.http.post(url, medico);
	}

	actualizarMedico(medico: Medico) {
		const url = `${this.urlHospital}/${medico._id}?token=${this.getToken()}`;
		return this.http.put(url, medico);
	}
}
