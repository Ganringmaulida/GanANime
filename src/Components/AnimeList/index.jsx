"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "16px 0",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll("left")}
        style={{
          position: "absolute",
          top: "50%",
          left: "16px",
          transform: "translateY(-50%)",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "12px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "24px", height: "24px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Anime List Container */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
          WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
          padding: "0 16px",
          position: "relative",
        }}
      >
        <style jsx>{`
          ::-webkit-scrollbar {
            display: none;
          }
          .anime-card {
            position: relative;
            width: 160px;
            height: 240px;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-right: 16px;
            transition: box-shadow 0.3s ease, transform 0.3s ease, border 0.3s ease, background-color 0.3s ease;
          }
          .anime-card:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            transform: scale(1);
            border: 1px solid var(--color-accent); // Ganti dengan warna aksen yang sesuai
            background-color: var(--color-accent); // Ganti dengan warna aksen yang sesuai
          }
          .anime-card img {
            border-bottom: 1px solid #ddd;
            object-fit: cover; // Gunakan CSS untuk mengatur object-fit
            width: 100%;
            height: 100%;
          }
          .anime-title {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            text-align: center;
            padding: 4px;
            font-size: 12px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .anime-list-container {
            display: flex;
            gap: 16px;
          }
          .anime-list-container:hover {
            scrollbar-width: auto; /* For Firefox */
          }
          .anime-list-container:hover::-webkit-scrollbar {
            display: block; /* For Webkit browsers */
          }
        `}</style>
        <div className="anime-list-container">
          {api.data?.map((anime, index) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              key={index}
              className="cursor-pointer text-color-primary hover:text-color-accent transition-all"
              style={{
                textDecoration: "none",
                color: "inherit",
                flexShrink: "0",
              }}
            >
              <div className="anime-card">
                <Image
                  src={anime.images.webp.image_url}
                  alt={anime.title}
                  fill
                  style={{ borderRadius: "8px" }}
                />
                <div className="anime-title">{anime.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll("right")}
        style={{
          position: "absolute",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "12px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "24px", height: "24px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default AnimeList;
