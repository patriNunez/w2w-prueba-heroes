import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Subscription, take } from 'rxjs';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { IHero } from 'src/app/shared/models/interfaces';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss'],
})
export class HeroesFormComponent implements OnInit, OnDestroy {
  heroeForm: FormGroup = new FormGroup([]);
  subscription = new Subscription();
  loading = false;
  mode = 'edition';
  titleModel = {
    edition: 'EDIT SUPER HERO',
    creation: 'CREATE SUPER HERO',
  };
  title = '';
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public heroesService: HeroesService,
    public loadingService: LoadingService
  ) {
    const id = router.url.split('/', 3)[2];
    if (id === 'add') {
      this.mode = 'creation';
    } else {
      heroesService.getHeroe(Number(id)).subscribe((result: IHero) => {
        this.createFormGroup(result);
      });
    }
    this.title = this.titleModel[this.mode as keyof typeof this.titleModel];
  }

  ngOnInit(): void {
    this.createFormGroup(null);
    this.subscription.add(this.listenToLoading());
  }

  createFormGroup(hero: IHero | null): void {
    this.heroeForm = this.fb.group({
      id: [hero ? hero.id : Date.now()],
      name: [
        hero ? hero.name : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]{2,254}'),
        ],
      ],
      age: [hero ? hero.age : null, [Validators.required]],
      power: [
        hero ? hero.power : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]{2,254}'),
        ],
      ],
    });
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }

  onSubmit() {
    if (this.mode === 'creation') {
      this.heroesService
        .insertHeroe(this.heroeForm.value)
        .pipe(take(1))
        .subscribe((x) => this.router.navigateByUrl('/'));
    } else {
      this.heroesService
        .updateHeroe(this.heroeForm.value)
        .pipe(take(1))
        .subscribe((x) => this.router.navigateByUrl('/'));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
