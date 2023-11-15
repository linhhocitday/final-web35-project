"use client";

import React, { useState } from "react";
import ProjectsAdd from "./projects-add";
import style from "./Projects.module.css";
import Link from "next/link";
import ProjectDotsBtn from "./project-menu-btn";

export default function ProjectList() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Untitled 1", createdAt: "11/09/2023", resources: 2 },
  ]);

  return (
    <>
      {!projects && (
        <p className={style.blankText}>
          Oops, it seems that you didn’t have any project
        </p>
      )}

      <div className={style.projectList}>
        <div className="grid grid-repeat-4 grid-gap-20 project-list-grid">
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

                <ProjectDotsBtn />
              </div>
            ))}

          <ProjectsAdd />
        </div>
      </div>
    </>
  );
}
