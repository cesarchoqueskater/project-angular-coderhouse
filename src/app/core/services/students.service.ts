import { Injectable } from "@angular/core";
import { Student } from "../../modules/dashboard/pages/students/models";
import { generateRandomString } from "../../shared/utils";
import { interval, Observable, of, delay } from "rxjs";

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
            
            const students = [
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

            setInterval( () => {
                students.push({
                    id: generateRandomString(6),
                    name: 'Nuevo Estudiante',
                    lastName: 'Apellido',
                    age: 20,
                    active: false
                })
                /*
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
                */
                
                subscriber.next(students)

                //Mandar error
                //subscriber.error('Error al cargar los estudiantes ...') 
                
                //Notifica al subscriptor que el observable ya no va a admitir mas data
                //subscriber.complete() 
            } ,1000)
        })
    }

    getInterval(): Observable<number>{
        return interval(1000)
    }

    getRoles(): Observable<string[]>{
        return of([
            'ADMING',
            'STUDENT',
            'SELLER'
        ]).pipe(delay(1000))
    }

    getFruit(): Observable<string[]>{
        return of ([
            'Manzanas', 'Bananas','Peras'
        ]).pipe(delay(3000))
    }
}