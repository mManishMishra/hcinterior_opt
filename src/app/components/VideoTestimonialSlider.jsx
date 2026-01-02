"use client";

import Slider from "react-slick";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState, useMemo } from "react";
import api from "@/utils/api";

const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>
    <MdKeyboardArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    <MdOutlineChevronLeft />
  </div>
);

const FALLBACK_VIDEOS = [
  "k2yUmWMMY_A",
  "CUSkOUgr0Oc",
  "Dc-7Fj8sOa8",
  "iqtAPVt4p-k",
];

const VideoTestimonial = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load slick CSS safely once
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css";

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css";

    document.head.appendChild(link1);
    document.head.appendChild(link2);
  }, []);

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        const response = await api.get("/cms-content/home_page_content");
        const safeData = Array.isArray(response.data)
          ? response.data.filter(v => v?.json_content?.description)
          : [];
        setYoutubeVideos(safeData);
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchYoutubeVideos();
  }, []);

  // Decide what we will actually render
  const videosToRender = useMemo(() => {
    return youtubeVideos.length > 0 ? youtubeVideos : FALLBACK_VIDEOS;
  }, [youtubeVideos]);

  // 🚨 CRITICAL: prevent react-slick crash
  const settings = {
    dots: false,
    infinite: videosToRender.length > 3,
    speed: 500,
    autoplay: true,
    slidesToShow: Math.min(3, videosToRender.length),
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "5px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  // 🚫 DO NOT render Slider if nothing valid
  if (loading) return null;
  if (error && videosToRender.length === 0) return null;

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center mx-0">
        <div className="col-lg-11">
          <Slider {...settings}>
            {videosToRender.map((video, index) => {
              const src =
                typeof video === "string"
                  ? `https://www.youtube.com/embed/${video}`
                  : video.json_content.description;

              const title =
                typeof video === "string"
                  ? `YouTube Video ${index + 1}`
                  : video.json_content.title || "Video testimonial";

              return (
                <div key={index} className="m-4">
                  <iframe
                    height="250"
                    className="map video_card"
                    src={src}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonial;
