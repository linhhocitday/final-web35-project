"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./Projects.module.css";
import ProjectsAdd from "./projects-add";
import { ProjectsContext } from "../../context/ProjectsContext";
import { baseURL } from "../../constant/constant";
import Project from "./project";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const token = JSON.parse(localStorage.getItem("token"));

      let result = await fetch(`${baseURL}/api/v1/users/${userId}/projects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      result = await result.json();

      console.log(result);
    }

    getProjects();
  }, []);

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
              <Project key={project.id} project={project} />
            ))}
        </div>
      </div>
    </ProjectsContext.Provider>
  );
}
