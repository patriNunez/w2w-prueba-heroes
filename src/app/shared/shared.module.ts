import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './components/modals/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const ANGULAR_MODULES = [
  MatDialogModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [CommonModule, ANGULAR_MODULES],
  exports: [ANGULAR_MODULES],
  entryComponents: [DeleteDialogComponent],
})
export class SharedModule {}
