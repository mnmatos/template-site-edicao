import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges, Input, ViewChild, HostListener } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Documento } from 'src/app/model/documento';
import DossierUtils, {Group, GroupLabel} from 'src/app/utils/DossierUtils';
import FolderUtils from 'src/app/utils/FolderUtils';
import { Entry } from 'src/app/utils/model/Entry';
import { Router, ActivatedRoute } from '@angular/router';
import GalleryUtils from 'src/app/utils/GalleryUtils';

@Component({
  selector: 'app-dossier-view',
  templateUrl: './dossier-view.component.html',
  styleUrls: ['./dossier-view.component.css']
})
export class DossierViewComponent implements OnInit {

  public entries: Entry[] = [];
  docMap = new Map();
  documento!: Documento;
  @Input() type: any;
  sub: any;

  @ViewChild('theContainer') gridView: any;
  columnNum = 3; //initial count

  group?: Group;
  grupProducao = Group.PRODUCAO_INT;

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute) { }
  
  ngOnInit(): void {

    var mapGroup: Map<String, Group> = new Map;
    mapGroup.set("producao", Group.PRODUCAO_INT);
    mapGroup.set("audiovisual", Group.DOC_AUDIOVISUAL);
    mapGroup.set("memorabilia", Group.MEMORABILIA);
    mapGroup.set("recepcao", Group.RECEPCAO);
    mapGroup.set("vida", Group.VIDA);
    mapGroup.set("imprensa", Group.IMPRENSA);    
    
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      if (params.has('type')) {
        console.log('loading ' + params.get('type'));
        this.type = params.get('type');
      }
      if(this.type !== undefined && mapGroup.has(this.type)){
        this.group = mapGroup.get(this.type);
        if(this.group != undefined){
          DossierUtils.getListOfEntries(this.http, this.group).then((indexData: any) => {
            console.log(indexData);
            this.entries = indexData;   
            for(var entry of this.entries){
              this.getDocument(entry);
            }   
          }); 
        }
      } else {
        
      }
    });

     
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.entries)
  }

  async getDocument(entry: Entry) {
    await firstValueFrom(this.http
     .get<Documento>("/assets/repo/documents/"+ FolderUtils.getDocFolder(entry.codigo) + entry.codigo + ".json")).then((data) => {
      if(data.arquivos != undefined && data.arquivos.length >0) {
        this.docMap.set(entry.codigo, data)
        console.log(this.docMap);
      }      
    })
  }

  getPathForFileByCode(code: string): string{
    return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + this.docMap.get(code).arquivos[0];
  }

  getPathForFileByName(code: string, name: String): string{
    return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + name;
  }

  getArquivosForCode(code: string) : string[]{
    return this.docMap.get(code).arquivos;
  }

  isImage(code: string){
    var fileName: String = this.docMap.get(code).arquivos[0];
    return GalleryUtils.isImage(fileName);
  }

  downloadFile(code: string, name: string){
    window.location.href=this.getPathForFileByName(code, name);
  }

  //calculating upon loading 
  ngAfterViewInit() {
    this.setColNum();
  }

  //recalculating upon browser window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setColNum();
  }

  setColNum(){
    // console.log(div);
    if(this.gridView.nativeElement.offsetWidth < 400){
      this.columnNum = 1;
    }
    if(this.gridView.nativeElement.offsetWidth >= 400 
        && this.gridView.nativeElement.offsetWidth < 800){
      this.columnNum = 2;
    }
    if(this.gridView.nativeElement.offsetWidth >= 800){
      this.columnNum = 3;
    }
  }

  getPathDocImage(): string {
      return "assets/images/icons/documento.jpg";
  }

  getGrouDesc(): string | undefined {
    if(this.group != undefined && GroupLabel.has(this.group)) return GroupLabel.get(this.group);
    else return "";
  }
}
