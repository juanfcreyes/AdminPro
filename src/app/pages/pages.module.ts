import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../componets/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../componets/grafico-dona/grafico-dona.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficasComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
