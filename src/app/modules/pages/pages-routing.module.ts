import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MainComponent } from './main/main.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'profiles', component: ProfilesComponent},
      {path: 'profile-add', component: ProfileAddComponent},
      {path: 'profile-edit/:id_user', component: ProfileEditComponent},
      {path: 'profile-detail/:id_user', component: ProfileDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
export const routingComponents = [
  HomeComponent, ProfilesComponent]