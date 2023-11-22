import React from "react";
import style from "./Projects.module.css";
import { useProjectsContext } from "../../hooks/useProjectsContext";

export default function ProjectFunctionBtn({ active }) {
  const { projects, setProjects, menuRef } = useProjectsContext();

  const activeDot = projects.findIndex((project) => project.dotClicked == true);

  const handleRename = () => {
    setProjects((projects) => {
      return projects.map((project) => {
        if (projects[activeDot] && projects[activeDot].id == project.id) {
          return { ...project, dotClicked: false, isEditing: true };
        }
        return { ...project };
      });
    });

    const itemMenu = menuRef.current;
    const nameInput = itemMenu.querySelectorAll('input[type = "text"]');
    const renameInput = nameInput[activeDot];

    renameInput.select();
    renameInput.focus();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      console.log("deleted");
    } else {
      console.log("not deleted");
    }

    setProjects((projects) => {
      return projects.map((project) => {
        if (projects[activeDot] && projects[activeDot].id == project.id) {
          return { ...project, dotClicked: false };
        }
        return { ...project };
      });
    });
  };

  return (
    <div className={active}>
      <div className={style.functionButtons}>
        <div className={style.functionBtn} onClick={handleRename}>
          Rename
        </div>

        <div className={style.functionBtnLine}></div>

        <div className={style.functionBtn} onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
}
