import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { IHero } from 'src/app/shared/models/interfaces';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss'],
})
export class HeroesFormComponent implements OnInit {
  heroeForm: FormGroup = new FormGroup([]);
  mode = 'edition';
  titleModel = {
    edition: 'EDIT SUPER HERO',
    creation: 'CREATE SUPER HERO',
  };
  title = this.titleModel[this.mode as keyof typeof this.titleModel];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private utilities: UtilitiesService,
    public heroesService: HeroesService
  ) {
    const id = router.url.split('/', 3)[2];
    if (id === 'add') {
      this.mode = 'creation';
      this.createFormGroup(null);
    } else {
      heroesService.getHeroe(Number(id)).subscribe((result: IHero) => {
        this.createFormGroup(result);
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  createFormGroup(hero: IHero | null): void {
    this.heroeForm = this.fb.group({
      id: new FormControl(hero ? hero.id : this.utilities.getFakeId() + 1),
      name: [
        hero ? hero.name : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
        ],
      ],
      age: new FormControl(hero ? hero.age : 0),
      power: new FormControl(hero ? hero.power : '').setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
      ]),
    });
  }
  onSubmit() {}
}
