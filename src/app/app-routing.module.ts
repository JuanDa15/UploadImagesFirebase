import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadComponent } from './components/load/load.component';

const routes: Routes = [
  { path: 'load-photos', component: LoadComponent},
  { path: '**', redirectTo: 'load-photos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
