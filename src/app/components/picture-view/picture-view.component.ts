import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FolderUtils from 'src/app/utils/FolderUtils';
import { Documento } from '../../model/documento';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-picture-view',
  templateUrl: './picture-view.component.html',
  styleUrls: ['./picture-view.component.css']
})
export class PictureViewComponent implements OnInit {

  document!: Documento;

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
     .get<Documento>("/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + code + ".json")).then((data) => { this.document = data})
  }

  getPathForPicture(code: string): String{
    return "/assets/repo/documents/"+ FolderUtils.getDocFolder(code) + this.document.arquivos[0];
  }

  backClicked() {
    this._location.back();
  }
}
