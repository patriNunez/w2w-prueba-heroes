import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  Observable,
  startWith,
  Subscription,
} from 'rxjs';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { IHero } from '../../shared/models/interfaces';
import { DeleteDialogComponent } from '../../shared/components/modals/delete-dialog/delete-dialog.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  itemsPerPage = 5;
  sizeOptions = [5, 10, 25, 100];
  loading = false;
  subscriptions: Subscription = new Subscription();
  actualPagination = 0;
  pageSize = this.itemsPerPage;

  searchFormControl = new FormControl();
  heroeControl: FormControl;

  searchSubject: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);
  search$: Observable<IHero[]> = new Observable<IHero[]>();
  allHeroesList: IHero[];
  heroesFiltered: IHero[];

  selectionChange(option: any) {
    this.heroeControl.setValue(option.value);
  }

  constructor(
    public heroesService: HeroesService,
    public dialog: MatDialog,
    public loadingService: LoadingService
  ) {
    this.heroeControl = new FormControl();
    this.allHeroesList = [];
    this.heroesFiltered = [];
  }

  ngOnInit(): void {
    this.subscriptions.add(this.listenToLoading());
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.allHeroesList = heroes;
      this.searchSubject = new BehaviorSubject(this.allHeroesList);
      this.search$ = this.searchSubject.asObservable();
      this.controlSearchForm();
    });
  }

  controlSearchForm() {
    this.subscriptions.add(
      this.searchFormControl.valueChanges
        .pipe(startWith(null), debounceTime(0))
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
        })
    );
  }

  changeResults(array: IHero[]) {
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
      this.subscriptions.add(
        dialog.afterClosed().subscribe((result: IHero) => {
          this.heroesService.deleteHeroe(result.id).subscribe((x) => {
            this.allHeroesList = this.allHeroesList.filter(
              (item) => item !== result
            );
            this.heroesFiltered = this.heroesFiltered.filter(
              (item) => item !== result
            );
            this.changeResults(this.heroesFiltered);
            this.paginator.firstPage();
          });
        })
      );
    }
  }

  identify(index: any, item: any) {
    return item.id;
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
