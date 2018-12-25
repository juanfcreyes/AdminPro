import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
	providedIn: 'root'
})
export class HospitalService {

	private urlHospital = `${URL_SERVICIOS}/hospital`

	constructor(private router:Router, private http: HttpClient,
		private usuarioService: UsuarioService) { }

	private getToken() {
		return this.usuarioService.getToken();
	}

	public cargarHospitales(desde: number = 0) {	
		let url = `${this.urlHospital}?desde=${desde}`
		return this.http.get(url);
	}

	public obtenerHospital(id: string) { 
		let url = `${this.urlHospital}/${id}?token=${this.getToken()}`;
		return this.http.get(url);
	}

	public borrarHosptal(id: string) {
		let url = `${this.urlHospital}/${id}?token=${this.getToken()}`;
		return this.http.delete(url);
	}

	public crearHospital(nombre: string){
		let url = `${this.urlHospital}?token=${this.getToken()}`;
		return this.http.post(url, {nombre});
	}

	public buscarHospital(termino:string) {
		let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
		return this.http.get(url);
	}

	public actualizarHospital(hospital: Hospital) {
		let url = `${this.urlHospital}/${hospital._id}?token=${this.getToken()}`;
		return this.http.put(url, hospital);

	}

}
