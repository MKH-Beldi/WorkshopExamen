import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(courses: any[], sortBy: any, order: boolean): any {
    console.log(order);
    if (!courses) {
      return 0;
    }
    return courses.sort(
      (a, b) => {
        if (order === true && (a[sortBy] > b[sortBy])) {
          return -1;
        }
        if (order === true && (a[sortBy] < b[sortBy])) {
          return 1;
        }
        if (order === false && (a[sortBy] > b[sortBy])) {
          return 1;
        }
        if (order === false && (a[sortBy] < b[sortBy])) {
          return -1;
        }
      }
    );
    return 0;
  }

}
