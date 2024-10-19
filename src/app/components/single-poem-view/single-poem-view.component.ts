import { Component, OnInit, Input } from '@angular/core';
import { JsonFormData } from 'src/app/model/jsonText';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-poem-view',
  templateUrl: './single-poem-view.component.html',
  styleUrls: ['./single-poem-view.component.css']
})
export class SinglePoemViewComponent implements OnInit {

  @Input() code: any;
  formData!: JsonFormData;
  sub: any;

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      if (params.has('code')) {
        console.log('loading ' + params.get('code'));
        this.code = params.get('code');
      }
      if(this.code !== undefined){
        this.http
        .get('/assets/edicoes/'+this.code+".json")
        .subscribe((formData: any) => {
          this.formData = formData;
        });    
        console.log(this.formData);
      } else {
        this.formData = <JsonFormData>{};
      }
    });

    
  }


}
