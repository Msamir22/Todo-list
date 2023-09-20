import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [CommonModule, NgbDropdownModule, NgbNavModule, ReactiveFormsModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class CoreModule {}
