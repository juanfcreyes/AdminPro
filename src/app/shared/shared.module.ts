import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from '../componets/modal-upload/modal-upload.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    NoPageFoundComponent,
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    ModalUploadComponent
  ],
  exports: [
    NoPageFoundComponent,
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    ModalUploadComponent
  ]
})
export class SharedModule { }
