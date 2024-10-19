import { Component, OnInit, Input } from '@angular/core';
import { JsonFormData } from 'src/app/model/jsonText';
import PoemUtils from 'src/app/utils/poemUtils';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  searchTerm: String = "";

  public formData: JsonFormData[] = [];

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent!: PageEvent;

  @Input() filterByAcessibility: boolean = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formData = PoemUtils.getListEdicao(this.http, PoemUtils.getResumedList());
    this.activatedRoute.queryParams.subscribe(params => {
      const filterQuery = params['filter'];
      if(filterQuery !== undefined && filterQuery != "null"){
        this.searchTerm = filterQuery;
      }   
      
      //Acessibilidade
      const setAcessibility = params['acessibilidade'];
      if(setAcessibility=="true") this.filterByAcessibility=true;
    });
    console.log(this.formData);
  }
  
  getfilteredValue(): JsonFormData[]{    
    var filteredArray;
    if((this.formData.length == 0 || this.searchTerm==="") && !this.filterByAcessibility) filteredArray = this.formData;
    else {       
      console.log(this.formData.map((x) => x));
      filteredArray = this.filterByValue(this.formData.map((x) => x));      
    } 

    return this.doPagination(filteredArray);
  }

  doPagination(filteredArray: JsonFormData[]): JsonFormData[]{
    this.length = filteredArray.length;
      var index = 0;
      if(this.pageEvent !== undefined){   
        //In case after new filter the list is smaller than the first page, go to beggining
        if(filteredArray.length<=this.pageEvent.pageSize*this.pageEvent.pageIndex) {
          this.pageEvent.pageIndex = 0;
        }        
        this.pageSize=this.pageEvent.pageSize;   
        index = this.pageEvent.pageIndex;
      }      
      var firstPosition = this.pageSize*index;
     
      var finalPageSize = (filteredArray.length-firstPosition < this.pageSize) ? filteredArray.length-firstPosition : this.pageSize;
      //console.log("firstPosition " + firstPosition + " finalPageSize " +  finalPageSize);
      //console.log(filteredArray);
      return filteredArray.slice(firstPosition, firstPosition+finalPageSize);
  }

  filterByValue(dataArray: JsonFormData[]) {
    return dataArray.filter((data :JsonFormData) => (this.hasMatch(data.autor) || this.hasMatch(data.titulo)) && !(this.filterByAcessibility && data.edicao[0].video_libras == undefined));     
  }

  hasMatch(fieldValue: String) {
    return fieldValue.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase().trim())
  }

  setAcessibility(filter: boolean) {
    this.filterByAcessibility = filter;
  }
}

