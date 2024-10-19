import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry,
} from "ngx-schema-form";
import { PrintPageComponent } from './components/print-page/print-page.component';
import { SinglePoemViewComponent } from './components/single-poem-view/single-poem-view.component';
import { TablePoemViewComponent } from './components/table-poem-view/table-poem-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { PictureViewComponent } from './components/picture-view/picture-view.component';
import { SafePipe } from './components/poem-module/poem-module.component';
import { DossierViewComponent } from './components/dossier-view/dossier-view.component';
import { DocumentViewComponent } from './components/document-view/document-view.component';
import { AuthorComponent } from './components/author/author.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactSmallComponent } from './components/contact-small/contact-small.component';
import { EditionComponent } from './components/edition/edition.component';
import { CollectionComponent } from './components/collection/collection.component';
import { TextAreaWidgetComponent } from './components/widget/test-area-widget/text-area-widget.component';
import { CustomWidgetRegistry } from './utils/CustomWidgetRegistry';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,    
    LateralMenuComponent, PrintPageComponent, SinglePoemViewComponent, TablePoemViewComponent, SearchViewComponent, GridViewComponent, PictureViewComponent, SafePipe, DossierViewComponent, DocumentViewComponent, AuthorComponent, PresentationComponent, ContactComponent, ContactSmallComponent, EditionComponent, CollectionComponent, TextAreaWidgetComponent
  ],
  entryComponents: [TextAreaWidgetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SchemaFormModule.forRoot(),
    AppRoutingModule,
    NgxAudioPlayerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatAutocompleteModule,MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, MatGridListModule, MatIconModule, MatSidenavModule, MatTabsModule, MatCheckboxModule
  ],
  providers: [{ provide: WidgetRegistry, useClass: CustomWidgetRegistry }],
  bootstrap: [AppComponent]
})
export class AppModule { }
