import Image from "next/image";
import { memo } from "react";

// Memoize RowImage component to prevent unnecessary re-renders
const RowImage = memo((props) => {
  return (
    <div className="container">
      <div className="row mx-0">
        <div
          className={
            "col-lg-" +
            props.imageColLg +
            " col-xl-" +
            props.imageColXl +
            " col-md-" +
            props.imageColMd +
            " col-" +
            props.imageCol
          }
        >
          <Image
            src={props.ImgAbout || "/images/default.jpg"}
            className={props.ImgAboutClass}
            alt={props.imgAlt || "Image"}
            width={600}
            height={400}
            priority={false}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div
          className={
            "d-flex align-items-center col-lg-" +
            (12 - props.imageColLg) +
            " col-md-" +
            (12 - props.imageColMd) +
            " col-" +
            (12 - props.imageCol)
          }
        >
          <div className={props.divclass}>
            <h3 className="">
              {props.titleHeading}
              <span className={props.subHeadingClass}>{props.subHeading}</span>
            </h3>
            <p>{props.description}</p>
            {props.textAboutBtn ? (
              <a className={props.textAboutBtnCLass} href={props.btnLink}>
                {props.textAboutBtn}
              </a>
            ) : null}
            {props.textAboutBtn2 ? (
              <a className={props.textAboutBtnCLass2}>
                {props.textAboutBtn2}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

RowImage.displayName = 'RowImage';

export default RowImage;
