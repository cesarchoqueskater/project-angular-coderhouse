import { Teachers } from '../../teachers/models';

export interface Course{
    id: string;
    name: string;
    teachers?: Teachers[];
}