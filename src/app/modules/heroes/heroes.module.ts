import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [HeroesRoutingModule.components],
  imports: [CommonModule, HeroesRoutingModule, MatSlideToggleModule],
})
export class HeroesModule {}
