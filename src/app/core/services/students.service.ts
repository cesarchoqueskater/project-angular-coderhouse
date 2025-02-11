import { Injectable } from "@angular/core";
import { Student } from "../../modules/dashboard/pages/students/models";
import { generateRandomString } from "../../shared/utils";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentsService {


    getStudentsPromise(): Promise<Student[]> {
        return new Promise<Student[]>((resolve, reject) => {
            
            
            // reject('Error de conexión');


            setTimeout(() => {
                resolve([
                    {
                        id: generateRandomString(6),
                        name: 'Cesar',
                        lastName: 'Choquehuanca',
                        age: 28,
                        active: true
                    },
                    {
                        id: generateRandomString(6),
                        name: 'Ryan',
                        lastName: 'Sheckler',
                        age: 28,
                        active: true
                    }
                ])
            }, 3000)
        })
    }

    getStudentsObservable(): Observable<Student[]>{
        return new Observable<Student[]>((subscriber) => {

            setTimeout( () => {
                
                subscriber.next(
                    [
                        {
                            id: generateRandomString(6),
                            name: 'Cesar',
                            lastName: 'Choquehuanca',
                            age: 28,
                            active: true
                        },
                        {
                            id: generateRandomString(6),
                            name: 'Ryan',
                            lastName: 'Sheckler',
                            age: 28,
                            active: true
                        }
                    ]
                )
                
                //Mandar error
                //subscriber.error('Error al cargar los estudiantes ...') 
                
                //Notifica al subscriptor que el observable ya no va a admitir mas data
                subscriber.complete() 
            } ,3000)
        })
    }
}