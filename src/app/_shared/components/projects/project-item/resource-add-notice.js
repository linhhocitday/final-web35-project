"use client";

import { useEffect, useRef, useState } from "react";
import style from "./ProjectItem.module.css";

export default function ResourceAddNotice({
  handleCreatingResource,
  setCreatingResource,
  untitled,
}) {
  const untitledValue = `untitled${untitled}`;
  const [dataNameCount, setDataNameCount] = useState(1);
  const [resourceAdd, setResourceAdd] = useState({
    name: untitledValue,
    data: {
      0: { name: "id", type: "Object ID" },
      1: {
        name: "createAt",
        type: "Faker.js",
        fakerMethod: "data.recent",
      },
      2: {
        name: "name",
        type: "Faker.js",
        fakerMethod: "name.fullName",
      },
      3: {
        name: "avatar",
        type: "Faker.js",
        fakerMethod: "image.avatar",
      },
    },
  });

  const fakerJs = ["data.recent", "name.fullName", "image.avatar"];

  const createRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (createRef && !createRef.current.contains(e.target)) {
        handleCancel();
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleCancel = () => {
    setCreatingResource(false);
  };

  const handleSetNewName = (e) => {
    setResourceAdd({ ...resourceAdd, name: e.target.value });
  };

  const handleChangeDataName = (e, key) => {
    setResourceAdd({
      ...resourceAdd,
      data: {
        ...resourceAdd.data,
        [key]: { ...resourceAdd.data[key], name: e.target.value },
      },
    });
  };

  const handleChangeDataType = (e, key) => {
    if (e.target.value === "Faker.js") {
      setResourceAdd({
        ...resourceAdd,
        data: {
          ...resourceAdd.data,
          [key]: {
            ...resourceAdd.data[key],
            type: e.target.value,
            fakerMethod: fakerJs[0],
          },
        },
      });
    } else {
      setResourceAdd({
        ...resourceAdd,
        data: {
          ...resourceAdd.data,
          [key]: {
            ...resourceAdd.data[key],
            type: e.target.value,
            fakerMethod: "",
          },
        },
      });
    }
  };

  const handleChangeFakerMethod = (e, key) => {
    setResourceAdd({
      ...resourceAdd,
      data: {
        ...resourceAdd.data,
        [key]: { ...resourceAdd.data[key], fakerMethod: e.target.value },
      },
    });
  };

  const handleAddData = () => {
    const key = Date.now().toString(36) + Math.random().toString(36).substr(2);

    setResourceAdd({
      ...resourceAdd,
      data: {
        ...resourceAdd.data,
        [key]: {
          name: `untitled${dataNameCount}`,
          type: "Faker.js",
          fakerMethod: fakerJs[0],
        },
      },
    });

    setDataNameCount(dataNameCount + 1);
  };

  return (
    <div className={style.resourceAddNoticeBg}>
      <div className={style.resourceAddNoticeContainer} ref={createRef}>
        <div className={style.resourceAddNoticeTitle}>
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

          <p className={style.createResourceTitle}>
            New <span>resource</span>
          </p>
        </div>

        <div className={style.ResourceAddNoticeContent}>
          <div className={style.createResourceContainer}>
            <p className={style.createResourceSubTitle}>Resource name</p>
            <p className={style.createResourceDescribe}>
              Enter meaningful resource name, it will be used to{" "}
              <span>generate API endpoints.</span>
            </p>

            <input
              className={style.createResourceNameInput}
              type="text"
              value={resourceAdd.name}
              onChange={(e) => handleSetNewName(e)}
            />
          </div>

          <div className={style.createResourceContainer}>
            <p className={style.createResourceSubTitle}>Schema</p>
            <p className={style.createResourceDescribe}>
              Define Resource schema, it will be used to{" "}
              <span>generate mock data.</span>
            </p>

            <ul>
              {Object.keys(resourceAdd.data).map((key) => (
                <li key={key} className={style.createResourceSchemaContainer}>
                  <input
                    type="text"
                    value={resourceAdd.data[key].name}
                    className={style.dataName}
                    onChange={(e) => handleChangeDataName(e, key)}
                    placeholder="Field name"
                  />

                  {resourceAdd.data[key].type === "Object ID" ? (
                    <input
                      value={resourceAdd.data[key].type}
                      className={style.dataTypes}
                      readOnly
                      disabled
                    />
                  ) : (
                    <select
                      id={`data-types${key}`}
                      className={style.dataTypes}
                      value={resourceAdd.data[key].type}
                      onChange={(e) => handleChangeDataType(e, key)}
                    >
                      <option value="Faker.js">Faker.js</option>
                      <option value="String">String</option>
                      <option value="Number">Number</option>
                      <option value="Boolean">Boolean</option>
                      <option value="Object">Object</option>
                      <option value="Array">Array</option>
                      <option value="Date">Date</option>
                    </select>
                  )}

                  {resourceAdd.data[key].type === "Faker.js" && (
                    <select
                      id={`faker-method${key}`}
                      className={style.dataTypes}
                      value={resourceAdd.data[key].fakerMethod}
                      onChange={(e) => handleChangeFakerMethod(e, key)}
                    >
                      {fakerJs.map((faker) => (
                        <option key={key + faker} value={faker}>
                          {faker}
                        </option>
                      ))}
                    </select>
                  )}
                </li>
              ))}

              <li className={style.createResourceSchemaContainer}>
                <div className={style.addDataBtn} onClick={handleAddData}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.50345 18V0H9.49655V18H8.50345ZM0 9.49655V8.50345H18V9.49655H0Z"
                      fill="#176B87"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.createBtnContainer}>
          <button
            onClick={() => handleCancel()}
            className={style.cancelCreateResourceBtn}
          >
            Cancel
          </button>

          <button
            onClick={() => handleCreatingResource(resourceAdd)}
            className={style.createResourceBtn}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
