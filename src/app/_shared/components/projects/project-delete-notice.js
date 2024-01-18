import { useEffect, useRef } from "react";
import style from "./Projects.module.css";
import { useProjectsContext } from "../../hooks/useProjectsContext";
import { baseURL } from "../../constant/constant";

export default function DeleteNotice({
  project,
  projectUpdate,
  setProjectUpdate,
}) {
  const { apiProjects, setApiProjects } = useProjectsContext();

  const deleteRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (deleteRef && !deleteRef.current.contains(e.target)) {
        handleCancel();
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleCancel = () => {
    setProjectUpdate({ ...projectUpdate, isDeleting: false });
  };

  const handleDelete = async () => {
    setProjectUpdate({ ...projectUpdate, isDeleting: false });

    const token = JSON.parse(localStorage.getItem("token"));

    let result = await fetch(`${baseURL}/api/v1/projects/${project.id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setApiProjects((apiProjects) => {
      return apiProjects.filter((p) => p.id !== project.id);
    });
  };

  return (
    <div className={style.deleteNoticeBg}>
      <div className={style.deleteNoticeContainer} ref={deleteRef}>
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

        <p className={style.deleteTitle}>
          Are you sure you want to delete{" "}
          <span>&quot;{project.name}&quot;</span>?
        </p>

        <p className={style.deleteSubTitle}>
          This will delete{" "}
          <span>
            {project.resources}{" "}
            {project.resources > 1 ? "resources" : "resource"}
          </span>{" "}
          inside as well
        </p>

        <div className={style.deleteButtons}>
          <div className="grid">
            <div className={style.secondaryBtn} onClick={handleCancel}>
              Cancel
            </div>
            <div className={style.primaryBtn} onClick={handleDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
