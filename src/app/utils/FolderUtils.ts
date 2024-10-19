import { JsonFormData } from "../model/jsonText";
import { HttpClient } from '@angular/common/http';

  
export default class FolderUtils {  

  constructor(private http: HttpClient) { }

  static getDocFolder(codigo: String): String {
    var path = "";
    var brokenCode = codigo.split(".");
    if (brokenCode.length<2) return "";
    for (let i = 0; i < brokenCode.length; i++){
      path += brokenCode[i]+"/";
    }
    return path;
  }
}