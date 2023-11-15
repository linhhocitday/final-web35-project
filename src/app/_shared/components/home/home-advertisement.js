import React from "react";
import style from "./Home.module.css";

export default function HomeAdvertisement() {
  return (
    <div className="bg-light-blue relative">
      <div className={style.blocksContainer}>
        <div className={style.blocksAbsolute}>
          <div className="flexbox">
            <div>
              <div className={style.block1}></div>
              <div className={style.block2}></div>
            </div>

            <div>
              <div className={style.block3}></div>
            </div>

            <div>
              <div className={style.block4}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.content}>
        <div className="container">
          <div className="grid grid-repeat-3">
            <div>
              <h2 className="font-20 color-176B87 font-weight-500">
                Relations between resources
              </h2>

              <div className="color-64CCC5 line-height-3">
                Setup relations between resoures and automatically generate
                endpoints
              </div>
            </div>

            <div>
              <h2 className="font-20 color-176B87 font-weight-500">
                Simple data modeling
              </h2>

              <div className="color-64CCC5 line-height-3">
                Define resource schema and data generators for each field
              </div>
            </div>

            <div>
              <h2 className="font-20 color-176B87 font-weight-500">
                Free for life
              </h2>

              <div className="color-64CCC5 line-height-3">
                You can make as much project and resource as you like
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
