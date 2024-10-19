import { Component, OnChanges, SimpleChanges, Input, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JsonFormData, Edicao, Linha, Aparato } from '../../model/jsonText';
import { Documento } from '../../model/documento';
import { Track } from 'ngx-audio-player';
import FolderUtils from 'src/app/utils/FolderUtils';
import { firstValueFrom, Observable, of, map, catchError} from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import PoemUtils from 'src/app/utils/poemUtils';
import { TextoComAparato, TextoComAparatoPerIndex } from 'src/app/utils/model/TextoComAparato';

@Component({
  selector: 'app-poem-module',
  templateUrl: './poem-module.component.html',
  styleUrls: ['./poem-module.component.css']
})
export class PoemModuleComponent implements OnChanges {

  @Input() jsonFormData!: JsonFormData;
  documentoMap: Map<String, Documento> = new Map;
  facsimileVisivel: boolean = false;
  aparatoNotaVisivel: boolean = false;
  videoVisivel: boolean = false;
  isPlaying: boolean = false;
  bigFont = false;
  lineCount = 0;

  versionPubli = 0;

  selectedAudio: String = "";
  selectedVideo: string = "";

  msaapDisplayTitle = false;
  msaapDisplayPlayList = true;
  pageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

  panelOpenState: boolean = false;

  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'Link to Audio One URL',
      artist: 'Audio One Artist'
    }
  ];

  constructor(private http: HttpClient, private router: Router) {     
  }

  goToPrintPage(){
    this.router.navigate(['/print/table/'+this.jsonFormData.codigo]);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDocument();
    if(this.hasAudio() == true){
      console.log("Trying to find audio for"+this.jsonFormData.codigo);
      this.fileExists('assets/audio/' + this.jsonFormData.codigo + '_poema.m4a').subscribe(
        event => {
          if(event) {
            console.log("Found audio for"+this.jsonFormData.codigo);          
            this.loadPlayer();
          } else {
            console.log("Not found audio for"+this.jsonFormData.codigo);
          }
        })   
      }
  } 

  loadPlayer(){
    this.msaapPlaylist = [
      {
        title: this.jsonFormData.titulo + " POEMA",
        link: 'assets/audio/' + this.jsonFormData.codigo + '_poema.m4a'
      },
      {
        title: this.jsonFormData.titulo+" APARATO",
        link: 'assets/audio/' + this.jsonFormData.codigo + '_aparato.m4a'
      }
    ];
  }

  fileExists(url: string): Observable<boolean> {    
    return this.http.head(url).pipe(map((response) => true), catchError((error) => of(false)));
  }

  async getDocument() {
    for (let publicacao of this.jsonFormData.publicacao){
      await firstValueFrom(this.http
      .get<Documento>("/assets/repo/documents/"+ FolderUtils.getDocFolder(publicacao.codigo) + publicacao.codigo + ".json")).then((data) => {this.documentoMap.set(publicacao.codigo, data);})
    }
  }

  getPathForFacsimile(code: String): String{
    var document = this.documentoMap.get(code);
    if(document != undefined){    
      return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + document.arquivos[document.arquivos.length-1];
    } else return "assets\\images\\icons\\documento.jpg";
  }

  toogleFacsimile() {
    this.facsimileVisivel = !this.facsimileVisivel;
  }

  toogleAparatoNota() {
    this.aparatoNotaVisivel = !this.aparatoNotaVisivel;
  }

  toogleVideo(videoPath: string) {  
    if(this.videoVisivel){
      if(this.selectedVideo != videoPath){
        this.selectedVideo = videoPath;        
        this.videoVisivel = false;
        setTimeout(() => this.videoVisivel = true, 100);
      } else {
        this.videoVisivel = false;
      }     
    } else {   
      this.selectedVideo = videoPath;  
      this.videoVisivel = true;
    }      
  }

  hasAudio(): boolean{
    if(this.jsonFormData == undefined) return false;
    return this.jsonFormData.edicao[0].video_libras != undefined; //todo: change logic
  }

  getSelectedVideo() : string{
    return this.selectedVideo;
  }

  toogleAparatoVideo() {
    this.videoVisivel = !this.videoVisivel;
  }

  setBigFont(state: boolean): void {
    this.bigFont = state;
  }

  resetLineCount(): void {
    this.lineCount = 0;
  }

  incrementLineCount(enumeracao_por_linha: number): string {
    this.lineCount++;
    if (this.lineCount % enumeracao_por_linha === 0) return this.lineCount.toString();
    else return "";
  }

  getTextoCritico(linha: Linha, codigoPubli: string): string {
    if(linha.texto_critico === undefined) return "";
    else if(linha.aparato !== undefined){
      var text = PoemUtils.getTextoComAparatoPerIndex(linha, codigoPubli);
      
      var finalHtml: string = "";
      var lastAparato: string = "";

      var lastIndex = -1;
      text.forEach(textoComAparatoPerIndex => {
        if(textoComAparatoPerIndex.index > lastIndex){
          if(textoComAparatoPerIndex.hasAparato){   
            var longerTextoComAparato: TextoComAparato = textoComAparatoPerIndex.textoComAparatos[0];   

            textoComAparatoPerIndex.textoComAparatos.forEach(textoComAparato => {
              if(longerTextoComAparato.end < textoComAparato.end){
                longerTextoComAparato = textoComAparato;
              }
            });

            if (longerTextoComAparato.aparato !=undefined){
              /*var link = this.getLinkAparato(longerTextoComAparato.aparato)
              var linkHtml = "";
              if(link != undefined && link != ""){
                linkHtml = "href='"+link+"'";
                console.log(linkHtml);
              }*/
              finalHtml += "<a "+(this.getlinkClass(longerTextoComAparato.aparato))+" title='"+longerTextoComAparato.aparato.conteudo+"'> " + longerTextoComAparato.conteudo + " </a> ";
              
            }
            lastIndex = longerTextoComAparato.end;
          } else {
            finalHtml += textoComAparatoPerIndex.textoComAparatos[0].conteudo + " ";
            lastIndex = textoComAparatoPerIndex.index;
          }
        }
      });
      // TODO: Melhorar segurança: https://stackoverflow.com/questions/48449708/angular-5-how-to-dynamically-add-links-to-strings-containing-a-certain-tag-lik
      return finalHtml;
    } else {
      return linha.texto_critico;
    }
  }

  getlinkClass(aparato: Aparato) : String {
    if (aparato.tipo.startsWith("nota_referencia")) return 'class="aparato_nota"';
    else return "";
  }

  getLinkAparato(aparato: Aparato): String {    
    if (aparato.referencia != undefined && aparato.referencia.codigo != undefined) {
      if(aparato.tipo == "nota_referencia") return "/document/" + aparato.referencia.codigo;
      else if(aparato.tipo == "nota_referencia_poema") return "/poema/" + aparato.referencia.codigo;      
      else return "";
    } else if (aparato.referencia != undefined && aparato.referencia.link != undefined && aparato.tipo == "nota_referencia_link") {
      return aparato.referencia.link;
    }
    else return "";
  }

  getTextoComAparato(linha: Linha, codigoPubli: string): Array<TextoComAparato> {
    return PoemUtils.getTextoComAparato(linha, codigoPubli);
  }

  hasAparatoNota(codigo: string): boolean{
    var result : boolean = false;
    this.jsonFormData.edicao[this.versionPubli].linhas.forEach( linha => {
      if(linha.aparato != undefined){
        linha.aparato.forEach(aparato => { if(aparato.codigo == codigo && aparato.tipo.startsWith("nota_referencia")) result = true; });
      }      
    });
    return result;
  }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string) {
    if(url.includes("https://www.youtube.com/embed/")) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    } return null;
  }
} 

 

