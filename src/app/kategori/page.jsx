"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const [page, setPage] = useState(1);
  const [genreAnime, setGenreAnime] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [orderBy, setOrderBy] = useState("rank");

  const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 4, name: "Drama" },
    { id: 8, name: "Mystery" },
    { id: 10, name: "Romance" },
    { id: 14, name: "Fantasy" },
    { id: 7, name: "Comedy" },
    { id: 22, name: "Supernatural" },
    { id: 24, name: "Sci-Fi" },
    { id: 36, name: "Slice of Life" },
    { id: 30, name: "Sports" },
    { id: 31, name: "Music" },
  ];

  const fetchData = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&order_by=${orderBy}&sort=desc`
      );
      const data = await response.json();
      setGenreAnime(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (selectedGenre !== null) {
      fetchData(selectedGenre);
    }
  }, [selectedGenre, page, orderBy]);

  return (
    <div className="p-5 bg-gray-900 text-white">
      <h1 className="text-center mb-5 text-2xl font-bold">
        Anime Berdasarkan Genre
      </h1>

      <div className="mb-4 flex justify-center items-center">
        <label className="mr-2 text-lg" htmlFor="sortOrder">
          Urutkan berdasarkan:
        </label>
        <select
          id="sortOrder"
          className="p-2 rounded border border-gray-600 bg-gray-800 text-white"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
        >
          <option value="rank">Rank</option>
          <option value="score">Skor</option>
          <option value="members">Jumlah Tayang</option>
        </select>
      </div>

      <div className="mb-8 border border-gray-600 rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`p-2 mb-1 rounded border border-gray-600 transition-colors ${
                selectedGenre === genre.id
                  ? "bg-blue-600 text-white"
                  : "bg-color-primary text-color-dark hover:bg-color"
              }`}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {genreAnime.map((anime) => (
          <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
            <div className="relative flex flex-col bg-gray-800 rounded-lg overflow-hidden border border-gray-600 transition-transform transform hover:scale-105 cursor-pointer">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-black bg-opacity-75 p-2">
                <p className="text-sm font-bold truncate">{anime.title}</p>
                <p className="text-xs text-gray-400">
                  Episodes: {anime.episodes || "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
