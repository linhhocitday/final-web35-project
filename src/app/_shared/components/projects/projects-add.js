"use client";

import { useProjectsContext } from "../../hooks/useProjectsContext";
import style from "./Projects.module.css";
import React, { useState } from "react";

export default function ProjectsAdd() {
  const { projects, setProjects } = useProjectsContext();

  const [untitled, setUntitled] = useState(1);

  const date = new Date();
  // const id = date.getTime();
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const created = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const clicked = () => {
    setUntitled(untitled + 1);
    setProjects([
      {
        id: id,
        name: `Untitled ${untitled}`,
        createdAt: created,
        resources: 0,
        dotClicked: false,
        isEditing: false,
        isDeleting: false,
      },
      ...projects,
    ]);
  };

  return (
    <div onClick={clicked} className={style.addProjectContainer}>
      <p className={style.addText}>Let’s make a new one</p>

      <div className={style.addIconCircleContainer}>
        <div className={style.addIconCircle}>
          <div className={style.addIcon}>
            <svg
              width="53"
              height="53"
              viewBox="0 0 53 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.996 52.6254V0.255814H27.8854V52.6254H24.996ZM0.255859 27.8853V24.9959H52.6255V27.8853H0.255859Z"
                fill="#64CCC5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
