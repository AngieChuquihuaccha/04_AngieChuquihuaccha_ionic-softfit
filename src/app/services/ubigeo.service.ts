import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Ubigeo } from '../dtos/cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http: HttpClient) { }

  find() {
    return this.http.get<Ubigeo[]>(`${environment.apiUrl}/ubigeo`);
  }
}
