import { Pacifico } from "next/font/google";
import Link from "next/link";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ClientLayout({ children }) {
  return (
    <>
      {/* <header>
        <div className="header">
          <div className="container">
            <div className="flex-container align-center-justify-space">
              <Link
                href={"/"}
                className="logo"
                style={{ fontFamily: `${pacifico.style.fontFamily}` }}
              >
                imitation
              </Link>

              <div className="flex-container">
                <Link
                  href={"/sign-in"}
                  className="log-btn sign-in bg-primary color-white"
                >
                  Sign in
                </Link>
                <Link
                  href={"/sign-up"}
                  className="log-btn sign-up color-primary"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <header>
        <div className="header-div">
          <div className="container">
            <div className="flexbox flex-align-justify">
              <Link
                href={"/"}
                className="logo"
                style={{ fontFamily: `${pacifico.style.fontFamily}` }}
              >
                imitation
              </Link>
              <div className="sign-btn-wrapper">
                <Link href={"/sign-in"} className="font-14 main-btn sign-btn">
                  Sign in
                </Link>
                <Link
                  href={"/sign-up"}
                  className="font-14 outlined-btn sign-btn"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
