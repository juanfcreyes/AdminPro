import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        MedicoService, 
        HospitalService,
        SubirArchivoService,
        LoginGuard,
        AdminGuard, 
        VerificaTokenGuard } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    MedicoService,
    HospitalService,
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
