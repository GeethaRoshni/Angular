import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CombinationComponent } from './combination/combination.component';
import { OperatorRoutingModule } from './operator-routing.module';
@NgModule({
  declarations: [
    CombinationComponent
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    RouterModule
  ]
})
export class OperatorModule { }
