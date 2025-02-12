import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { Teachers } from "../../modules/dashboard/pages/teachers/models";


let MY_FAKE_DATABASE: Teachers[] = [
        {
            id: generateRandomString(10),
            name: 'Name',
            lastName: "LastName 1",
            age: "20",
            email: "correo1@gmail.com",
            course: "Japanese",
            //active: true
        },
        {
            id: generateRandomString(10),
            name: 'Name',
            lastName: "LastName 2",
            age: "29",
            email: "correo2@gmail.com",
            course: "Korean",
            //active: true
        },
        {
            id: generateRandomString(10),
            name: 'Name',
            lastName: "LastName 3",
            age: "24",
            email: "correo3@gmail.com",
            course: "English",
            //active: true
        },
        {
            id: generateRandomString(10),
            name: 'Name',
            lastName: "LastName 4",
            age: "32",
            email: "correo1@gmail.com",
            course: "German",
            //active: false
        },
        {
            id: generateRandomString(10),
            name: 'Name',
            lastName: "LastName 5",
            age: "34",
            email: "correo1@gmail.com",
            course: "French",
            //active: false
        }
    ]

@Injectable({ providedIn: 'root' })
export class TeacherService {

    updateTeacherById(id:string, data: {name: string}) : Observable<Teachers[]>{
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.map( (teacher) => 
            teacher.id === id ? { ...teacher, ...data } : teacher 
        );
        return this.getTeachers();
    }

    addTeacher( payload: {name:string, lastName:string, age:string, email:string, course:string} ): Observable<Teachers[]>{

        MY_FAKE_DATABASE.push({
            ...payload,
            id: generateRandomString(10)
        })
        return this.getTeachers();
    }

    getTeachers(): Observable<Teachers[]>{
        return of([...MY_FAKE_DATABASE]).pipe(delay(1000))   
    }


    deleteTeacherById(id: string): Observable<Teachers[]> {
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter( teacher => teacher.id != id)
        return this.getTeachers();
    }

}

