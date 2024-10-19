import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Index } from './model/Index';
import { Entry } from './model/Entry';
  
export default class GalleryUtils {  

  constructor() { }

  static async getListOfImageEntries(http: HttpClient): Promise<Entry[]>{
    var entries: Entry[] = [];
    var index:Index;
   
    await firstValueFrom(http
            .get("/assets/repo/index/subClass/02a.json"))             
          .then((indexData: any) => {
          index = indexData;   
          entries = index.documentos; 
    });
    return entries;
  }

  static isImage(fileName: String){
    if(fileName == undefined) return false;
    return (fileName.toLowerCase().endsWith("png") || fileName.toLowerCase().endsWith("jpg"));
  }
}