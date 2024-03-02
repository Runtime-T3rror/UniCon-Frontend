import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { TimetableService } from './services/timetable/timetable.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: UserAuthComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    HomeComponent,
    TimetableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [Router, UserAuthService, TimetableService],
  bootstrap: [AppComponent],
})
export class AppModule {}
