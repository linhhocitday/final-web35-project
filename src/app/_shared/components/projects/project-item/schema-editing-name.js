"use client";

import React, { useRef } from "react";
import style from "./ProjectItem.module.css";

const SchemaEditingName = ({
  schema,
  handleChangeSchemaName,
  handleSetEditingName,
}) => {
  const schemaNameRef = useRef();

  return (
    <input
      type="text"
      defaultValue={schema.name}
      className={style.dataName}
      onClick={() => handleSetEditingName(schema.name)}
      onChange={(e) => handleChangeSchemaName(e, schemaNameRef)}
      ref={schemaNameRef}
      placeholder="Field name"
    />
  );
};

export default SchemaEditingName;
