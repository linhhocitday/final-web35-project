"use client";

import React, { useState } from "react";
import style from "./ProjectItem.module.css";

export default function ProjectApi() {
  const [api, setApi] = useState("https://648704a8beba6297278faca3.mockapi.io");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(api);
    console.log(api);

    setCopied(true);

    setTimeout(function () {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className={style.apiContainer}>
      <div className="flexbox flex-align-justify">
        <p>
          {api}
          <span className={style.endpoint}>/:endpoint</span>
        </p>

        <div className="relative">
          <div className={style.copyBtn} onClick={handleCopy}>
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33327 8.33333V4.91135C6.33327 3.54233 6.33327 2.85731 6.52703 2.33442C6.69747 1.87447 6.96924 1.50079 7.30374 1.26643C7.68403 1 8.18222 1 9.17785 1H14.1556C15.1512 1 15.6488 1 16.0291 1.26643C16.3636 1.50079 16.6358 1.87447 16.8062 2.33442C17 2.85731 17 3.54182 17 4.91084V11.7553C17 13.1243 17 13.8088 16.8062 14.3317C16.6358 14.7917 16.3633 15.1661 16.0288 15.4005C15.6489 15.6667 15.1518 15.6667 14.1581 15.6667H11.6665M6.33327 8.33333H3.84458C2.84895 8.33333 2.35076 8.33333 1.97047 8.59976C1.63597 8.83412 1.3642 9.2078 1.19376 9.66775C1 10.1906 1 10.8757 1 12.2447V19.0891C1 20.4581 1 21.1423 1.19376 21.6652C1.3642 22.1251 1.63597 22.4995 1.97047 22.7338C2.35039 23 2.84797 23 3.84166 23H8.82529C9.81898 23 10.3159 23 10.6958 22.7338C11.0303 22.4995 11.3025 22.1248 11.473 21.6648C11.6665 21.1424 11.6665 20.459 11.6665 19.0927V15.6667M6.33327 8.33333H8.8223C9.81794 8.33333 10.3155 8.33333 10.6958 8.59976C11.0303 8.83412 11.3025 9.2078 11.473 9.66775C11.6665 10.1901 11.6665 10.8743 11.6665 12.2407L11.6665 15.6667"
                stroke="#176B87"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={copied ? style.active : style.inactive}>Copied</div>
        </div>
      </div>
    </div>
  );
}
