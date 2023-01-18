import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared.module';
import { MatListModule } from '@angular/material/list';

const MaterialModules = [MatListModule];

@NgModule({
  declarations: [HeroesRoutingModule.components],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MatPaginatorModule,
    SharedModule,
    MaterialModules,
  ],
})
export class HeroesModule {}
