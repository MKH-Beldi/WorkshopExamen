import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseFormComponent} from './course-form/course-form.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuardService} from './shared/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  { path: 'courses/edit/:id', canActivate: [AuthGuardService], component: CourseFormComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', canActivate: [AuthGuardService], component: CourseFormComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
