import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import PoemUtils from 'src/app/utils/poemUtils';
import {Router} from '@angular/router';
import { Entry } from 'src/app/utils/model/Entry';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit, OnChanges {

  isInactive = false;
  myControl = new FormControl();
  filteredOptions: Observable<Entry[]> | undefined;
  options = PoemUtils.getResumedList();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
    startWith<string | Entry>(''),
    map(value => typeof value === 'string' ? value : value.name),
    map(name => name.length > 0 ? this._filter(name) : [])
    );
  }

  private _filter(name: string): Entry[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }  

  displayFn(edicao?: Entry){
    return edicao ? edicao.name : "";
  }

  ngAfterViewInit() {
    //We loading the player script on after view is loaded
    this.loadScript('../../../assets/js/main.js');
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log("changed!!!!!!!!!");
    if (changes['filterInput']) {
      
    }
  }

  toogleMenu() {
    this.isInactive = !this.isInactive;
  }

  public inputChanged(event: Event){
    console.log("changed!!!!!!!!!");
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  searchSubmit(){
    this.router.navigateByUrl('/search?filter='+ ((this.myControl.value instanceof Object) ? this.myControl.value.name : this.myControl.value));
  }

  keyDownFunction(event: KeyboardEvent){
    if (event.key === 'Enter') {
      this.searchSubmit();
    }
  }
  
}
