"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./SignUp.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseURL } from "../../constant/constant";

const signUpForm = z
  .object({
    // userName: z
    //   .string()
    //   .min(1, "User name must contain at least 1 character")
    //   .max(20, "User name must contain at most 20 characters"),
    email: z.string().trim().email(),
    password: z
      .string()
      .trim()
      .min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      redirect("/projects");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpForm) });

  async function onSubmit(data) {
    console.log(data);

    let result = await fetch(`${baseURL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: data.email,
        email: data.email,
        password: data.password,
      }),
    });

    result = await result.json();

    localStorage.setItem("token", JSON.stringify(result.token));

    location.href = "/projects";
  }

  return (
    <form className={style.signInForm} onSubmit={handleSubmit(onSubmit)}>
      {/* <label className="uppercase">
        <span className={style.inputLabel}>User name:</span>

        <input
          type="text"
          placeholder="Enter your name"
          className={
            errors.userName ? style.signInInputError : style.signInInput
          }
          {...register("userName")}
        />

        <div className={style.errorContainer}>
          {errors.userName && (
            <p className={style.errorMessage}>*{errors.userName.message}</p>
          )}
        </div>
      </label> */}

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

      <label className="uppercase">
        <span className={style.inputLabel}>Confirm password:</span>

        <input
          type="password"
          placeholder="Enter your password"
          className={
            errors.confirmPassword ? style.signInInputError : style.signInInput
          }
          {...register("confirmPassword")}
        />

        <div className={style.errorContainer}>
          {errors.confirmPassword && (
            <p className={style.errorMessage}>
              *{errors.confirmPassword.message}
            </p>
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
