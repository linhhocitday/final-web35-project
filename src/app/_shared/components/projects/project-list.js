"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./Projects.module.css";
import ProjectsAdd from "./projects-add";
import { ProjectsContext } from "../../context/ProjectsContext";
import { baseURL } from "../../constant/constant";
import Project from "./project";
import { redirect } from "next/navigation";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [apiProjects, setApiProjects] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [nameValue, setNameValue] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      redirect("/");
    }

    async function getProjects() {
      let result = await fetch(`${baseURL}/api/v1/projects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        const project = await result.json();
        setApiProjects(project);
      }
    }

    getProjects();
  }, []);

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

  const addProject = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    let result = await fetch(`${baseURL}/api/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameValue,
      }),
    });

    const createdProject = await result.json();

    if (result.status === 201) {
      setApiProjects([createdProject, ...apiProjects]);
    } else {
      console.log("error");
    }

    setIsAdding(false);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        handleRename,
        apiProjects,
        setApiProjects,
      }}
    >
      {apiProjects == [] ? (
        <p className={style.blankText}>
          Oops, it seems that you did not have any project
        </p>
      ) : null}

      <div className={style.projectList}>
        <div className="grid grid-repeat-4 grid-gap-20 project-list-grid">
          <ProjectsAdd
            apiProjects={apiProjects}
            setApiProjects={setApiProjects}
            setIsAdding={setIsAdding}
          />

          {apiProjects &&
            apiProjects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
        </div>
      </div>

      {isAdding && (
        <div>
          <input
            type="text"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />

          <button onClick={addProject}>Add</button>
        </div>
      )}
    </ProjectsContext.Provider>
  );
}
