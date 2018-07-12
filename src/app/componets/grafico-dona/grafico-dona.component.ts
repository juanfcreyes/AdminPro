import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() labels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data:number[] = [350, 450, 100];
  @Input() titulo:string = 'Titulo';
  @Input() chartType:string = 'doughnut';
  
  constructor() { }

  ngOnInit() {
  }

}
