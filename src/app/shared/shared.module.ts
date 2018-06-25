import { NgModule } from '@angular/core';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    NoPageFoundComponent,
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent
  ],
  exports: [
    NoPageFoundComponent,
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
