import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService, ImagenService } from './utilitario.index';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [
		ModalUploadService,
		ImagenService
	],
	declarations: []
})
export class UtilitarioModule { }
