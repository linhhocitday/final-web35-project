"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "./User.module.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const UserInformation = () => {
  const [token, setToken] = useState();

  const router = useRouter();

  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("token"));

    setToken(t);
  }, [token]);

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");

      const t = JSON.parse(localStorage.getItem("token"));
      setToken(t);

      router.push("/");
    }
  };

  return !token ? (
    <div className="sign-btn-wrapper">
      <Link href={"/sign-in"} className="font-14 main-btn sign-btn">
        Sign in
      </Link>
      <Link href={"/sign-up"} className="font-14 outlined-btn sign-btn">
        Sign up
      </Link>
    </div>
  ) : (
    <div className={style.userInforContainer}>
      <div className={style.signOutBtn} onClick={handleSignOut}>
        Sign out
      </div>

      <div className={style.userContainer}>
        <div className={style.userFirstLetter}>
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19C15 15.134 11.866 12 8 12C4.13401 12 1 15.134 1 19M8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5C12 7.20914 10.2091 9 8 9Z"
              stroke="#176B87"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
