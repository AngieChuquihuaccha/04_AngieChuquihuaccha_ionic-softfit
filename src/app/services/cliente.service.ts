import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ClienteDto} from "../dtos/cliente.dto";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<ClienteDto[]>(`${environment.apiUrl}/cliente`);
  }

  register(cliente: ClienteDto) {
    return this.http.post<ClienteDto>(`${environment.apiUrl}/cliente`, cliente);
  }

  findByName(nomcli: string) {
    return this.http.get<ClienteDto[]>(`${environment.apiUrl}/cliente/nomcli/${nomcli}`);
  }

}
