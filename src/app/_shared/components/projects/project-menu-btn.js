import { useProjectsContext } from "../../hooks/useProjectsContext";
import style from "./Projects.module.css";

export default function ProjectDotsBtn({ id }) {
  const { handleDotClick } = useProjectsContext();

  return (
    <div className={style.dotIcon} onClick={() => handleDotClick(id)}>
      <svg
        width="4"
        height="16"
        viewBox="0 0 4 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 14C1 14.5523 1.44772 15 2 15C2.55228 15 3 14.5523 3 14C3 13.4477 2.55228 13 2 13C1.44772 13 1 13.4477 1 14Z"
          stroke="#176B87"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7C1.44772 7 1 7.44772 1 8Z"
          stroke="#176B87"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z"
          stroke="#176B87"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
