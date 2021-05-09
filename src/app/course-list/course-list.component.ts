import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {CoursesService} from '../shared/courses.service';
import {Router} from '@angular/router';


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
  categories = ['Development', 'Cloud Computing', 'Project Manager', 'Marketing'];
  filtreByCategory = 'none';
  filtreByDifficulty = 'none';
  difficultys = ['Easy', 'Medium', 'Hard'];


  constructor(private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.filtreByDifficulty);
    this.coursesService.getAll().subscribe(
      (data: Course[]) => {
        this.courses = data;
        this.copyCoursesF1 = this.courses;
        this.copyCoursesF2 = this.courses;
      }
    );
  }

  onNewCourse() {
    this.router.navigate(['/courses', 'new']);
  }

  onDeleteCourse(course: Course) {
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
