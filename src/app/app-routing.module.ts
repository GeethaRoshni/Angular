import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservableComponent } from './observable/observable.component';
import { ObserverComponent } from './observer/observer.component';
import { OperatorComponent } from './operator/operator.component';
import { TopicsComponent } from './topics/topics.component';


const routes: Routes = [
  {
    path: '', component: TopicsComponent
  },
  { path: 'observable', component: ObservableComponent },
  { path: 'observer', component: ObserverComponent },
  { path: 'operators', loadChildren: () => import('./operator/operator.module').then(m => m.OperatorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
