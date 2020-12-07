import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from './academy.model';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  constructor(@Inject('baseUrl') private baseUrl: string, private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    const url = `${this.baseUrl}/courses`;
    return this.http.get<Course[]>(url).pipe(
      map((courses: Course[]) => courses.map((course) => course.category)),
      map((categories: string[]) => categories.filter(this.onlyUnique))
    );
  }

  getAll(): Observable<Course[]> {
    const url = `${this.baseUrl}/courses`;
    return this.http.get<Course[]>(url);
  }

  getByCategory(category: string): Observable<Course[]> {
    const url = `${this.baseUrl}/courses?category=${category}`;
    return this.http.get<Course[]>(url);
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.baseUrl}/courses/${id}`;
    return this.http.get<Course>(url);
  }

  private onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }
}
