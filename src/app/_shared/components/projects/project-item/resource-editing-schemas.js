"use client";

import React, { useEffect, useState } from "react";
import style from "./ProjectItem.module.css";
import { baseURL } from "@/app/_shared/constant/constant";
import { usePathname } from "next/navigation";
import SchemaEditingName from "./schema-editing-name";

const ResourceEditingSchemas = ({
  setEditingSchemas,
  resource,
  createData,
  setResources,
}) => {
  const pathname = usePathname();

  const resourceSchemas = resource.schemas;

  const [updatedSchemas, setUpdatedSchemas] = useState(resourceSchemas);
  const [blankSchemaName, setBlankSchemaName] = useState();
  const [editingNameSchema, setEditingNameSchema] = useState();

  useEffect(() => {
    setUpdatedSchemas((schemas) => {
      return schemas.map((schema) => {
        const id =
          Date.now().toString(36) + Math.random().toString(36).substr(2);

        return { id: id, ...schema };
      });
    });
  }, []);

  useEffect(() => {
    const blank = updatedSchemas.find((schema) => schema.name == "");

    setBlankSchemaName(blank);
  }, [updatedSchemas]);

  const fakerJs = ["data.recent", "name.fullName", "image.avatar"];

  const handleCancel = () => {
    setEditingSchemas(false);

    console.log(updatedSchemas);
  };

  const handleSetEditingName = (name) => {
    // const currentSchema = updatedSchemas.find((schema) => schema.name == name);
    // setEditingNameSchema(currentSchema.id);
  };

  const handleChangeSchemaName = (e, schemaNameRef) => {
    // const newName = e.target.value;
    // let nameInput = schemaNameRef.current;
    // nameInput.value = newName;
    // setUpdatedSchemas((schemas) => {
    //   return schemas.map((schema) => {
    //     if (schema.id == editingNameSchema) {
    //       console.log(schema.id);
    //       return { ...schema, name: newName };
    //     }
    //     return { ...schema };
    //   });
    // });
    // console.log(updatedSchemas);
  };

  const handleChangeSchemaType = (e, name) => {
    if (e.target.value === "Faker.js") {
      setUpdatedSchemas((schema) => {
        return schema.map((s) => {
          if (s.name == name) {
            return { ...s, type: e.target.value, fakerMethod: fakerJs[0] };
          }

          return { ...s };
        });
      });
    } else {
      setUpdatedSchemas((schema) => {
        return schema.map((s) => {
          if (s.name == name) {
            return { ...s, type: e.target.value, fakerMethod: "" };
          }

          return { ...s };
        });
      });
    }
  };

  const handleChangeFakerMethod = (e, name) => {
    setUpdatedSchemas((schema) => {
      return schema.map((s) => {
        if (s.name == name) {
          return { ...s, fakerMethod: e.target.value };
        }

        return { ...s };
      });
    });
  };

  const handleAddData = () => {
    console.log("edit add schema");
  };

  const handleUpdateSchemas = async () => {
    const idFromPathname = pathname.split("/").pop();

    const updatedResource = {
      name: resource.name,
      schemas: updatedSchemas,
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

    handleCancel();

    if (result.status === 200) {
      const data = createData(resource.data.length, updatedSchemas);

      const updatedData = {
        name: resource.name,
        schemas: updatedSchemas,
        data: data,
      };

      let dataResult = await fetch(
        `${baseURL}/api/v1/projects/${idFromPathname}/resources/${resource.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (dataResult.status === 200) {
        setResources((resources) => {
          return resources.map((r) => {
            if (r.id == resource.id) {
              return { id: resource.id, ...updatedData };
            }

            return { ...r };
          });
        });
      } else {
        alert("Can not update resource");
      }
    } else {
      alert("Can not update resource");
    }
  };

  return (
    <div>
      <div className={style.resourceAddNoticeBg} onClick={handleCancel}></div>

      <div className={style.resourceShowDataContainer}>
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
            Schema <span>(optional)</span>
          </p>
        </div>

        <div className={style.ResourceAddNoticeContent}>
          <div className={style.createResourceContainer}>
            <ul>
              {updatedSchemas.map((schema) => (
                <li
                  key={schema.name}
                  className={style.createResourceSchemaContainer}
                >
                  {/* <input
                    type="text"
                    value={schema.name}
                    className={style.dataName}
                    // onClick={() => handleSetEditingName(schema.name)}
                    onChange={(e) => handleChangeSchemaName(e)}
                    ref={schemaNameRef}
                    placeholder="Field name"
                  /> */}

                  <SchemaEditingName
                    schema={schema}
                    handleChangeSchemaName={handleChangeSchemaName}
                    handleSetEditingName={handleSetEditingName}
                  />

                  {schema.type === "Object ID" ? (
                    <input
                      value={schema.type}
                      className={style.dataTypes}
                      readOnly
                      disabled
                    />
                  ) : (
                    <select
                      id={`data-types${schema.name}`}
                      className={style.dataTypes}
                      value={schema.type}
                      onChange={(e) => handleChangeSchemaType(e, schema.name)}
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

                  {schema.type === "Faker.js" && (
                    <select
                      id={`faker-method${schema.name}`}
                      className={style.dataTypes}
                      value={schema.fakerMethod}
                      onChange={(e) => handleChangeFakerMethod(e, schema.name)}
                    >
                      {fakerJs.map((faker) => (
                        <option key={schema.name + faker} value={faker}>
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

          {blankSchemaName ? (
            <button disabled className={style.createResourceBtn}>
              Update
            </button>
          ) : (
            <button
              onClick={() => handleUpdateSchemas()}
              className={style.createResourceBtn}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceEditingSchemas;
