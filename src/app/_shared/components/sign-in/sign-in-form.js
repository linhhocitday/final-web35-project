"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./SignIn.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInForm = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(8, "Password must contain at least 8 characters"),
});

export default function SignInForm() {
  // const handleSignIn = () => {
  //   location.href = "/projects";
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInForm) });

  const onSubmit = (data) => {
    console.log(data);

    location.href = "/projects";
  };

  return (
    <form className={style.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <label className="uppercase">
        <span className={style.inputLabel}>Email:</span>

        <input
          type="email"
          placeholder="Enter your email"
          className={errors.email ? style.signInInputError : style.signInInput}
          {...register("email")}
        />

        <div className={style.errorContainer}>
          {errors.email && (
            <p className={style.errorMessage}>*{errors.email.message}</p>
          )}
        </div>
      </label>

      <label className="uppercase">
        <span className={style.inputLabel}>Password:</span>

        <input
          type="password"
          placeholder="Enter your password"
          className={
            errors.password ? style.signInInputError : style.signInInput
          }
          {...register("password")}
        />

        <div className={style.errorContainer}>
          {errors.password && (
            <p className={style.errorMessage}>*{errors.password.message}</p>
          )}
        </div>
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

      <button
        type="submit"
        className={style.signInBtn}
        // onClick={handleSignIn}
      >
        <p className="uppercase color-white">Sign in</p>
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
        Do not have an account? Sign up{" "}
        <Link href={"/sign-up"} className={style.signUpLink}>
          here
        </Link>
      </div>
    </form>
  );
}
