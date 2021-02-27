import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombinationComponent } from './combination/combination.component';
import { OperatorComponent } from './operator.component';


const routes: Routes = [
  {
    path: '', component: CombinationComponent, children: [
      { path: '', component: CombinationComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
