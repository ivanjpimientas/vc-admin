import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {PagesRoutingModule} from './pages-routing.module';
import {LayoutModule} from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MainComponent } from './main/main.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfilesComponent,
    MainComponent,
    ProfileAddComponent,
    ProfileDetailComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    LayoutModule,
    HttpClientModule
  ]
})
export class PagesModule {
}