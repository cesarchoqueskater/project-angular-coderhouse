import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { Course } from "../../modules/dashboard/pages/courses/models";


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

@Injectable({ providedIn: 'root' })
export class CourseService {

    updateCourseById(id:string, data: {name: string}) : Observable<Course[]>{
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.map( (course) => 
            course.id === id ? { ...course, ...data } : course 
        );
        return this.getCourses();
    }

    addCourse( payload: {name:string} ): Observable<Course[]>{

        MY_FAKE_DATABASE.push({
            ...payload,
            id: generateRandomString(10)
        })
        return this.getCourses();
    }

    getCourses(): Observable<Course[]>{
        return of([...MY_FAKE_DATABASE]).pipe(delay(1000))   
    }


    deleteCourseById(id: string): Observable<Course[]> {
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter( course => course.id != id)
        return this.getCourses();
    }

}

