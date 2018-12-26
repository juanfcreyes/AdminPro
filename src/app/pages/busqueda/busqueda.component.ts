import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styles: []
})
export class BusquedaComponent implements OnInit {

	hospitales: Hospital[] = [];
	usuarios: Usuario[] = [];
	medicos: Medico[] = [];
	

	constructor(private activatedRoute: ActivatedRoute,
		private http: HttpClient, private router: Router) {
		this.activatedRoute.params
			.subscribe((params) => {
				const termino = params['termino']
				this.buscar(termino);
			});
	}

	ngOnInit() {
	}

	buscar(termino: string) {
		let url = `${URL_SERVICIOS}/busqueda/todo/${termino}`
		this.http.get(url).subscribe((res: any) => {
			this.hospitales = res.hospitales;
			this.usuarios = res.usuarios;
			this.medicos = res.medicos;
		});
	}

	navigateTo(url: string) {
		this.router.navigate([url]);
	}

}
