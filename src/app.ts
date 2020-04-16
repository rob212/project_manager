import ProjectInput from "./components/project-input";
import { ProjectList } from "./components/project-list";
import { PROJECT_TYPE } from "./models/project-type-enum";

new ProjectInput();
new ProjectList(PROJECT_TYPE.active);
new ProjectList(PROJECT_TYPE.finished);
