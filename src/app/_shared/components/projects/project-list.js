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
    setNameValue("");
  };

  const handleCancel = () => {
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
          <div className={style.deleteNoticeBg} onClick={handleCancel}></div>

          <div className={style.addProjectNoticeContainer}>
            <div className={style.xIcon} onClick={handleCancel}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5597 12.0886C12.5906 12.1196 12.6151 12.1563 12.6319 12.1967C12.6486 12.2371 12.6572 12.2804 12.6572 12.3242C12.6572 12.3679 12.6486 12.4112 12.6319 12.4516C12.6151 12.492 12.5906 12.5288 12.5597 12.5597C12.5287 12.5906 12.492 12.6151 12.4516 12.6319C12.4112 12.6486 12.3679 12.6572 12.3241 12.6572C12.2804 12.6572 12.2371 12.6486 12.1967 12.6319C12.1562 12.6151 12.1195 12.5906 12.0886 12.5597L6.32861 6.7997L0.56862 12.5597C0.506161 12.6221 0.421445 12.6572 0.333107 12.6572C0.244769 12.6572 0.160046 12.6221 0.0975766 12.5597C0.0351069 12.4972 7.65329e-06 12.4125 1.25143e-09 12.3242C-7.65079e-06 12.2358 0.0350771 12.1511 0.0975359 12.0886L5.85755 6.32861L0.0975359 0.568579C0.0350771 0.50611 -7.65079e-06 0.421387 1.25143e-09 0.333049C3.79016e-06 0.289309 0.00862283 0.245997 0.0253651 0.205588C0.0421073 0.165178 0.0666448 0.128462 0.0975766 0.0975359C0.128508 0.0666095 0.165229 0.0420784 0.205641 0.0253431C0.246054 0.00860791 0.289366 -3.78765e-06 0.333107 1.24971e-09C0.421445 7.65329e-06 0.506161 0.0351069 0.56862 0.0975766L6.32861 5.85753L12.0886 0.0975766C12.1195 0.0666448 12.1562 0.0421073 12.1967 0.0253651C12.2371 0.00862283 12.2804 3.79015e-06 12.3241 1.24971e-09C12.3679 -3.78765e-06 12.4112 0.00860791 12.4516 0.0253431C12.492 0.0420784 12.5287 0.0666095 12.5597 0.0975359C12.5906 0.128462 12.6151 0.165178 12.6319 0.205588C12.6486 0.245997 12.6572 0.289309 12.6572 0.333049C12.6572 0.37679 12.6486 0.420102 12.6319 0.460515C12.6151 0.500927 12.5906 0.537648 12.5597 0.568579L6.79968 6.32861L12.5597 12.0886Z"
                  fill="black"
                />
              </svg>
            </div>

            <p className={style.addProjectNoticeTitle}>
              Project <span>name</span>
            </p>

            <p className={style.addProjectNoticeSubTitle}>
              Enter <span>meaningful</span> project name
            </p>

            <div className={style.addProjectNameInputContainer}>
              <input
                className={style.addProjectNoticeInput}
                type="text"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />

              <div className={style.deleteButtons}>
                <div className="grid">
                  <button className={style.secondaryBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                  {/* <div className={style.primaryBtn} onClick={handleDelete}>
                    Delete
                  </div> */}

                  {nameValue ? (
                    <button onClick={addProject} className={style.primaryBtn}>
                      Create
                    </button>
                  ) : (
                    <button
                      onClick={addProject}
                      className={style.primaryBtn}
                      disabled
                    >
                      Create
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProjectsContext.Provider>
  );
}
