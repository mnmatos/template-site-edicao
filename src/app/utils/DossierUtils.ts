import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Entry } from './model/Entry';
import { Index } from './model/Index';

export enum Group {
  PRODUCAO_INT,
  DOC_AUDIOVISUAL,
  MEMORABILIA,
  RECEPCAO,
  VIDA,
  IMPRENSA
}

export const GroupLabel = new Map<number, string>([
  [Group.PRODUCAO_INT, 'Produção Intelectual'],
  [Group.DOC_AUDIOVISUAL, 'Documentos Audiovisuais'],
  [Group.MEMORABILIA, 'Memorabilia'],
  [Group.RECEPCAO, 'Recepção'],
  [Group.VIDA, 'Vida'],
  [Group.IMPRENSA, 'Publicações na Imprensa']
]);

export default class DossierUtils {  

  constructor() { }

  static async getListOfEntries(http: HttpClient, group: Group): Promise<Entry[]>{
    let subgroupByGroup = new Map<Group, String[]>();

    subgroupByGroup.set(Group.PRODUCAO_INT, this.getProducaoSubGroups());
    subgroupByGroup.set(Group.DOC_AUDIOVISUAL, this.getDocAudioVisualSubGroups());
    subgroupByGroup.set(Group.MEMORABILIA, this.getDocMemorabiliaSubGroups());
    subgroupByGroup.set(Group.RECEPCAO, this.getRecepcaoSubGroups());
    subgroupByGroup.set(Group.VIDA, this.getVidaSubGroups());
    subgroupByGroup.set(Group.IMPRENSA, this.getImprensaSubGroups());

    var entries: Entry[] = [];
    var index:Index;
   
    var subgroups = subgroupByGroup.get(group);
    
    if(subgroups != undefined){
      for(var subGroup of subgroups){
          await firstValueFrom(http
            .get("/assets/repo/index/subClass/"+subGroup+".json"))      
            .catch((err: HttpErrorResponse) => {
              console.error('An error occurred:', err.error);
            })       
          .then((indexData: any) => {
            if(indexData != undefined){
              index = indexData;   
              entries = entries.concat(index.documentos); 
            }          
        });
      }
    }
    
    return entries;
  }

  static getProducaoSubGroups() : String[] {
    return ["01b", "01c", "01d", "01f", "01g", "01h"];    
  }
  static getDocAudioVisualSubGroups() : String[] {
    return ["02a", "02b"];    
  }

  static getDocMemorabiliaSubGroups() : String[] {
    return ["04a", "04b"];    
  }

  static getRecepcaoSubGroups() : String[] {
    return ["05a", "05b", "05c", "05d"];    
  }

  static getVidaSubGroups() : String[] {
    return ["06a", "06b"];    
  }

  static getImprensaSubGroups() : String[] {
    return ["07a"];    
  }
}