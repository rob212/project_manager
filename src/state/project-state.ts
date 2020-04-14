import { Project } from "../models/project.js";
import { PROJECT_TYPE } from "../models/project-type-enum.js";
import { State } from "./state-interface.js";

// Project State Management
// this will hold all state of the app and interested components can dsubscribe
// this is effectively a similar approach to Redux pattern.
// this is an singleton as we only want one of these per context of the app

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  moveProject(projectId: string, newStatus: PROJECT_TYPE) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
    }
    this.updateListeners();
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      PROJECT_TYPE.active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      // loop through all the listen functions calling them and passing a copy of the state
      // that's what the slice method does is pass a copy so the state can't be changed by anything else.
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();