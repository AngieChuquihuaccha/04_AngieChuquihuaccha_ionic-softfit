import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ClienteService} from "../services/cliente.service";
import {ClienteDto, Ubigeo} from "../dtos/cliente.dto";
import {UbigeoService} from "../services/ubigeo.service";

@Component({
  selector: 'app-cliente-save',
  templateUrl: './cliente-save.page.html',
  styleUrls: ['./cliente-save.page.scss'],
})
export class ClienteSavePage implements OnInit {

  clienteForm: FormGroup = new FormGroup<any>({});
  ubigeos: Ubigeo[] = [];

  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private ubigeoService: UbigeoService,
              private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.initClienteForm();
    this.listarUbigeos();
  }

  initClienteForm() {
    this.clienteForm = this.fb.group({
      idcli: [null],
      nomcli: [null],
      apecli: [null],
      dnicli: [null],
      emacli: [null],
      celcli: [null],
      dircli: [null],
      estcli: ['A'],
      ubigeo: [null]
    });
  }

  listarUbigeos() {
    this.ubigeoService.find().subscribe( res => {
      this.ubigeos = res;
    })
  }

  registerCliente() {
    const cliente: ClienteDto = this.clienteForm.value;
    cliente.idcli = '1'
    cliente.ubigeo = {
      id: this.clienteForm.controls['ubigeo'].value
    }
    this.clienteService.register(cliente).subscribe(res => {
      this.clienteForm.reset();
      this.showMessage(`Registraste a ${res.nomcli} como nuevo cliente`);
      this.router.navigate(['cliente']);
    })
  }

  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

}

