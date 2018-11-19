import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index'

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: []
})
export class SiderbarComponent implements OnInit {

  constructor(private siderbarService: SidebarService, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  logout() {
		this.usuarioService.logout();
	}

}
