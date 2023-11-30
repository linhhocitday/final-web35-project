"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./SignUp.module.css";

export default function SignUpForm() {
  const handleSignIn = () => {
    location.href = "/projects";
  };

  return (
    <form className={style.signInForm}>
      <label className="uppercase">
        <span className={style.inputLabel}>User name:</span>
        <input
          type="text"
          placeholder="Enter your name"
          className={style.signInInput}
        />
      </label>

      <label className="uppercase">
        <span className={style.inputLabel}>Email:</span>
        <input
          type="email"
          placeholder="Enter your email"
          className={style.signInInput}
        />
      </label>

      <label className="uppercase">
        <span className={style.inputLabel}>Password:</span>
        <input
          type="password"
          placeholder="Enter your password"
          className={style.signInInput}
        />
      </label>

      <label className="uppercase">
        <span className={style.inputLabel}>Confirm password:</span>
        <input
          type="password"
          placeholder="Enter your password"
          className={style.signInInput}
        />
      </label>

      <div className={style.rememberField}>
        <label>
          <div className="flexbox flex-align">
            <div className={style.checkboxWrapper}>
              <input type="checkbox" />

              <div className={style.fakeCheckbox}></div>
            </div>

            <p>Remember me?</p>
          </div>
        </label>
      </div>

      <button type="button" className={style.signInBtn} onClick={handleSignIn}>
        <p className="uppercase color-white">Sign up</p>
      </button>

      <p className={style.or}>or</p>

      <button type="button" className={style.signInWithGgBtn}>
        <div className="text-align-center">
          <div className="flexbox flex-align flex-justify-center">
            <div
              className={style.googleIcon}
              style={{ backgroundImage: "url(./google-icon.png)" }}
            ></div>

            <p>Sign in with Google</p>
          </div>
        </div>
      </button>

      <div className={style.signUpLine}>
        Already have an account? Sign in{" "}
        <Link href={"/sign-in"} className={style.signUpLink}>
          here
        </Link>
      </div>
    </form>
  );
}