"use client";

import style from "./ProjectItem.module.css";

export default function MainButtons({
  handleAddResource,
  handleGenerateResources,
}) {
  return (
    <div className={style.mainBtnContainer}>
      <div className="flexbox flex-align-justify">
        <button className={style.newResourceBtn} onClick={handleAddResource}>
          <div className="uppercase color-white">New resource</div>
        </button>

        <div className={style.gridBtn}>
          <button
            className={style.secondaryBtn}
            onClick={() => handleGenerateResources(50)}
          >
            <div className="uppercase color-176B87">Generate all</div>
          </button>

          <button
            className={style.secondaryBtn}
            onClick={() => handleGenerateResources(0)}
          >
            <div className="uppercase color-176B87">Reset all</div>
          </button>
        </div>
      </div>
    </div>
  );
}
