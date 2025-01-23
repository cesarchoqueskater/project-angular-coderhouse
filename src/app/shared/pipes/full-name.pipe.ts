import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: Student, type?: 'uppercase' | 'lowercase'): string {
   
    /*
    let result = value;

    if ( type === 'lowercase' ){
      result = result.toLocaleLowerCase();
    }else{
      result = result.toUpperCase();
    }

    return result;
    */
   return `${value.lastName},  ${value.name}`;
  }

}
