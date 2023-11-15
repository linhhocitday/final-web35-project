import Link from "next/link";
import "./homepage.css";
import HomePageBg from "../_shared/components/home/home-page-bg";
import HomeAdvertisement from "../_shared/components/home/home-advertisement";

export const metadata = {
  title: "Imitation",
  description: "The easiest way to mock REST APIs",
};

export default function Home() {
  return (
    <div className="landing-page-wrapper">
      <section className="landing-page-slide1 overflow-hidden">
        <div className="container relative">
          <div className="grid grid-5-7">
            <div className="right-col">
              <h1 className="uppercase font-weight-700 color-176B87 font-48 line-height-1">
                The <span className="color-64CCC5">easiest</span> way to mock
                REST APIs
              </h1>

              <div className="font-20 line-height-2">
                Quickly setup endpoints, generate custom data, and preform
                operations on it using RESTful interface.
              </div>

              <div>
                <Link
                  className="uppercase landing-page-btn font-weight-500 main-btn"
                  href={"/sign-in"}
                >
                  Get started
                </Link>
              </div>
            </div>

            <HomePageBg />
          </div>
        </div>

        <HomeAdvertisement />
      </section>
    </div>
  );
}
