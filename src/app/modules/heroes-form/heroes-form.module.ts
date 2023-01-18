import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesFormRoutingModule } from './heroes-form-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';

const angularMaterial = [MatFormFieldModule];

@NgModule({
  declarations: [HeroesFormRoutingModule.components],
  imports: [
    CommonModule,
    HeroesFormRoutingModule,
    angularMaterial,
    SharedModule,
  ],
})
export class HeroesFormModule {}
