import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress:ElementRef;
  @Input() leyenda: string = 'Leyenda'
  @Input() progreso: number = 50;
  
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
  
  onChanges(nuevoValor:number) {
    if(/^([0-9])*$/.test(nuevoValor.toString())) {
      this.progreso = nuevoValor;
      if(nuevoValor < 0) {
        this.progreso = 0;
      }
      if(nuevoValor > 100) {
        this.progreso = 100;
      }   
    } else {
      this.progreso = 0;
    }
    
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor:number) {
    console.log(this.progreso, valor)
    if ( Number(this.progreso) + valor > 100 || Number(this.progreso) + valor < 0 ) {
      return;
    }
    this.progreso = Number(this.progreso) + valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
