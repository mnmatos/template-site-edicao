import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import PoemUtils from 'src/app/utils/poemUtils';
import { JsonFormData } from '../../model/jsonText';
import { Entry } from 'src/app/utils/model/Entry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public formData: JsonFormData[] = [];

  constructor(private http: HttpClient) { }
  title = 'test-form';

  ngOnInit(): void { 

    var listaEdicoes: Entry[] = PoemUtils.getResumedList();
    
    this.formData = PoemUtils.getListEdicao(this.http, listaEdicoes.slice(0, 5));
  }
  
}
