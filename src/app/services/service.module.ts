import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService,
        SidebarService,
        SharedService,
        UsuarioService, 
        SubirArchivoService } from './service.index';
import { LoginGuard } from './guards/login.guard';



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
    LoginGuard
  ],
  declarations: []
})
export class ServiceModule { }
