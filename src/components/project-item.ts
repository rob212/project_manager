import { Draggable } from "../models/drag-drop";
import Component from "./base-component";
import { Project } from "../models/project";
import { Autobind } from "../decorators/autobind";

  // ProjectItem
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    get assignedPeople() {
      const count = this.project.people;
      if (count >= 2) {
        return `${count} people assigned`;
      } else {
        return `${count} person assigned`;
      }
    }

    constructor(hostElementId: string, project: Project) {
      super("single-project", hostElementId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.assignedPeople;
      this.element.querySelector("p")!.textContent = this.project.description;
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(_: DragEvent) {}
  }