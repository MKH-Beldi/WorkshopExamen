import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {CoursesService} from '../shared/courses.service';
import {Router} from '@angular/router';
import firebase from '@firebase/app';
import '@firebase/storage';
import {AuthService} from '../shared/auth.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];
  copyCoursesF1: Course[];
  copyCoursesF2: Course[];
  isPublic = false;
  isAuth: boolean;
  categories = ['Development', 'Cloud Computing', 'Project Manager', 'Marketing'];
  filtreByCategory = 'none';
  filtreByDifficulty = 'none';
  difficulties = ['Easy', 'Medium', 'Hard'];
  searchValue: string;
  sortValue = 'none';
  sortItem = ['category', 'title', 'difficulty', 'recommend', 'author', 'lastUpdated'];
  reverse: boolean;


  constructor(private coursesService: CoursesService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.coursesService.getAll().subscribe(
      (data: Course[]) => {
        this.courses = data;
        this.copyCoursesF1 = this.courses;
        this.copyCoursesF2 = this.courses;
      }
    );
    this.reverse = false;
    this.authService.isAuth().then(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
  }

  onNewCourse() {
    this.router.navigate(['/courses', 'new']);
  }

  onDeleteCourse(course: Course) {
    if (course.image) {
      const storageRef = firebase.storage().refFromURL(course.image);
      storageRef.delete().then(
        () => {
          console.log('Image removed!');
        },
        (error) => {
          console.log('Could not remove Image! : ' + error);
        }
      );
    }
    const idCourse = this.courses.indexOf(course);
    this.coursesService.deleteCourse(course.id).subscribe(
      () => {
        this.courses.splice(idCourse, 1);
      }
    );
  }

  onFiltreByCategory() {
    console.log(this.filtreByCategory);
    this.filtreByDifficulty = 'none';
    if (this.filtreByCategory === 'none') {
      this.copyCoursesF2 = this.copyCoursesF1;
      return this.courses = this.copyCoursesF1;
    } else {
      this.courses = this.copyCoursesF1.filter(
        object => object.category === this.filtreByCategory
      );
      this.copyCoursesF2 = this.courses;
      return this.courses;
    }
  }

  onFiltreByDifficulty() {
    console.log(this.filtreByDifficulty);
    if (this.filtreByDifficulty === 'none') {
      return this.courses = this.copyCoursesF2;
    } else {
      return this.courses = this.copyCoursesF2.filter(
        object => object.difficulty === this.filtreByDifficulty
      );
    }
  }

  onRecommendCourse(course: Course) {
    const value = course.recommend + 1;
    const idCourse = this.courses.indexOf(course);
    this.coursesService.recommandCourse(course.id, value).subscribe(
      () => {
        this.courses[idCourse].recommend = value;
      }
    );

  }

}
