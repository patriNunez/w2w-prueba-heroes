import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesFormComponent } from '../heroes-form/heroes-form.component';

const routes: Routes = [{ path: '', component: HeroesFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesFormRoutingModule {
  static components = [HeroesFormComponent];
}
