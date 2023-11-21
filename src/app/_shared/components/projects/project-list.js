"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./Projects.module.css";
import Link from "next/link";
import ProjectsAdd from "./projects-add";
import ProjectDotsBtn from "./project-menu-btn";
import ProjectFunctionBtn from "./project-function-btn";
import { ProjectsContext } from "../../context/ProjectsContext";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  // const [dotClicked, setDotClicked] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      // if (dotClicked == true && !menuRef.current.contains(e.target)) {
      //   setDotClicked(false);
      // }

      const itemMenu = menuRef.current;
      const dotBtnWrapper = itemMenu.querySelectorAll(".menu-btn-wrapper");

      const active = projects.findIndex(
        (project) => project.dotClicked == true
      );

      const dotActive = dotBtnWrapper[active];

      // if (!dotActive.contains(e.target)) {
      //   console.log(dotActive);
      // }

      if (dotActive && !dotActive.contains(e.target)) {
        setProjects((projects) => {
          return projects.map((project) => {
            if (project.id === projects[active].id) {
              return { ...project, dotClicked: false };
            }

            return { ...project };
          });
        });
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleDotClick = (id) => {
    // setDotClicked(!dotClicked);
    const active = projects.find((project) => project.dotClicked == true);

    setProjects((projects) => {
      return projects.map((project) => {
        if (active) {
          active.dotClicked = false;
        }

        if (project.id == id) {
          if (active && project.id == active.id) {
            return { ...project, dotClicked: false };
          }

          return { ...project, dotClicked: !project.dotClicked };
        }

        return { ...project };
      });
    });
  };

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, handleDotClick }}>
      {projects == [] ? (
        <p className={style.blankText}>
          Oops, it seems that you did not have any project
        </p>
      ) : null}

      <div className={style.projectList}>
        <div
          className="grid grid-repeat-4 grid-gap-20 project-list-grid"
          ref={menuRef}
        >
          <ProjectsAdd />

          {projects &&
            projects.map((project) => (
              <div key={project.id} className={style.projectContainer}>
                <Link
                  href={`/projects/${project.id}`}
                  className={style.projectItem}
                >
                  <div className="flexbox flex-column flex-justify height-100">
                    <div>
                      <p className={style.createdAt}>{project.createdAt}</p>

                      <h3 className={style.projectName}>{project.name}</h3>
                    </div>

                    <div>{project.resources} resources</div>
                  </div>
                </Link>

                {/* <div ref={menuRef}> */}
                <div className="menu-btn-wrapper">
                  <ProjectDotsBtn id={project.id} />

                  <ProjectFunctionBtn
                    active={project.dotClicked ? style.active : style.inactive}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </ProjectsContext.Provider>
  );
}
