"use client";

import React, { useRef } from "react";
import style from "./ProjectItem.module.css";

const ResourceDataNumber = ({ handleSetDataNumber, resource }) => {
  const dataRef = useRef();
  return (
    <div
      className={style.resourceDataContainer}
      onClick={(e) =>
        handleSetDataNumber(
          e,
          resource.id,
          resource.name,
          resource.schemas,
          dataRef
        )
      }
      ref={dataRef}
    >
      <div
        className={style.resourceDataQuantity}
        style={{ width: `${resource.data.length}%` }}
      ></div>

      <div className={style.resourceData}>{resource.data.length}</div>
    </div>
  );
};

export default ResourceDataNumber;
