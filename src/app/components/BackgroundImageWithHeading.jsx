"use client";
import { useEffect, useState } from "react";

const BackgroundImageWithHeading = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      className={`${props.sectionBgImages} ${
        loaded ? "bg-loaded" : ""
      }`}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-12">
            <h1 className={props.secBgHeadingClass}>
              {props.sectionBgHeading}
            </h1>
            <p className={props.secBgDesClass}>
              {props.sectionBgDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundImageWithHeading;
