import { PROJECT_TYPE } from '../models/project-type-enum';


// Project
export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: PROJECT_TYPE
    ) {}
  }