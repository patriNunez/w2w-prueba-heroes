import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './components/modals/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const ANGULAR_MODULES = [MatDialogModule, MatButtonModule];

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [CommonModule, ANGULAR_MODULES],
  exports: [ANGULAR_MODULES],
  entryComponents: [DeleteDialogComponent],
})
export class SharedModule {}
