import React from "react";
import style from "./Home.module.css";

export default function HomePageBg() {
  return (
    <div className="left-col relative">
      <div className="absolute img-wrapper">
        <div
          className="image"
          style={{
            backgroundImage: "url(./home-main-img.png)",
          }}
        ></div>
      </div>

      <div className="absolute bg-text uppercase font-320 font-weight-900">
        Woah
      </div>

      <div className={style.biggestComment}>
        <div className={style.commentBg}>
          <div
            className={style.avt}
            style={{ backgroundImage: "url(./cmt1.jpg)" }}
          ></div>
          <p>Omg why it is so easy to use?!?!</p>
        </div>
      </div>

      <div className={style.smallerComment}>
        <div className={style.commentBg}>
          <div
            className={style.avt}
            style={{ backgroundImage: "url(./cmt2.webp)" }}
          ></div>
          <p>You guys really have to try this</p>
        </div>
      </div>

      <div className={style.smallestComment}>
        <div className={style.commentBg}>
          <div
            className={style.avt}
            style={{ backgroundImage: "url(./cmt3.jpg)" }}
          ></div>
          <p>This is so cool!!!</p>
        </div>
      </div>
    </div>
  );
}
