"use client";

import React, { useState } from "react";
import style from "./Projects.module.css";
import Link from "next/link";
import ProjectDotsBtn from "./project-menu-btn";
import ProjectFunctionBtn from "./project-function-btn";
import DeleteNotice from "./project-delete-notice";

const Project = ({ project }) => {
  // const [projectUpdate, setProjectUpdate] = useState({
  //   dotClicked: false,
  //   isEditing: false,
  //   isDeleting: false,
  // });

  return (
    <div className={style.projectContainer}>
      <Link
        href={project.isEditing ? "" : `/projects/${project.id}`}
        className={style.projectItem}
        data-editing={project.isEditing ? "true" : "false"}
        draggable={project.isEditing ? "false" : "true"}
      >
        <div className="flexbox flex-column flex-justify height-100">
          <div>
            <p className={style.createdAt}>{project.createdAt}</p>

            {project.isEditing ? (
              <input
                type="text"
                value={project.name}
                className={style.projectNameInput}
                onChange={(e) => handleRename(project.id, e)}
                onKeyUp={(e) => handleEnter(project.id, e)}
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

          <div>{project.resources} resources</div>
        </div>
      </Link>

      <div className="menu-btn-wrapper">
        <ProjectDotsBtn id={project.id} />

        <ProjectFunctionBtn
          active={project.dotClicked ? style.active : style.inactive}
        />
      </div>

      {project.isDeleting && <DeleteNotice project={project} />}
    </div>
  );
};

export default Project;
