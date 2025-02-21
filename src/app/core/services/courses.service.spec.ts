import { TestBed } from '@angular/core/testing';
import { CourseService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Course } from '../../modules/dashboard/pages/courses/models';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should fetch course details', () => {
    const mockCourse: Course = { id: '1', name: 'Test Course' } as Course;
    
    service.getCourseDetail('1').subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/courses/1?_embed=teachers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('Should update a course and fetch updated list', () => {
    const mockCourses: Course[] = [{ id: '1', name: 'Updated Course' }];
    const updateData = { name: 'Updated Course' };

    service.updateCourseById('1', updateData).subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    httpMock.expectOne(`${environment.baseApiUrl}/courses/1`).flush(null);
    httpMock.expectOne(`${environment.baseApiUrl}/courses`).flush(mockCourses);
  });

  it('Should add a new course and fetch updated list', () => {
    const mockCourses: Course[] = [{ id: '2', name: 'New Course' }];
    const payload = { name: 'New Course' };

    service.addCourse(payload).subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    httpMock.expectOne(`${environment.baseApiUrl}/courses`).flush(null);
    httpMock.expectOne(`${environment.baseApiUrl}/courses`).flush(mockCourses);
  });

  it('Should fetch all courses', () => {
    const mockCourses: Course[] = [{ id: '1', name: 'Course 1' }];
    
    service.getCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('Should delete a course and fetch updated list', () => {
    const mockCourses: Course[] = [];
    
    service.deleteCourseById('1').subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    httpMock.expectOne(`${environment.baseApiUrl}/courses/1`).flush(null);
    httpMock.expectOne(`${environment.baseApiUrl}/courses`).flush(mockCourses);
  });
});
