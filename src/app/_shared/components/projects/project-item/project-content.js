"use client";

import style from "./ProjectItem.module.css";
import ProjectApi from "./project-api";
import MainButtons from "./project-main-btn";
import { useEffect, useRef, useState } from "react";
import ResourceAddNotice from "./resource-add-notice";
import { baseURL } from "@/app/_shared/constant/constant";
import { usePathname } from "next/navigation";
import ResourceDataNumber from "./resource-data-number";
import { faker } from "@faker-js/faker";
import ObjectID from "bson-objectid";
import ResourceShowData from "./resource-showing-data";
import ResourceName from "./resource-name";
import ResourceEditingSchemas from "./resource-editing-schemas";

export default function ProjectContent() {
  const [resources, setResources] = useState([]);
  const [creatingResource, setCreatingResource] = useState(false);
  const [projectId, setProjectId] = useState();
  const [showingData, setShowingData] = useState(false);
  const [editingSchemas, setEditingSchemas] = useState(false);
  const [willRenderData, setWillRenderData] = useState([]);
  const [willEditSchemas, setWillEditSchemas] = useState([]);
  const [resourceNewName, setResourceNewName] = useState("");

  const pathname = usePathname();

  const resourcesRef = useRef();

  // useEffect(() => {
  //   const handler = (e) => {
  //     const currentResource = resourcesRef.current;
  //     const nameInput = currentResource.querySelector(
  //       'input[data-rename = "true"]'
  //     );

  //     if (nameInput && !nameInput.contains(e.target)) {
  //       const editingIndex = resources.findIndex(
  //         (resource) => resource.nameEditing == true
  //       );

  //       setResources((resources) => {
  //         return resources.map((resource) => {
  //           if (resource.id == resources[editingIndex].id) {
  //             return {
  //               ...resource,
  //               nameEditing: false,
  //             };
  //           }

  //           return { ...resource };
  //         });
  //       });
  //     }
  //   };

  //   document.addEventListener("mouseup", handler);

  //   return () => {
  //     document.removeEventListener("mouseup", handler);
  //   };
  // });

  useEffect(() => {
    const idFromPathname = pathname.split("/").pop();

    setProjectId(idFromPathname);

    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      redirect("/");
    }

    async function getProjects() {
      let result = await fetch(
        `${baseURL}/api/v1/projects/${idFromPathname}/resources`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      result = await result.json();

      setResources(result);
    }

    getProjects();
  }, []);

  const handleCreatingResource = async (resourceName, resourceSchema) => {
    const newResource = {
      name: resourceName,
      data: [],
      schemas: resourceSchema,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    let result = await fetch(
      `${baseURL}/api/v1/projects/${projectId}/resources`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newResource),
      }
    );

    const createdProject = await result.json();

    if (result.status === 201) {
      setResources([createdProject, ...resources]);
    } else {
      console.log("error");
    }

    setCreatingResource(false);
  };

  const handleGenerateResources = async (n) => {
    for (let i = 0; i < resources.length; i++) {
      const data = createData(n, resources[i].schemas);

      const updatedResource = {
        name: resources[i].name,
        schemas: resources[i].schemas,
        data: data,
      };

      const token = JSON.parse(localStorage.getItem("token"));

      let result = await fetch(
        `${baseURL}/api/v1/projects/${projectId}/resources/${resources[i].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedResource),
        }
      );

      if (result.status === 200) {
        setResources((resources) => {
          return resources.map((resource) => {
            if (resource.id == resources[i].id) {
              return { id: resources[i].id, ...updatedResource };
            }

            return { ...resource };
          });
        });
      }
    }
  };

  const handleAddResource = () => {
    setCreatingResource(true);
  };

  // const handleRename = (id) => {
  //   const renameId = resources.findIndex((resource) => resource.id == id);

  //   const currentResource = resourcesRef.current;
  //   const nameInput = currentResource.querySelectorAll('input[type = "text"]');

  //   const editingResource = nameInput[renameId];

  //   editingResource.select();
  //   editingResource.focus();

  //   setResources((resources) => {
  //     return resources.map((resource) => {
  //       if (resource.id == id) {
  //         return {
  //           ...resource,
  //           nameEditing: true,
  //         };
  //       }

  //       return { ...resource };
  //     });
  //   });

  //   console.log(resources);
  // };

  const handleEditingName = (e, nameRef) => {
    const newName = e.target.value;

    const nameContainer = nameRef.current;
    const nameInput = nameContainer.querySelector('input[type="text"]');

    nameInput.value = newName;
    setResourceNewName(newName);
  };

  const handleEnter = async (e, currentResource, setNameEditing, nameRef) => {
    const nameContainer = nameRef.current;
    const nameInput = nameContainer.querySelector('input[data-rename="true"]');

    if (e.keyCode === 13) {
      if (resourceNewName == "") {
        setNameEditing(false);

        nameInput.blur();
      } else {
        const updatedResource = {
          name: resourceNewName,
          schemas: currentResource.schemas,
          data: currentResource.data,
        };

        const token = JSON.parse(localStorage.getItem("token"));

        let result = await fetch(
          `${baseURL}/api/v1/projects/${projectId}/resources/${currentResource.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedResource),
          }
        );

        if (result.status === 200) {
          setResources((resources) => {
            return resources.map((resource) => {
              if (resource.id == currentResource.id) {
                return { ...resource, name: resourceNewName };
              }

              return { ...resource };
            });
          });

          setNameEditing(false);

          nameInput.blur();
        }
      }
    }
  };

  function createData(n, schemas) {
    let data = [];

    for (let i = 0; i < n; i++) {
      const id = ObjectID().toHexString();

      let element = {};

      if (schemas) {
        for (let j = 0; j < schemas.length; j++) {
          let schema = schemas[j];

          let schemaId = schema.id;
          let schemaName = schema.name;
          let schemaType = schema.type;
          let schemaMethod = schema.fakerMethod;

          if (schemaType == "Object ID") {
            element[schemaName] = id;
          } else if (schemaType == "Faker.js") {
            if (schemaMethod == "data.recent") {
              element[schemaName] = faker.date.past().toString();
            } else if (schemaMethod == "name.fullName") {
              element[schemaName] = faker.person.fullName();
            } else if (schemaMethod == "image.avatar") {
              element[schemaName] = faker.image.avatar();
            }
          }
        }

        data.push(element);
      }
    }

    return data;
  }

  const handleSetDataNumber = async (event, id, name, schemas, dataRef) => {
    const dataBar = dataRef.current;
    const e = dataBar.getBoundingClientRect();

    let posX = Math.floor((event.clientX - e.left) / 4);

    if (posX < 0) {
      posX = 0;
    } else if (posX > 100) {
      posX = 100;
    }

    const data = createData(posX, schemas);

    const updatedResource = {
      name: name,
      schemas: schemas,
      data: data,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    let result = await fetch(
      `${baseURL}/api/v1/projects/${projectId}/resources/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedResource),
      }
    );

    if (result.status === 200) {
      setResources((resources) => {
        return resources.map((resource) => {
          if (resource.id == id) {
            return { id: id, ...updatedResource };
          }

          return { ...resource };
        });
      });
    }
  };

  const handleDeleteResource = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (confirm("Are you sure you want to delete?")) {
      let result = await fetch(
        `${baseURL}/api/v1/projects/${projectId}/resources/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        setResources((resources) => {
          return resources.filter((resource) => resource.id !== id);
        });
      }
    }
  };

  const handleShowData = (resource) => {
    setShowingData(true);
    setWillRenderData(resource);
  };

  const handleEditSchema = (resource) => {
    setEditingSchemas(true);
    setWillEditSchemas(resource);
  };

  return (
    <div>
      <div className={style.functionalityContainer}>
        <p className={style.apiTitle}>API endpoint</p>

        <ProjectApi />

        <MainButtons
          handleAddResource={handleAddResource}
          handleGenerateResources={handleGenerateResources}
        />
      </div>

      <div className={style.resourcesContainer}>
        <div className={style.resourcesLine}></div>

        <div ref={resourcesRef}>
          {resources.map((resource) => (
            <div key={resource.id} className={style.resourceWrapper}>
              <div className={style.resourceLeftLine}></div>

              <div className={style.resourceContainer}>
                <ResourceName
                  resource={resource}
                  handleEditingName={handleEditingName}
                  handleEnter={handleEnter}
                  resources={resources}
                  setResources={setResources}
                  resourceNewName={resourceNewName}
                />

                <div className={style.resourceContentWrapper}>
                  <ResourceDataNumber
                    handleSetDataNumber={handleSetDataNumber}
                    resource={resource}
                  />

                  <div className={style.resourceBtnContainer}>
                    <button
                      className={style.lowEmphasisBtn}
                      onClick={() => handleShowData(resource)}
                    >
                      Data
                    </button>

                    <button
                      className={style.lowEmphasisBtn}
                      onClick={() => handleEditSchema(resource)}
                    >
                      Edit
                    </button>

                    <button
                      className={style.lowEmphasisBtn}
                      onClick={() => handleDeleteResource(resource.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              {showingData && (
                <ResourceShowData
                  setShowingData={setShowingData}
                  resource={willRenderData}
                />
              )}

              {editingSchemas && (
                <ResourceEditingSchemas
                  setEditingSchemas={setEditingSchemas}
                  resource={willEditSchemas}
                  createData={createData}
                  setResources={setResources}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {creatingResource && (
        <ResourceAddNotice
          handleCreatingResource={handleCreatingResource}
          setCreatingResource={setCreatingResource}
        />
      )}
    </div>
  );
}
