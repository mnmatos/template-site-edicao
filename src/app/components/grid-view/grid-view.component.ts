import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import GalleryUtils from 'src/app/utils/GalleryUtils';
import FolderUtils from 'src/app/utils/FolderUtils';
import { Documento } from '../../model/documento';
import { firstValueFrom } from 'rxjs';
import { Entry } from 'src/app/utils/model/Entry';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit, OnChanges {

  public entries: Entry[] = [];
  docMap = new Map();
  documento!: Documento;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    GalleryUtils.getListOfImageEntries(this.http).then((indexData: any) => {
      console.log(indexData);
      this.entries = indexData;   
      for(var entry of this.entries){
        this.getDocument(entry);
        console.log(this.docMap);
      }   
    });  
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.entries)
  }

  async getDocument(entry: Entry) {
    await firstValueFrom(this.http
     .get<Documento>("/assets/repo/documents/"+ FolderUtils.getDocFolder(entry.codigo) + entry.codigo + ".json")).then((data) => {this.docMap.set(entry.codigo, data)})
  }

  getPathForPicture(code: string): String{
    return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + this.docMap.get(code).arquivos[0];
  }
}
