import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  debounceTime,
  Observable,
  startWith,
  Subject,
} from 'rxjs';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { IHeroe, DeleteDialogData } from '../../shared/models/interfaces';
import { DeleteDialogComponent } from '../../shared/components/modals/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  itemsPerPage = 5;
  sizeOptions = [5, 10, 25, 100];
  emptyheroe = {
    id: 0,
    name: '',
    age: 0,
    power: '',
  };
  searchFormControl = new FormControl();
  heroeControl = new FormControl<IHeroe>(this.emptyheroe);
  actualPagination = 0;
  pageSize = this.itemsPerPage;
  searchSubject: BehaviorSubject<IHeroe[]> = new BehaviorSubject<IHeroe[]>([]);
  search$: Observable<IHeroe[]> = new Observable<IHeroe[]>();
  allHeroesList: IHeroe[];
  heroesFiltered: IHeroe[];

  selectionChange(option: any) {
    this.heroeControl.setValue(option.value);
  }

  constructor(heroesService: HeroesService, public dialog: MatDialog) {
    this.allHeroesList = [];
    this.heroesFiltered = [];
    heroesService.getHeroes().subscribe((heroes) => {
      this.allHeroesList = heroes;
      this.searchSubject = new BehaviorSubject(this.allHeroesList);
      this.search$ = this.searchSubject.asObservable();
    });
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(startWith(null), debounceTime(200))
      .subscribe((value) => {
        if (!value) {
          this.changeResults(this.allHeroesList);
        } else {
          value = value.toLowerCase();
          const filtered = this.allHeroesList.filter((heroe) =>
            heroe.name.toLowerCase().includes(value)
          );
          this.changeResults(filtered);
        }
      });
  }

  changeResults(array: IHeroe[]) {
    this.heroesFiltered = array;
    this.searchSubject.next(
      array.slice(this.actualPagination, this.actualPagination + this.pageSize)
    );
  }

  paginate(paginacion: any) {
    this.pageSize = paginacion.pageSize;
    this.actualPagination = paginacion.pageIndex * paginacion.pageSize;

    this.searchSubject.next(
      this.heroesFiltered.slice(
        this.actualPagination,
        this.actualPagination + paginacion.pageSize
      )
    );
  }

  openDialog() {
    if (this.heroeControl.value?.name) {
      const dialog = this.dialog.open(DeleteDialogComponent, {
        data: {
          heroe: this.heroeControl.value,
        },
      });
      dialog.afterClosed().subscribe((result: IHeroe) => {
        this.allHeroesList.splice(this.allHeroesList.indexOf(result), 1);
        this.heroesFiltered.splice(this.heroesFiltered.indexOf(result), 1);
        this.changeResults(this.heroesFiltered);
      });
    }
  }
}
