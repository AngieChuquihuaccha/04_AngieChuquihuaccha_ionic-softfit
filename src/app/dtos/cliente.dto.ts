export class ClienteDto {
  idcli: string = '';
  nomcli: string = '';
  apecli: string = '';
  dnicli: string = '';
  emacli: string = '';
  celcli: string = '';
  domcli: string = '';
  estcli: string = '';
  ubigeo: Ubigeo | undefined;
}

export class Ubigeo {
  id: string = '';
  departamento?: string = '';
  provincia?: string = '';
  distrito?: string = '';
}
