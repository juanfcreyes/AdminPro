import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/utilitario/utilitario.index';

@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styles: []
})
export class MedicoComponent implements OnInit {

	hospital: Hospital = new Hospital('');
	hospitales: Hospital[] = [];
	medico: Medico = new Medico('','','','','');
	

	constructor(private hospitalService: HospitalService, 
		private medicoService: MedicoService, 
		private router:Router, activateddRoute: ActivatedRoute, 
		private modalUploadService: ModalUploadService) { 

			activateddRoute.params.subscribe( (params: any) => {
				const id = params['id'];
				if (id !== 'nuevo') {
					this.cargarMedico(id)
				}
			});

		}

	ngOnInit() {
		this.modalUploadService.notificacion
		.subscribe((res: any) => {
			this.medico.img = res.img;
		})
		this.hospitalService.cargarHospitales()
		.subscribe((res:any) => {
			this.hospitales = res.hospitales
		});
	}

	cargarMedico(id: string) {
		this.medicoService.cargarMedico(id)
		.subscribe((res:any) => {
			const {medico} = res
			this.medico = medico
			this.medico.hospital = medico.hospital._id;
			this.cambioHospital(this.medico.hospital);
		});
	}

	guardarMedico(form: NgForm) {
		if(form.invalid) {
			return;
		}

		if (this.medico._id) {
			this.medicoService.actualizarMedico(this.medico).subscribe(() => {
				swal('Medico actualizado', this.medico.nombre , 'success')
			});
		} else {
			this.medicoService.guardarMedico(this.medico)
			.subscribe( (res: any) => {
				swal('Medico creado', this.medico.nombre , 'success')
				this.medico._id = res.medico._id
				this.router.navigate(['/medico', res.medico._id]);
			});
		}

		
	}

	cambioHospital(id: string) {
		this.hospitalService.obtenerHospital(id)
		.subscribe((res: any) => {
			this.hospital = res.hospital;
		});
	}

	cambiarFoto() {
		this.modalUploadService.mostrarModal('medicos', this.medico._id);
	}

}
