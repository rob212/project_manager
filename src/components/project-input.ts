import { projectState } from '../state/project-state.js';
import Component from '../components/base-component.js';
import { Validatable, valid } from '../utils/validation.js';
import { Autobind } from '../decorators/autobind.js';


  // Project Input
  export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
        minLength: 2,
      };

      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        minLength: 2,
        min: 1,
      };

      if (
        !valid(titleValidatable) ||
        !valid(descriptionValidatable) ||
        !valid(peopleValidatable)
      ) {
        alert("Invalid input, please try again!");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      // cannot use typeof or instanceOf due to the fact at runtime there is no Tuple.
      // however JS treats a tuple just lke an array so we check if we have an array.
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
      }
      this.clearInputs();
    }
  }