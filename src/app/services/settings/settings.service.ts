import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private AJUSTES: string = 'ajustes';
  private ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }
  
  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  getAjustes() {
    return this.ajustes;
  }
  
  setAjustes(tema: string, url: string) {
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
  }
  
  guardarAjustes() {
    localStorage.setItem(this.AJUSTES, JSON.stringify(this.ajustes));
  }
  
  cargarAjustes() {
    if(localStorage.getItem(this.AJUSTES)) {
      this.ajustes = JSON.parse(localStorage.getItem(this.AJUSTES))
    } 
    this.aplicarTema(this.ajustes.tema);
  }
  
  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`; this._document.getElementById('tema').setAttribute('href',url);
    this.setAjustes(tema, url);
    this.guardarAjustes();
  }
  
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
