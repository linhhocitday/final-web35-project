"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./ProjectItem.module.css";
import { baseURL } from "@/app/_shared/constant/constant";
import { usePathname } from "next/navigation";

const ResourceName = ({
  resource,
  handleEditingName,
  handleEnter,
  resources,
  setResources,
  resourceNewName,
}) => {
  const [nameEditing, setNameEditing] = useState(false);

  const pathname = usePathname();

  const nameRef = useRef();

  useEffect(() => {
    const handler = async (e) => {
      const idFromPathname = pathname.split("/").pop();

      const nameContainer = nameRef.current;
      const nameInput = nameContainer.querySelector(
        'input[data-rename="true"]'
      );

      if (nameInput && !nameInput.contains(e.target)) {
        if (resourceNewName == "") {
          setNameEditing(false);

          nameInput.blur();
        } else {
          const updatedResource = {
            name: resourceNewName,
            schemas: resource.schemas,
            data: resource.data,
          };

          const token = JSON.parse(localStorage.getItem("token"));

          let result = await fetch(
            `${baseURL}/api/v1/projects/${idFromPathname}/resources/${resource.id}`,
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
              return resources.map((r) => {
                if (r.id == resource.id) {
                  return { ...r, name: resourceNewName };
                }

                return { ...r };
              });
            });

            setNameEditing(false);

            nameInput.blur();
          }
        }
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleRename = () => {
    const currentResource = nameRef.current;
    const nameInput = currentResource.querySelector('input[type="text"]');

    nameInput.select();
    nameInput.focus();

    setNameEditing(true);
  };

  return (
    <div className={style.resourceNameContainer} ref={nameRef}>
      {nameEditing ? (
        <input
          type="text"
          // value={resource.name}
          className={style.resourceNameInput}
          onChange={(e) => handleEditingName(e, nameRef)}
          onKeyUp={(e) => handleEnter(e, resource, setNameEditing, nameRef)}
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

      <div className={style.resourceEditNameBtn} onClick={handleRename}>
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
  );
};

export default ResourceName;
