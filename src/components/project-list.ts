import { projectState } from '../state/project-state';
import { DragTarget } from '../models/drag-drop';
import Component from './base-component';
import { PROJECT_TYPE } from '../models/project-type-enum';
import { ProjectItem } from './project-item';
import { Project } from '../models/project';
import { Autobind } from '../decorators/autobind';

  // Project List
 export  class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: PROJECT_TYPE) {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = [];
      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type == PROJECT_TYPE.active) {
            return prj.status === PROJECT_TYPE.active;
          } else {
            return prj.status === PROJECT_TYPE.finished;
          }
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        this.element.querySelector("ul")!.classList.add("droppable");
      }
    }
    @Autobind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer?.getData("text/plain");
      if (projectId) {
        projectState.moveProject(projectId, this.type);
      }
    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
      this.element.querySelector("ul")!.classList.remove("droppable");
    }
  }