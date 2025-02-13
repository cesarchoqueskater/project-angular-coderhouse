import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { ClassStudents } from "../../modules/dashboard/pages/class-students/models";


let MY_FAKE_DATABASE: ClassStudents[] = [
        {
            id: generateRandomString(10),
            classStudentName: 'Japanese',
            quantity: 20,
            //active: true
        },
        {
            id: generateRandomString(10),
            classStudentName: 'Korean',
            quantity: 23,
            //active: true
        },
        {
            id: generateRandomString(10),
            classStudentName: 'English',
            quantity: 53,
            //active: true
        },
        {
            id: generateRandomString(10),
            classStudentName: 'German',
            quantity: 4,
            //active: false
        },
        {
            id: generateRandomString(10),
            classStudentName: 'French',
            quantity: 5,
            //active: false
        }
    ]

@Injectable({ providedIn: 'root' })
export class ClassStudentsService {

    updateClassStudentById(id:string, data: { classStudentName: string, quantity: number }) : Observable<ClassStudents[]>{
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.map( (classStudent) => 
            classStudent.id === id ? { ...classStudent, ...data } : classStudent 
        );
        return this.getClassStudents();
    }

    addClassStudent( payload: { classStudentName:string, quantity:number } ): Observable<ClassStudents[]>{

        MY_FAKE_DATABASE.push({
            ...payload,
            id: generateRandomString(10)
        })
        return this.getClassStudents();
    }

    getClassStudents(): Observable<ClassStudents[]>{
        return of([...MY_FAKE_DATABASE]).pipe(delay(1000))   
    }


    deleteClassStudentById(id: string): Observable<ClassStudents[]> {
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter( classStudent => classStudent.id != id)
        return this.getClassStudents();
    }

}

