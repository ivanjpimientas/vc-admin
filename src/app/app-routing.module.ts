import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profiles', redirectTo: 'profiles', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
