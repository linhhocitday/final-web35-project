"use client";

import React, { useState, useRef, useEffect } from "react";
import style from "./Projects.module.css";
import Link from "next/link";
import ProjectDotsBtn from "./project-menu-btn";
import ProjectFunctionBtn from "./project-function-btn";
import DeleteNotice from "./project-delete-notice";
import { useProjectsContext } from "../../hooks/useProjectsContext";

const projectState = {
  dotClicked: false,
  isEditing: false,
  isDeleting: false,
};

const Project = ({ project }) => {
  const { handleRename } = useProjectsContext();

  const [projectUpdate, setProjectUpdate] = useState(projectState);

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      const itemMenu = menuRef.current;

      const dotBtnWrapper = itemMenu.querySelector(
        ".menu-btn-wrapper[active='active']"
      );

      if (dotBtnWrapper && !dotBtnWrapper.contains(e.target)) {
        setProjectUpdate({ ...project, dotClicked: false });
      }

      const inputEditing = itemMenu.querySelector("input[data-editing='true']");

      if (inputEditing && !inputEditing.contains(e.target)) {
        setProjectUpdate({ ...projectUpdate, isEditing: false });

        inputEditing.blur();
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleDotClick = () => {
    setProjectUpdate({
      ...projectUpdate,
      dotClicked: !projectUpdate.dotClicked,
    });
  };

  const handleEnter = (e) => {
    const itemMenu = menuRef.current;
    const nameInput = itemMenu.querySelector('input[type = "text"]');

    if (e.keyCode === 13) {
      setProjectUpdate({ ...projectUpdate, isEditing: false });

      nameInput.blur();
    }
  };

  const date = () => {
    const d = new Date(project.createdAt);

    const formedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

    return formedDate;
  };

  return (
    <div className={style.projectContainer} ref={menuRef}>
      <Link
        href={projectUpdate.isEditing ? "" : `/projects/${project.id}`}
        className={style.projectItem}
        data-editing={projectUpdate.isEditing ? "true" : "false"}
        draggable={projectUpdate.isEditing ? "false" : "true"}
      >
        <div className="flexbox flex-column flex-justify height-100">
          <div>
            <p className={style.createdAt}>{date()}</p>

            {projectUpdate.isEditing ? (
              <input
                type="text"
                value={project.name}
                className={style.projectNameInput}
                onChange={(e) => handleRename(project.id, e)}
                onKeyUp={(e) => handleEnter(e)}
                data-editing="true"
              />
            ) : (
              <input
                type="text"
                value={project.name}
                className={style.projectNameInput}
                readOnly="readOnly"
                data-editing="false"
              />
            )}
          </div>

          <div>{!project.resources ? 0 : project.resources} resources</div>
        </div>
      </Link>

      <div
        className="menu-btn-wrapper"
        active={projectUpdate.dotClicked ? "active" : "inactive"}
      >
        <ProjectDotsBtn id={project.id} handleDotClick={handleDotClick} />

        <ProjectFunctionBtn
          active={projectUpdate.dotClicked ? style.active : style.inactive}
          projectUpdate={projectUpdate}
          setProjectUpdate={setProjectUpdate}
          menuRef={menuRef}
        />
      </div>

      {projectUpdate.isDeleting && (
        <DeleteNotice
          project={project}
          projectUpdate={projectUpdate}
          setProjectUpdate={setProjectUpdate}
        />
      )}
    </div>
  );
};

export default Project;
