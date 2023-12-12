"use client";

import { data } from "autoprefixer";
import style from "./ProjectItem.module.css";
import ProjectApi from "./project-api";
import MainButtons from "./project-main-btn";
import { useState } from "react";

export default function ProjectContent() {
  const [resources, setResource] = useState([
    // {
    //   id: 1,
    //   name: "Untitled",
    //   data: [
    //     { id: 1, name: "Linh" },
    //     { id: 2, name: "Dang" },
    //   ],
    // },
  ]);
  const [untitled, setUntitled] = useState(1);

  const handleAddResource = () => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    setUntitled(untitled + 1);

    setResource([
      {
        id: id,
        name: `Untitled ${untitled}`,
        data: [],
      },
      ...resources,
    ]);
  };

  return (
    <div>
      <div className={style.functionalityContainer}>
        <p className={style.apiTitle}>API endpoint</p>

        <ProjectApi />

        <MainButtons handleAddResource={handleAddResource} />
      </div>

      <div className={style.resourcesContainer}>
        <div className={style.resourcesLine}></div>

        <div>
          {resources.map((resource) => (
            <div key={resource.id} className={style.resourceWrapper}>
              <div className={style.resourceLeftLine}></div>

              <div className={style.resourceContainer}>
                <h3 className={style.resourceName}>{resource.name}</h3>

                <div className={style.resourceContentWrapper}>
                  <div className={style.resourceDataContainer}>
                    <div
                      className={style.resourceDataQuantity}
                      style={{ width: `${resource.data.length}%` }}
                    ></div>

                    <div className={style.resourceData}>
                      {resource.data.length}
                    </div>
                  </div>

                  <div className={style.resourceBtnContainer}>
                    <button className={style.lowEmphasisBtn}>Data</button>

                    <button className={style.lowEmphasisBtn}>Edit</button>

                    <button className={style.lowEmphasisBtn}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
