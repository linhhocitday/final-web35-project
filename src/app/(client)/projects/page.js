import ProjectsAdd from "@/app/_shared/components/projects/projects-add";
import style from "./Projects.module.css";
import ProjectList from "@/app/_shared/components/projects/project-list";

export const metadata = {
  title: "Projects | Imitation",
  description: "Your project list",
};

export default function Projects() {
  return (
    <div className={style.projectsContainer}>
      <div className="container">
        <h1 className="color-176B87 uppercase font-weight-600">
          Your <span className="color-64CCC5">projects</span>
        </h1>

        <ProjectList />
      </div>
    </div>
  );
}
