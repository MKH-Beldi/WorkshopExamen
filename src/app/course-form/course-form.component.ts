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
  fileIsUploading = false;
  fileIsUploaded = false;
  fileUrl: string;


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
    this.course.recommend = 0;
    if (this.fileUrl && this.fileUrl !== '') {
      this.course.image = this.fileUrl;
    }
    this.courseService.addCourse(this.course).subscribe();
    this.router.navigate(['']);
  }

  editCourse() {
    const dateTime = new Date();
    this.course.lastUpdated = dateTime;
    if (this.fileUrl && this.fileUrl !== '') {
      this.course.image = this.fileUrl;
    }
    this.courseService.updateCourse(+this.id, this.course).subscribe();
    this.router.navigate(['/courses']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.courseService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploaded = true;
        this.fileIsUploading = false;
      }
    );
  }

  changeFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }


}
