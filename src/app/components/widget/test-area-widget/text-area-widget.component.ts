import { Component, OnInit } from '@angular/core';
import { StringWidget } from 'ngx-schema-form';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-test-area-widget',
  templateUrl: './test-area-widget.component.html',
  styleUrls: ['./test-area-widget.component.css']
})
export class TextAreaWidgetComponent extends StringWidget {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
