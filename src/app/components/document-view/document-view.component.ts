import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Documento } from 'src/app/model/documento';
import { Entity } from 'src/app/model/entity';
import FolderUtils from 'src/app/utils/FolderUtils';
import {Location} from '@angular/common';
import GalleryUtils from 'src/app/utils/GalleryUtils';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {

  document!: Documento;
  autores: Entity[] = [];

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      var code = params.get('code');
      if (code != undefined) {        
        console.log('loading ' + code);
        this.getDocument(code);
      }
    });   
  }

  async getDocument(code: String) {
    await firstValueFrom(this.http
     .get<Documento>("/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + code + ".json")).then((data) => { 
      this.document = data;
      if(data.autores != undefined && data.autores.length > 0) {
        for (var autor of data.autores){
          this.getAutor(autor);
        }        
      }
    })
  }

  async getAutor(code: String) {
    await firstValueFrom(this.http
     .get<Entity>("/assets/repo/entities/" + code + ".json")).then((data) => { 
      this.autores.push(data);
    })
  }  

  getAutorNames() {
    if (this.autores!=undefined && this.autores.length == 0) return "N/A";
    var autoresText = "";
    for (var autor of this.autores){
      if(autoresText !== "") autoresText += ", ";
      autoresText += autor.name;
    }
    return autoresText;
  }

  getPathForFile(code: string): string{
    return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + this.document.arquivos[0];
  }

  getPathForFileByName(code: string, name: string): string{
    return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + name;
  }

  getArquivosForCode() : string[]{
    this.document.arquivos = this.document.arquivos.filter(item => !item.endsWith("mp3"));
    return this.document.arquivos;
  }

  backClicked() {
    this._location.back();
  }

  downloadFile(code: string, name: string){
    window.location.href=this.getPathForFileByName(code, name);
  }

  isImage(){
    if(document == undefined) return false;
    return GalleryUtils.isImage(this.document.arquivos[0]);
  }

  getClasseProducao(){
    var classeMap: Map<String,string> = new Map;
    classeMap.set("producao_intelectual", "01. Produção Intelectual");
    classeMap.set("documentos_audiovisuais", "02. Documentos Audiovisuais");
    classeMap.set("esbocos_e_notas", "03. Esboços e notas");
    classeMap.set("memorabilia", "04. Memorabilia");
    classeMap.set("recepcao", "05. Recepção");
    classeMap.set("vida","06. Vida");
    classeMap.set("publicacoes_imprensa", "07. Publicações na imprensa");

    return classeMap.get(this.document.classe_producao);
  }
}
