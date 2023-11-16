import React from "react";
import style from "./Projects.module.css";

export default function ProjectFunctionBtn({ active }) {
  return (
    <div className={active}>
      <div className={style.functionButtons}>
        <div className={style.functionBtn}>Rename</div>

        <div className={style.functionBtnLine}></div>

        <div className={style.functionBtn}>Delete</div>
      </div>
    </div>
  );
}
