import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/utilitario/utilitario.index';

declare var swal;

@Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styles: []
})

export class HospitalesComponent implements OnInit {

    hospitales: Hospital[] = [];
    totalRegistros: number = 0;
    cargando: Boolean = false
    termino: string = '';

    constructor(public hospitalService: HospitalService, 
        public modalUploadService: ModalUploadService) { }

    ngOnInit() {
        this.cargarHospitales();
        this.modalUploadService.notificacion.subscribe(() => {
			this.buscarHospitales();
		});
    }

    cargarHospitales() {
        this.cargando = true;
        this.hospitalService.cargarHospitales()
            .subscribe((res: any) => {
                console.log(res)
                this.hospitales = res.hospitales;
                this.totalRegistros = res.total;
                this.cargando = false;
            })
    }

    crearHospital() {
        swal("Ingrese el nombre del nuevo hospital aquí:", {
            content: "input",
            buttons: ["Cancelar", "Crear "],
        })
        .then((nombre) => {
            if (nombre && nombre.length >= 4) {
                this.hospitalService.crearHospital(nombre)
                    .subscribe(() => {
                        swal('Hospital Creado', 'El hospital ha sido actualizado correctamente', 'success');
                        this.cargarHospitales();
                    });
            }
        });
    }

    buscarHospitales() {
        if (this.termino.length === 0) {
            this.cargarHospitales();
            return;
        }

        this.cargando = true;
        this.hospitalService.buscarHospital(this.termino).subscribe((res: any) => {
            console.log(res)
            this.hospitales = res.hospitales; 
            this.totalRegistros = res.total;
            this.cargando = false;
        });
    }



    guardarHospital(hospital: Hospital) {
        this.hospitalService.actualizarHospital(hospital)
            .subscribe(() => {
                swal('Hospital Actualizado', 'El nombre del hospital ha sido actualizado correctamente', 'success');
            });
    }

    borrarHospital(hospital: Hospital) {
        swal({
			title: '¿Esta seguro?',
			text: `Esta a punto de borrar al hospital ${hospital.nombre}`,
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then( (borrar) => {
			if (borrar) {
				this.hospitalService.borrarHosptal(hospital._id)
                .subscribe(() => {
                    swal('Hospital Borrado', 'El  hospital ha sido borrado correctamente', 'success');
                    this.cargarHospitales();
                });
			}
		});
    }

    mostrarModal(hospital: Hospital) {
        this.modalUploadService.mostrarModal('hospitales', hospital._id);
    }
}
