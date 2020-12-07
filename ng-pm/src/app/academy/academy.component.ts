import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Course } from './academy.model';
import { AcademyService } from './academy.service';

@Component({
  selector: 'bbv-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css']
})
export class AcademyComponent implements OnInit {
  categories$: Observable<string[]>;
  courses$: Observable<Course[]>;

  constructor(private service: AcademyService, private router: Router) {}

  ngOnInit() {
    this.categories$ = this.service.getCategories();
    this.courses$ = this.service.getAll();
  }

  onChange(category: string) {
    if (category === 'Alle') {
      this.courses$ = this.service.getAll();
    } else {
      this.courses$ = this.service.getByCategory(category);
    }
  }

  navigateToCourseDetail(courseId: number) {
    this.router.navigate(['academy', courseId]);
  }
}
