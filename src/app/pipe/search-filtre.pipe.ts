import { Pipe, PipeTransform } from '@angular/core';
import {Course} from '../model/course';

@Pipe({
  name: 'searchFiltre'
})
export class SearchFiltrePipe implements PipeTransform {

  transform(courses: Course[], searchValue: string): any {
    if (!courses || !searchValue) {
      return courses;
    }
    return courses.filter(
      course => course.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                course.summary.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                course.author.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
