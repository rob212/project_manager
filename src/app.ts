import ProjectInput from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
import { PROJECT_TYPE } from "./models/project-type-enum.js";

new ProjectInput();
new ProjectList(PROJECT_TYPE.active);
new ProjectList(PROJECT_TYPE.finished);
