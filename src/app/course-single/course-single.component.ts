import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../model/course';

@Component({
  selector: 'app-course-single',
  templateUrl: './course-single.component.html',
  styleUrls: ['./course-single.component.css']
})
export class CourseSingleComponent implements OnInit {

  @Input() courseChild: Course;
  @Input() isPublicChild: boolean;
  @Input() filtreByDifficultyChild: string;
  @Output() deleteEvent = new EventEmitter<Course>();
  @Output() recommendEvent = new EventEmitter<Course>();
  searchTerm: string;

  constructor() {
  }

  ngOnInit(): void {

  }

  getCategoryColor() {
    switch (this.courseChild.category) {
      case 'Project Manager': {
        return 'text-white bg-warning';
        break;
      }
      case 'Cloud Computing': {
        return 'text-white bg-success';
        break;
      }
      case 'Development': {
        return 'text-white bg-primary';
        break;
      }
      case 'Marketing': {
        return 'text-white bg-info';
        break;
      }
      default: {
        return 'text-white bg-secondary';
        break;
      }
    }
  }

  getRecommendColor() {
    if (this.courseChild.recommend >= 5 && this.courseChild.recommend < 10) {
      return '#ff9900';
    } else if (this.courseChild.recommend >= 10 && this.courseChild.recommend < 20) {
      return 'green';
    } else if (this.courseChild.recommend >= 20 && this.courseChild.recommend < 30) {
      return 'blue';
    } else if (this.courseChild.recommend >= 30) {
      return 'red';
    } else {
      return 'black';
    }
  }

  sendRecommendNotif() {
    this.recommendEvent.emit(this.courseChild);
  }

  sendDeleteNotif() {
    this.deleteEvent.emit(this.courseChild);
  }

}
