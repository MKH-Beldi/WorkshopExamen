import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { HeaderComponent } from './header/header.component';
import { CoursesService } from './shared/courses.service';
import { CourseSingleComponent } from './course-single/course-single.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchFiltrePipe } from './pipe/search-filtre.pipe';
import { SortByPipe } from './pipe/sort-by.pipe';
import { FooterComponent } from './footer/footer.component';
import { ValidateEqualModule } from 'ng-validate-equal';




@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseFormComponent,
    HeaderComponent,
    CourseSingleComponent,
    SigninComponent,
    SignupComponent,
    NotFoundComponent,
    SearchFiltrePipe,
    SortByPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ValidateEqualModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
