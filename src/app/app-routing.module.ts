import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/heroes' },
  /* {
    path: 'heroes/:id',
    data: { preload: true },
    loadChildren: () =>
      import('./modules/heroe/heroe.module').then((m) => m.HeroeModule),
  }, */
  {
    path: 'heroes',
    loadChildren: () =>
      import('./modules/heroes/heroes.module').then((m) => m.HeroesModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/heroes' }, // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
