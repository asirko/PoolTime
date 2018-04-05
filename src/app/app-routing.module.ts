import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimersComponent } from './timers/timers.component';
import { ParamsComponent } from './params/params.component';

const routes: Routes = [
  {
    path: '',
    component: TimersComponent // test
  }, {
    path: 'params',
    component: ParamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
