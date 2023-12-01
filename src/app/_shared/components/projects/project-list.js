"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./Projects.module.css";
import Link from "next/link";
import ProjectsAdd from "./projects-add";
import ProjectDotsBtn from "./project-menu-btn";
import ProjectFunctionBtn from "./project-function-btn";
import { ProjectsContext } from "../../context/ProjectsContext";
import DeleteNotice from "./project-delete-notice";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  // const [dotClicked, setDotClicked] = useState(false);

  const menuRef = useRef();

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

      const input = itemMenu.querySelectorAll("input[data-editing]");
      const inputEditing = itemMenu.querySelector("input[data-editing='true']");

      const editingIndex = projects.findIndex(
        (project) => project.isEditing == true
      );

      if (inputEditing && !input[editingIndex].contains(e.target)) {
        setProjects((projects) => {
          return projects.map((project) => {
            if (project.id == projects[editingIndex].id) {
              return { ...project, isEditing: false };
            }

            return { ...project };
          });
        });

        inputEditing.blur();
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

  const handleRename = (id, e) => {
    setProjects((projects) => {
      return projects.map((project) => {
        if (project.id == id) {
          return { ...project, name: e.target.value };
        }

        return { ...project };
      });
    });
  };

  const handleEnter = (id, e) => {
    const editing = projects.findIndex((project) => project.isEditing == true);

    const itemMenu = menuRef.current;
    const nameInput = itemMenu.querySelectorAll('input[type = "text"]');
    const renameInput = nameInput[editing];

    if (e.keyCode === 13) {
      setProjects((projects) => {
        return projects.map((project) => {
          if (project.id == id) {
            return { ...project, name: e.target.value, isEditing: false };
          }

          return { ...project };
        });
      });

      renameInput.blur();
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, handleDotClick, menuRef }}
    >
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
                  href={project.isEditing ? "" : `/projects/${project.id}`}
                  className={style.projectItem}
                  data-editing={project.isEditing ? "true" : "false"}
                  draggable={project.isEditing ? "false" : "true"}
                >
                  <div className="flexbox flex-column flex-justify height-100">
                    <div>
                      <p className={style.createdAt}>{project.createdAt}</p>

                      {/* {project.isEditing ? (
                        <input
                          type="text"
                          value={project.name}
                          className={style.projectNameInput}
                          onChange={(e) => handleRename(project.id, e)}
                          onKeyUp={handleEnter}
                        />
                      ) : (
                        <h3 className={style.projectName}>{project.name}</h3>
                      )} */}

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
                {/* <div ref={menuRef}> */}
                <div className="menu-btn-wrapper">
                  <ProjectDotsBtn id={project.id} />

                  <ProjectFunctionBtn
                    active={project.dotClicked ? style.active : style.inactive}
                  />
                </div>

                {project.isDeleting && <DeleteNotice project={project} />}
              </div>
            ))}
        </div>
      </div>
    </ProjectsContext.Provider>
  );
}
