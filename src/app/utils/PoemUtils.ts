import { Aparato, JsonFormData, Linha } from "../model/jsonText";
import { HttpClient } from '@angular/common/http';
import { TextoComAparato, TextoComAparatoPerIndex } from "./model/TextoComAparato";
import { Entry } from "./model/Entry";
  
export default class PoemUtils {  

  constructor(private http: HttpClient) { }

  static getResumedList(): Entry[] {
    var list = [
      {name : "Aos teus olhos", codigo: "AAD.00.ATO.41"}
    ];

      //list.sort((a, b) => a.name.localeCompare(b.name))
      return list;
  }

  static getListEdicao(http: HttpClient, listaEdicoes: Entry[]): JsonFormData[]{
    var formDataArray: JsonFormData[] = [];    
    for(let i=0; i<listaEdicoes.length; i++){
       http
       .get('/assets/edicoes/'+listaEdicoes[i].codigo+".json")
      .subscribe((formData: any) => {
        formDataArray.push(formData);        
        if(formData.publicacao[0].data == undefined) console.log("nullll date >>>>>>>>>>>>>>" +formData.titulo);
        formDataArray.sort((a: JsonFormData, b: JsonFormData) => PoemUtils.compareDate(a.publicacao[0].data, b.publicacao[0].data));
      });
    }
    return formDataArray;
  }

  static compareDate(firstDate: string, secondDate: string): number {
    if(firstDate.startsWith("[") && !secondDate.startsWith("[")) return 1;
    else if (!firstDate.startsWith("[") && secondDate.startsWith("[")) return -1;
    else if (firstDate.startsWith("[") && secondDate.startsWith("[")){
      return firstDate.localeCompare(secondDate);
    } else  {
      if(firstDate.length<4) return -1;
      else if (secondDate.length<4) return 1;
      else return firstDate.substring(firstDate.length-4).localeCompare(secondDate.substring(secondDate.length-4));
    }
  }

  static getDocFolder(codigo: String): String {
    var path = "";
    var brokenCode = codigo.split(".");
    if (brokenCode.length<2) return "";
    for (let i = 0; i < brokenCode.length; i++){
      path += brokenCode[i]+"/";
    }
    return path;
  }  
  
  static getTextoComAparatoPerIndex(linha: Linha, codigoPubli?: string): Array<TextoComAparatoPerIndex> {
    if(linha.aparato === undefined || linha.texto_critico === undefined) return [];

    var textObJArray: Array<TextoComAparatoPerIndex> = [];  
    var splittedText = linha.texto_critico.split(" ");         

    for (let index = 0; index < splittedText.length; index++) {  
      var hasAparato:boolean = false;      
      var indexArray: Array<TextoComAparato> = []; 
      linha.aparato.forEach(aparato => { 
        //Check if the aparato is linked to the informed publication    
        if(codigoPubli == undefined || aparato.codigo == codigoPubli){    
          console.log(aparato);
          //check if the aparato links to a group of words
          if(aparato.posicao.includes("-")){           
            var splittedAparato =  aparato.posicao.split("-");
            //Getting indexes. User do not start to count from 0 
            var beginning: number = +splittedAparato[0]-1;   
            var end: number = +splittedAparato[1]-1;
            if(index === beginning){
              var newText: string = "";
              for (let y = beginning; y <= end; y++) {
                newText += splittedText[y] + " ";
              }
              var textoComAparato: TextoComAparato = { 
                "conteudo" : newText, 
                "aparato" : aparato,
                "beggining" : beginning,
                "end": end
              };
              hasAparato = true;
              indexArray.push(textoComAparato);
              //console.log("adding aparato on " + index +" - "+end+". Value: "+ newText);    
            }    
          } else {
            var posicao: number = + aparato.posicao-1;
            if(posicao === index){

              var textoComAparato: TextoComAparato = { 
                "conteudo" : splittedText[index], 
                "aparato" : aparato,
                "beggining" : posicao,
                "end": posicao
              };
              hasAparato = true;
              indexArray.push(textoComAparato);
              //console.log("adding aparato on " + index +". Posicao "+posicao+". Value: "+  splittedText[index]);
            }
          }
          //console.log(aparato);
        }
      });   

      if(hasAparato === false){
        indexArray.push({ 
          "conteudo" : splittedText[index], 
          "aparato" : undefined,
          "beggining" : index,
          "end": index
        });        
      } 

      var textoComAparatoPerIndex: TextoComAparatoPerIndex = {
        "textoComAparatos": indexArray,
        "index": index,
        "hasAparato": hasAparato
      };
      
      if(indexArray.length > 0) textObJArray.push(textoComAparatoPerIndex);
    }
    return textObJArray;
  }  

  static getTextoComAparato(linha: Linha, codigoPubli?: string): Array<TextoComAparato> {
    var textoComApartoPerIndexArray =  PoemUtils.getTextoComAparatoPerIndex(linha, codigoPubli);
    var arrayTextoComAparato: Array<TextoComAparato> = [];
    textoComApartoPerIndexArray.forEach(textoComApartoPerIndex => {
      textoComApartoPerIndex.textoComAparatos.forEach(element => {
        arrayTextoComAparato.push(element);
      });
    });
    return arrayTextoComAparato;
  }
}