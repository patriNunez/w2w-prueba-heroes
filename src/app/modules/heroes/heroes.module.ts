import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';

@NgModule({
  declarations: [HeroesRoutingModule.components],
  imports: [CommonModule, HeroesRoutingModule],
})
export class HeroesModule {}
