import {Injectable} from '@angular/core';
import {Course} from '../model/course';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://localhost:3000/courses/';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Course[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Course>(this.url + id);
  }

  addCourse(c: Course) {
    return this.http.post(this.url, c);
  }

  deleteCourse(id: number) {
    return this.http.delete(this.url + id);
  }

  updateCourse(id: number, c: Course) {
    return this.http.put(this.url + id, c);
  }

  recommandCourse(id: number, value: number) {
    return this.http.patch(this.url + id, {
      "recommend": value
      }
    );
  }


}
