"use client";
import Image from "next/image";

export default function HeroCarousel({ bannerData }) {
  // Fallback if data is missing
  const banners = bannerData?.slice(0, 3) || [];

  return (
    <section className="position-relative">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {banners.map((banner, index) => {
            const isVideo = banner?.banner_image?.endsWith(".mp4");
            return (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                {isVideo ? (
                  <video width="100%" className="object-fit-cover home_video_banner" autoPlay loop muted playsInline>
                    <source src={banner?.banner_image ?? "/images/home-banner-1.mp4"} type="video/mp4" />
                  </video>
                ) : (
                  <div className="position-relative w-100" style={{ aspectRatio: "21/9", minHeight: "500px" }}>
                    <Image
                      src={banner?.banner_image ?? "/images/home-banner-1.png"}
                      className="d-block carousel_img object-fit-cover"
                      alt={banner?.title || "Interior Design"}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="pt-0 carousel-caption d-md-block">
                  <h6 className="pb-0 mb-0 fw-lighter fs-3 home_subhead">{banner?.top_slogan}</h6>
                  <div className="d-lg-flex">
                    <div>
                      <h3 className="letheading home_banner_heading">{banner?.title ?? ""}</h3>
                      <div className="font_stylish_home">{banner?.sub_title}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="rotate_div container-fluid">
        <div className="sssss ms-auto me-0">
          <a href="/contact" className="know_moress">Enquiry Now</a>
        </div>
      </div>
    </section>
  );
}