import SignInForm from "@/app/_shared/components/sign-in/sign-in-form";
import style from "./SignIn.module.css";
import Link from "next/link";

export const metadata = {
  title: "Sign in | Imitation",
  description: "Sign in your account",
};

export default function SignIn() {
  return (
    <main className="container">
      <div className={style.signInContainer}>
        <Link href={"/"} className={style.backToHomeBtn}>
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

        <div className={style.formContainer}>
          <div className={style.formTitle}>
            <h2 className="uppercase color-176B87">
              Welcome <span className="color-64CCC5">back</span>
            </h2>
          </div>

          <div className={style.formWrapper}>
            <SignInForm />
          </div>
        </div>
      </div>
    </main>
  );
}
