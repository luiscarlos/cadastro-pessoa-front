import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private API_SERVER = "http://localhost:8080/pessoas/";

  constructor( private httpClient: HttpClient) { }

  public getAllPessoa():Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public create(pessoa:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,pessoa);
  }
}
