import { Pacifico } from "next/font/google";
import Link from "next/link";
import UserInformation from "../_shared/components/user-information/user-information";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ClientLayout({ children }) {
  return (
    <>
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

              <UserInformation />
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
