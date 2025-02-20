import { Injectable } from "@angular/core";

//import { delay, Observable, of } from "rxjs";

import { concatMap, Observable } from 'rxjs';

import { Course } from "../../modules/dashboard/pages/courses/models";
import { generateRandomString } from "../../shared/utils";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

/*


let MY_FAKE_DATABASE: Course[] = [
        {
            id: generateRandomString(10),
            name: 'English'
        },
        {
            id: generateRandomString(10),
            name: 'Japanse'
        },
        {
            id: generateRandomString(10),
            name: 'Korean'
        },
        {
            id: generateRandomString(10),
            name: 'French'
        },
        {
            id: generateRandomString(10),
            name: 'German'
        }
    ]
*/


@Injectable({ providedIn: 'root' })
export class CourseService {

    constructor(private httpClient: HttpClient) {}

    getCourseDetail(id: string): Observable<Course> {
      return this.httpClient.get<Course>(
        `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
      );
    }

    updateCourseById(id:string, data: {name: string}) : Observable<Course[]>{
        /*
            MY_FAKE_DATABASE = MY_FAKE_DATABASE.map( (course) => 
                course.id === id ? { ...course, ...data } : course 
            );
            return this.getCourses();
        */

        return this.httpClient
        .patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data)
        .pipe(concatMap(() => this.getCourses()));
    }

    addCourse( payload: {name:string} ): Observable<Course[]>{

        /*
        MY_FAKE_DATABASE.push({
            ...payload,
            id: generateRandomString(10)
        })
        return this.getCourses();
        */
        return (
            this.httpClient
              .post<Course>(`${environment.baseApiUrl}/courses`, payload)
              // Paso 2: Vuelve a consultar el listado completo de cursos
              .pipe(concatMap(() => this.getCourses()))
          );
    }

    getCourses(): Observable<Course[]>{
        //return of([...MY_FAKE_DATABASE]).pipe(delay(1000))   
        const myHeaders = new HttpHeaders().append(
            'Authorization',
            localStorage.getItem('access_token') || ''
          );
          return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`, {
            headers: myHeaders,
          });
    }


    deleteCourseById(id: string): Observable<Course[]> {
        
        /*
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter( course => course.id != id)
        return this.getCourses();
        */
        return (
            this.httpClient
              .delete<Course>(`${environment.baseApiUrl}/courses/${id}`)
              // Paso 2: Consulta nuevamente el listado de cursos
              .pipe(concatMap(() => this.getCourses()))
          );
    }

}

