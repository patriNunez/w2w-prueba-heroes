import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/heroes' },
  {
    path: 'heroes/:id',
    data: { preload: true },
    loadChildren: () =>
      import('./modules/heroes-form/heroes-form.module').then(
        (m) => m.HeroesFormModule
      ),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./modules/heroes/heroes.module').then((m) => m.HeroesModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
