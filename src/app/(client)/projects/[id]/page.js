import Link from "next/link";
import style from "../Projects.module.css";
import ProjectContent from "@/app/_shared/components/projects/project-item/project-content";
import ProjectApi from "@/app/_shared/components/projects/project-item/project-api";
import MainButtons from "@/app/_shared/components/projects/project-item/project-main-btn";

export default async function ProductDetail({ params: { id } }) {
  return (
    <main>
      <div className="container">
        <div className={style.projectItemContainer}>
          <Link href={"/projects"} className={style.backToPrjListBtn}>
            <div className="flexbox flex-align">
              <div className={style.arrowIcon}>
                <svg
                  width="9"
                  height="17"
                  viewBox="0 0 9 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.5L1 8.5L8 1.5"
                    stroke="#176B87"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="uppercase color-176B87">Back</p>
            </div>
          </Link>
          <div className="uppercase font-weight-600">
            <h2 className={style.projectTitle}>
              {id} <span className="color-64CCC5">project</span>
            </h2>
          </div>

          <ProjectContent />

          {/* <div className={style.functionalityContainer}>
            <p className={style.apiTitle}>API endpoint</p>

            <ProjectApi />

            <MainButtons />
          </div> */}
        </div>
      </div>
    </main>
  );
}
