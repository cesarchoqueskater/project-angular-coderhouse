import { Injectable } from "@angular/core";
import { Student } from "../../modules/dashboard/pages/students/models";
import { generateRandomString } from "../../shared/utils";

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
}