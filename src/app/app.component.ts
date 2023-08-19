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
export class AppComponent  implements OnInit{
 
  pessoaForm: any;
  paises: any;
  estado: any;

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public pessoaService: PessoaService
    ){
  }
  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nomePessoa:['', Validators.required],
      cpf :   ['', Validators.required],
      idade : ['', Validators.required],
      estado :['', Validators.required],
      pais :  ['', Validators.required],
      
  })
  this.paisesService.getAllPaises().subscribe(resp =>{
    this.paises = resp;
    console.log(resp);
  },


  error=>{console.error(error)}
   );
  }

  guardar():void{

  }
  carregarEstadosPorPaisesId(event:any){
    this.estadosService.getAllEstadosByPais(event.target.value).subscribe(resp =>{
      this.estado = resp;
      
    },

    error=>{console.error(error)}
    );

  }
  
}


