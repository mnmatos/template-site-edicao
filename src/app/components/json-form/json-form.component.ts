import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, Input, SimpleChange } from '@angular/core';
import { ISchema} from 'ngx-schema-form';
import { JsonFormData } from '../../model/jsonText';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
  // Bind the "mySchema" member to the schema input of the Form component.
  template: '<sf-form [schema]="mySchema" [(model)]="jsonFormData"></sf-form>{{jsonFormData | json}}'
})


export class JsonFormComponent implements OnChanges, OnInit {
  sub: any;

  private setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement
    }
  }

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  @Input() jsonFormData!: JsonFormData;
  sample!: JsonFormData;
  mySchema: ISchema = { properties: {} };
  schema: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData);
    }
  }
  onChange(value: any) {
    this.jsonFormData = value;
    console.log(value);    
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.http.get('/assets/text_schema.json').subscribe(data => {
      this.schema = data;

      this.mySchema = this.schema as unknown as ISchema;
      console.log(this.mySchema);
    });

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);

      if (params.has('name')) {
        console.log('loading ' + params.get('name'));
        this.http
          .get('/assets/edicoes/' + params.get('name') + '.json')
          .subscribe((formData: any) => {
            this.jsonFormData = formData;
            console.log(this.jsonFormData);
          });
      } else {
        this.jsonFormData = <JsonFormData>{};
      }
    });
  }

  downloadJson() {
    this.dyanmicDownloadByHtmlTag({
      fileName: this.jsonFormData.titulo + '.json',
        text: JSON.stringify(this.jsonFormData, null, '   ')
      });
  }

  generateSample() {
    this.sample = this.jsonFormData;
    console.log(this.sample);
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}
