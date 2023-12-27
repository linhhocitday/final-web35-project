"use client";

import { data } from "autoprefixer";
import style from "./ProjectItem.module.css";
import ProjectApi from "./project-api";
import MainButtons from "./project-main-btn";
import { useEffect, useRef, useState } from "react";
import ResourceAddNotice from "./resource-add-notice";

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

  const [creatingResource, setCreatingResource] = useState(false);

  const resourcesRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      const currentResource = resourcesRef.current;
      const nameInput = currentResource.querySelector(
        'input[data-rename = "true"]'
      );

      if (nameInput && !nameInput.contains(e.target)) {
        const editingIndex = resources.findIndex(
          (resource) => resource.nameEditing == true
        );

        setResource((resources) => {
          return resources.map((resource) => {
            if (resource.id == resources[editingIndex].id) {
              return {
                ...resource,
                nameEditing: false,
              };
            }

            return { ...resource };
          });
        });
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleCreatingResource = (resourceAdd) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    setUntitled(untitled + 1);

    setResource([
      {
        id: id,
        name: resourceAdd.name,
        data: [],
        nameEditing: false,
      },
      ...resources,
    ]);

    setCreatingResource(false);
  };

  const handleAddResource = () => {
    setCreatingResource(true);
  };

  const handleRename = (id) => {
    const renameId = resources.findIndex((resource) => resource.id == id);

    const currentResource = resourcesRef.current;
    const nameInput = currentResource.querySelectorAll('input[type = "text"]');

    const editingResource = nameInput[renameId];

    editingResource.select();
    editingResource.focus();

    setResource((resources) => {
      return resources.map((resource) => {
        if (resource.id == id) {
          return {
            ...resource,
            nameEditing: true,
          };
        }

        return { ...resource };
      });
    });
  };

  const handleEditingName = (e, id) => {
    setResource((resources) => {
      return resources.map((resource) => {
        if (resource.id == id) {
          return { ...resource, name: e.target.value };
        }

        return { ...resource };
      });
    });
  };

  const handleEnter = (e, id) => {
    const editingIndex = resources.findIndex(
      (resource) => resource.nameEditing == true
    );

    const currentResource = resourcesRef.current;
    const nameInput = currentResource.querySelector(
      'input[data-rename = "true"]'
    );

    if (e.keyCode === 13) {
      setResource((resources) => {
        return resources.map((resource) => {
          if (resource.id == id) {
            return { ...resource, nameEditing: false };
          }

          return { ...resource };
        });
      });

      nameInput.blur();
    }
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

        <div ref={resourcesRef}>
          {resources.map((resource) => (
            <div key={resource.id} className={style.resourceWrapper}>
              <div className={style.resourceLeftLine}></div>

              <div className={style.resourceContainer}>
                <div className={style.resourceNameContainer}>
                  {/* <h3 className={style.resourceName}>{resource.name}</h3> */}

                  {/* <span
                    className={style.resourceNameTextbox}
                    role="textbox"
                    contenteditable={resource.nameEditing ? "true" : "false"}
                  >
                    {resource.name}
                  </span> */}

                  {resource.nameEditing ? (
                    <input
                      type="text"
                      value={resource.name}
                      className={style.resourceNameInput}
                      onChange={(e) => handleEditingName(e, resource.id)}
                      onKeyUp={(e) => handleEnter(e, resource.id)}
                      data-rename="true"
                    />
                  ) : (
                    <input
                      type="text"
                      value={resource.name}
                      className={style.resourceNameInput}
                      readOnly="readOnly"
                      data-rename="false"
                    />
                  )}

                  <div
                    className={style.resourceEditNameBtn}
                    onClick={() => handleRename(resource.id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 16.7931H17M1 16.7931V12.7931L9 4.79308M1 16.7931L5 16.7931L13 8.79307M9 4.79308L11.8686 1.92443L11.8704 1.92273C12.2652 1.52785 12.463 1.33006 12.691 1.25597C12.8919 1.19072 13.1082 1.19072 13.3091 1.25597C13.5369 1.33 13.7345 1.52757 14.1288 1.92189L15.8686 3.66169C16.2646 4.05771 16.4627 4.25581 16.5369 4.48413C16.6022 4.68498 16.6021 4.90132 16.5369 5.10217C16.4628 5.33033 16.265 5.52813 15.8695 5.92358L15.8686 5.92443L13 8.79307M9 4.79308L13 8.79307"
                        stroke="#64CCC5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

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

      {creatingResource && (
        <ResourceAddNotice
          handleCreatingResource={handleCreatingResource}
          setCreatingResource={setCreatingResource}
          untitled={untitled}
        />
      )}
    </div>
  );
}
