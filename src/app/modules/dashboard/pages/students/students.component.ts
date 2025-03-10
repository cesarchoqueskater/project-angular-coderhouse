import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { StudentsService } from '../../../../core/services/students.service';
import { first, take, map, tap, filter, forkJoin, Subscription, concatMap, Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, OnDestroy {

  studentForm: FormGroup;

  students: Student[] = [
    {
      id: generateRandomString(6),
      name: 'Cesar',
      lastName: 'Choquehuanca',
      age: 28,
      active: true
    }
  ];


  displayedColumns: string[] = ['id', 'lastName', 'age', 'active', 'actions'];
  dataSource = [];

  editingStudentId: string | null = null;


  isLoading = false;
  hasError = false;

  studentsSubscription?: Subscription;

  // Version Antigua
  //rolesAndFruit : string[] = [];

  rolesAndFruit$: Observable<string[]>;

  constructor(private fb: FormBuilder,
    //private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {

    this.rolesAndFruit$ =   this.studentsService.getRoles().pipe(
      concatMap((roles) => this.studentsService.getFruit()
        .pipe(map((fruit) => [...roles, ...fruit])))
    )

    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.max(99)]],
      active: [true]
    })
  }
  ngOnDestroy(): void {
    // Sale de la vista
    this.studentsSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    // this.loadStudentsFromPromise()
    //this.loadStudentsFromObs();
    //this.subscribeToInverval();

    //this.loadFruitAndRoles();
    //this.loadFruitWithRoles();
  }

  /*
  loadFruitWithRoles(): void {
    this.studentsService.getRoles().pipe(
      concatMap((roles) => this.studentsService.getFruit()
        .pipe(map((fruit) => [...roles, ...fruit])))
    )
      .subscribe({
        next: (result) => (this.rolesAndFruit = result) //console.log(result),
      })
  }
  */

  loadFruitAndRoles(): void {

    this.isLoading = true;

    //Recibe Observables no Subscripciones

    forkJoin([
      this.studentsService.getRoles(),
      this.studentsService.getFruit()
    ]).subscribe({
      next: (value) => {
        console.log(`Recibimos roles: `, value[0]);
        console.log(`Recibimos fruit: `, value[1]);
      },
      complete: () => {
        this.isLoading = false;
      }
    })

    /*
    this.studentsService.getRoles().subscribe({
      next: (roles) => {
        console.log(`Cargamos los roles ${roles.join(', ')}`);
      }
    });
    this.studentsService.getFruit().subscribe({
      next: (fruit) => {
        console.log(`Cargamos los frutas ${fruit.join(', ')}`);
      }
    });
    */



  }

  subscribeToInverval(): void {
    this.studentsService.getInterval()
      .pipe(
        take(5),
        tap((value) => console.log('El valo antes del primer map es: ', value)),
        map((value) => value * 2),
        tap((value) => console.log('El valo antes del segundo map es: ', value)),
        map((value) => value * 2),
        filter((value) => value < 8)
      )
      .subscribe({
        next: (value) => {
          console.log(value);
        }
      });
  }

  loadStudentsFromObs(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService.getStudentsObservable()
      .pipe(
        //first()
        take(3)
      )
      .subscribe({
        next: (students) => {
          console.log('Recibimos data: ', students)
          this.students = [...students];
          this.isLoading = false;
        },
        error: (error) => {
          alert(error);
          this.hasError = true;
          this.isLoading = false;
        },
        complete: () => {
          //this.isLoading = false;
        }
      })
  }

  loadStudentsFromPromise(): void {
    this.isLoading = true;
    // Se ejecuta despues del constructor, al iniciar el component 
    this.studentsService.getStudentsPromise().then((students) => {
      this.students = students
      this.hasError = false;
    })
      .catch((error) => {
        this.hasError = true;
        console.error(error)
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  get ageValidation() {
    return this.studentForm.get('age');
  }

  getErrorMessage() {
    const field = this.ageValidation;
    if (field?.hasError('max')) {
      return 'El valor de la edad debe ser menor a 99 años';
    }
    return '';
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      console.log(this.studentForm.value);

      if (!!this.editingStudentId) {
        this.students = this.students.map((student) =>
          student.id === this.editingStudentId
            ? { ...student, ...this.studentForm.value }
            : student
        );

        this.editingStudentId = null
      } else {
        this.students = [
          ...this.students,
          {
            id: generateRandomString(6),
            ...this.studentForm.value
          }
        ];
      }

      this.studentForm.reset();
      /*
      this.students.push({
        id : generateRandomString(6),
        ...this.studentForm.value
      })
        */
    }
  }

  onDelete(id: string) {
    if (confirm('Estas seguro?')) {
      this.students = this.students.filter((el) => el.id != id);
    }
  }

  onColorUpdated() {
    console.log("Se actualizo el color de fondo del elemento")
  }

  onFontSize() {
    console.log("Se modifico el tamaño de la fuente")
  }

  onEdit(student: Student): void {
    this.editingStudentId = student.id;
    this.studentForm.patchValue({
      name: student.name,
      lastName: student.lastName,
      age: student.age,
      active: student.active
    })
  }

}
