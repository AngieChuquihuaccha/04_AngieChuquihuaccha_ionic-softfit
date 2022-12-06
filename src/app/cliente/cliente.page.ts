import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClienteService} from "../services/cliente.service";
import {ClienteDto} from "../dtos/cliente.dto";
import {AuthService} from "../services/auth.service";
import {debounceTime, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  cliente: ClienteDto[] = [];
  nombreUsuario = '';
  searchControl: FormControl = new FormControl<any>('');

  constructor(private clienteService: ClienteService,
              private authService: AuthService,
              private router: Router) {
    this.nombreUsuario = this.authService.getSession().nomcli;
}

  ngOnInit() {
    this.getCliente();
    this.initSearch();
  }

  getCliente(){
    this.clienteService.findAll().subscribe(res => {
      this.cliente = res;
    })
  }

  logout() {
    this.authService.deleteSession();
    this.router.navigate(['login']).then();
  }

  nuevoCliente() {
    this.router.navigate(['cliente-save']).then();
  }

  initSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap(search => {
          if (search) {
            return this.clienteService.findByName(search);
          }
          return this.clienteService.findAll();
        })
      ).subscribe(res => {
        this.cliente = res;
        console.log('Respuesta:', res);
    })
  }

}
