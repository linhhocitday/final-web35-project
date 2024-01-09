"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./SignIn.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const signInForm = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(8, "Password must contain at least 8 characters"),
});

export default function SignInForm() {
  const router = useRouter();
  // const handleSignIn = () => {
  //   location.href = "/projects";
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInForm) });

  async function onSubmit(data) {
    console.log(data);

    let result = await fetch(`http://192.168.2.11:8080/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: data.email,
        password: data.password,
      }),
    });

    result = await result.json();

    localStorage.setItem("token", result.token);

    console.log(result);

    // location.href = "/projects";
    router.push("/projects");
  }

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
