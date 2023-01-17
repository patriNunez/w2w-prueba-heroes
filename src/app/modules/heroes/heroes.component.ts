import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  itemsPerPage = 5;
  sizeOptions = [5, 10, 25, 100];
  searchFormControl = new FormControl();
  heroeControl = new FormControl();
  actualPagination = 0;
  pageSize = this.itemsPerPage;
  searchSubject: BehaviorSubject<string[]>;
  search$: Observable<string[]>;

  allHeroesList: string[] = [
    'Boots',
    'Clogs boots',
    'Loafers',
    'Moccasins',
    'Sneakers',
    'sfdfg',
    'dfgf boots',
    'Loafers boots',
    'Moccasins boots',
    'Sneakers boots',
  ];
  heroesResult: string[] = this.allHeroesList;

  selectionChange(option: any) {
    this.heroeControl.setValue(option.value);
  }

  constructor() {
    this.searchSubject = new BehaviorSubject(this.allHeroesList);
    this.search$ = this.searchSubject.asObservable();
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(startWith(null), debounceTime(200))
      .subscribe((value) => {
        if (!value) {
          this.changeResults(this.allHeroesList);
        } else {
          value = value.toLowerCase();
          const filtered = this.allHeroesList.filter((names) =>
            names.toLowerCase().includes(value)
          );
          this.changeResults(filtered);
        }
      });
  }

  changeResults(array: string[]) {
    this.heroesResult = array;
    this.searchSubject.next(
      array.slice(this.actualPagination, this.actualPagination + this.pageSize)
    );
  }

  paginate(paginacion: any) {
    this.pageSize = paginacion.pageSize;
    this.actualPagination = paginacion.pageIndex * paginacion.pageSize;

    this.searchSubject.next(
      this.heroesResult.slice(
        this.actualPagination,
        this.actualPagination + paginacion.pageSize
      )
    );
  }
}
