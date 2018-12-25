import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

declare var swal:any;

@Component({
	selector: 'app-medicos',
	templateUrl: './medicos.component.html',
	styles: []
})
export class MedicosComponent implements OnInit {

	medicos: Medico[] = [];
	totalRegistros: number = 0;
	termino: string = '';
	cargando: boolean = false;

	constructor(private medicoService: MedicoService) { }

	ngOnInit() {
		this.cargarMedicos();
	}

	cargarMedicos() {
		this.cargando = true
		this.medicoService.cargaMedicos()
		.subscribe((res: any) => {
			this.totalRegistros = res.total;
			this.medicos = res.medicos;
			this.cargando = false;
		})
	}

	buscarMedico() {
		if (this.termino.length === 0) {
			this.cargarMedicos();
			return;
		}
		this.cargando = true
		this.medicoService.buscarMedicos(this.termino)
		.subscribe((res: any) => {
			this.totalRegistros = res.total;
			this.medicos = res.medicos;
			this.cargando = false;
		})
	}

	borrarMedico(medico: Medico) {
		swal({
			title: '¿Esta seguro?',
			text: `Esta a punto de borrar a '${medico.nombre}`,
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((borrar) => {
			if (borrar) {
				this.medicoService.borrarMedico(medico._id)
				.subscribe( () => {
					swal('Usuario Borrado', 'El usuario ha sido borrado correctamente', 'success');
					this.buscarMedico();
				});
			}
		});
	}
}
