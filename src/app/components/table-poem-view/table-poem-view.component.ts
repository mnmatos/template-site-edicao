import { Component, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';
import { JsonFormData, Edicao, Linha, Aparato, Publicacao } from '../../model/jsonText';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PoemModuleComponent } from '../poem-module/poem-module.component';
import PoemUtils from 'src/app/utils/poemUtils';
import { TextoComAparato } from 'src/app/utils/model/TextoComAparato';

@Component({
  selector: 'app-table-poem-view',
  templateUrl: './table-poem-view.component.html',
  styleUrls: ['./table-poem-view.component.css']
})
export class TablePoemViewComponent implements  OnInit,OnChanges {

  @Input() jsonFormData!: JsonFormData;
  @Input() code: any;
  sub: any;
  index = 1;

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      if (params.has('code')) {
        console.log('loading ' + params.get('code'));
        this.code = params.get('code');
      }
      if(this.code !== undefined){
        this.http
        .get('/assets/edicoes/'+this.code+".json")
        .subscribe((formData: any) => {
          this.jsonFormData = formData;
        });    
        console.log(this.jsonFormData);
      } else {
        this.jsonFormData = <JsonFormData>{};
      }
    });
  }

  getTextoComAparato(linha: Linha): Array<TextoComAparato> {
    return PoemUtils.getTextoComAparato(linha, undefined);
  }

  getAparato(linha: Linha): Array<TextoComAparato> {
    return PoemUtils.getTextoComAparato(linha, undefined).filter(item => item.aparato != undefined);
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.jsonFormData);
  }

  resetIndex(){
    this.index = 0;
  }

  getIndex(){
    return this.index
  }

  increaseIndex(){
    console.log(this.index)
    return ++this.index;
  }
  
  getTextoAparato(textoComAparato: TextoComAparato) : String{
    if(textoComAparato.aparato == undefined) return "";
    if(this.jsonFormData.publicacao.length > 1 && textoComAparato.aparato.codigo != undefined){
      var codigoBroken = textoComAparato.aparato.codigo.split(".");
      if(codigoBroken.length < 5) return textoComAparato.aparato.conteudo;

      var prefix = "";
      if(!this.isAllPublicationWithSameValForPos(4)) prefix = codigoBroken[4];
      if(!this.isAllPublicationWithSameValForPos(3)) prefix = codigoBroken[3];
      else {
        if(codigoBroken.length>6) {
          prefix = codigoBroken[4] + "." + codigoBroken[6];
        }else {
          prefix = codigoBroken[4];
        }
      }

      return  prefix + " " + textoComAparato.aparato.conteudo;
    }
    return textoComAparato.aparato.conteudo;   
  }

  isAllPublicationWithSameValForPos (pos: number): boolean {
    var lastValue = "";
    for(let publi of this.jsonFormData.publicacao){
      var broken = publi.codigo.split(".");
      if(lastValue == "") lastValue = broken[pos];
      if(lastValue != broken[pos]) return false;
    }
    return true;
  }
}


