import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PessoaService } from './services/pessoa/pessoa.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  pessoaForm: any;
  paises: any;
  estados: any;
  pessoas:any;

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public pessoaService: PessoaService
  ) {
  }
  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nomePessoa: ['', Validators.required],
      cpf: ['', Validators.required],
      idade: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],

    })
    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );

    this.pessoaService.getAllPessoa().subscribe(resp => {
      this.pessoas = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );

    this.pessoaForm.get('pais').valueChanges.subscribe((value: { id: any; })=> {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;

      },

        error => { console.error(error) }
      );
    });
  }

  guardar(): void {
    this.pessoaService.create(this.pessoaForm.value).subscribe(resp => {
    this.pessoaForm.reset();
    this.pessoas.push(resp);
    },
      error => { console.error(error) }

    )
  }


}


