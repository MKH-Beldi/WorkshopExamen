import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {CoursesService} from '../shared/courses.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  course: Course;
  id: string;
  isAddMode: boolean;


  constructor(private courseService: CoursesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.course = new Course();
    this.id = this.activatedRoute.snapshot.params.id;
    this.isAddMode = !this.id;
    console.log(this.isAddMode);
    if (!this.isAddMode) {
      this.courseService.getById(+this.id).subscribe(
        (data: Course) => {
          this.course = data;
        }
      );
    }
  }

  addCourse() {
    this.courseService.addCourse(this.course).subscribe();
    this.router.navigate(['/courses']);
  }

  editCourse() {
    const dateTime = new Date();
    this.course.lastUpdated = dateTime;
    this.courseService.updateCourse(+this.id, this.course).subscribe();
    this.router.navigate(['/courses']);
  }
}
