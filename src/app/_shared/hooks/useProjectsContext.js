import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  return { ...context };
};
