import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() { 
    this.subscripcion = this.regresarObservable().subscribe((numero) => {
      console.log('Subs', numero);
    }, (error) => {
      console.log('Subs', error);
    },() => {
      console.log('El observador termino');
    }) 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  regresarObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        }
        observer.next(salida);
        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } 
      
      }, 1000);
    }).pipe(map(resp =>  resp.valor)
    );
  }

}
