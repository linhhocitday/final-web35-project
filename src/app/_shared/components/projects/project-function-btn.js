import React from "react";
import style from "./Projects.module.css";

export default function ProjectFunctionBtn({
  active,
  projectUpdate,
  setProjectUpdate,
  menuRef,
}) {
  const handleRename = () => {
    setProjectUpdate({ ...projectUpdate, dotClicked: false, isEditing: true });

    const itemMenu = menuRef.current;
    const nameInput = itemMenu.querySelector('input[type = "text"]');

    nameInput.select();
    nameInput.focus();
  };

  const handleDelete = () => {
    setProjectUpdate({ ...projectUpdate, dotClicked: false, isDeleting: true });
  };

  return (
    <div className={active}>
      <div className={style.functionButtons}>
        <div className={style.functionBtn} onClick={handleRename}>
          Rename
        </div>

        <div className={style.functionBtnLine}></div>

        <div className={style.functionBtn} onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
}
