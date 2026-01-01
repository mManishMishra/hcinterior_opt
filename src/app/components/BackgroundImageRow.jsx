"use client";
import { useEffect, useState, useRef } from "react";

const BackgroundImageRow = (props) => {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Use Intersection Observer for better performance - only load when near viewport
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load image when section is visible
            setLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${props.sectionBgImages} ${
        loaded ? "bg-loaded" : ""
      }`}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-12">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-6">
                <h1 className={props.secBgHeadingClass}>
                  {props.sectionBgHeading}
                </h1>
              </div>
              <div className="col-lg-6">
                <p className={props.secBgDesClass}>
                  {props.sectionBgDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundImageRow;
