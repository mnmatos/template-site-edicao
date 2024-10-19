import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { PoemModuleComponent } from './components/poem-module/poem-module.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { SinglePoemViewComponent } from './components/single-poem-view/single-poem-view.component';
import { TablePoemViewComponent } from './components/table-poem-view/table-poem-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { PictureViewComponent } from './components/picture-view/picture-view.component';
import { DossierViewComponent } from './components/dossier-view/dossier-view.component';
import { DocumentViewComponent } from './components/document-view/document-view.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { AuthorComponent } from './components/author/author.component';
import { EditionComponent } from './components/edition/edition.component';
import { ContactComponent } from './components/contact/contact.component';
import { CollectionComponent } from './components/collection/collection.component';

const routes: Routes = [  
  { path: 'search', component: SearchViewComponent },
  { path: 'edition', component: EditionComponent },
  { path: 'poema/:code', component: SinglePoemViewComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'form', component: JsonFormComponent },
  { path: 'form/:name', component: JsonFormComponent },
  { path: 'test_view', component: PoemModuleComponent },
  { path: 'galeria', component: GridViewComponent },
  { path: 'picture/:code', component: PictureViewComponent },
  { path: 'acervo', component: CollectionComponent },
  { path: 'dossie/:type', component: DossierViewComponent },
  { path: 'document/:code', component: DocumentViewComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'print',
    //outlet: 'print',
    component: PrintPageComponent,
    children: [
      { path: 'view/:code', component: SinglePoemViewComponent },
      { path: 'table/:code', component: TablePoemViewComponent }
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
export const routingComponents = [JsonFormComponent, PoemModuleComponent, HomeComponent]
