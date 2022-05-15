import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadComponent } from './components/load/load.component';
import { PhotosComponent } from './components/photos/photos.component';

const routes: Routes = [
  { path: 'home', component: PhotosComponent},
  { path: 'load-photos', component: LoadComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
