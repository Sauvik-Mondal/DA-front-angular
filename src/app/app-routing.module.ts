import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FeedBackListComponent } from './component/feed-back-list/feed-back-list.component';
import { RegisterComponent } from './component/register/register.component';
import { FeedBackComponent } from './component/feed-back/feed-back.component';
import { ErrorComponent } from './component/error/error.component';
import { CoachListComponent } from './component/coach-list/coach-list.component';
import { CoachDetailsComponent } from './component/coach-details/coach-details.component';
import { RouterGuardService } from './services/router-guard.service';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  {path: 'feedbackList',component: FeedBackListComponent,canActivate:[RouterGuardService]},
  {path: 'register',component: RegisterComponent,canActivate:[RouterGuardService]},
  {path: 'feedback/:coachId',component: FeedBackComponent},
  {path: 'coachlist',component: CoachListComponent},
  {path: 'coachdetails/:coachId',component: CoachDetailsComponent,canActivate:[RouterGuardService]},
  {path: '**',component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
