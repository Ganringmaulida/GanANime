"use client";

import React, { useEffect, useState } from "react";
import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/Components/utility/header-menu";
import Pagination from "@/Components/utility/pagination";
import { getAnimeResponse } from "@/libs/apiLibs";

const Page = () => {
  const [page, setPage] = useState(1);
  const [newSeasonsAnime, setNewSeasonsAnime] = useState([]);

  const fetchData = async () => {
    const newSeasonsAnimeData = await getAnimeResponse(
      "seasons/now",
      `page=${page}`
    );
    setNewSeasonsAnime(newSeasonsAnimeData);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <HeaderMenu title={`NEW SEASONS #${page}`} />
      <AnimeList api={newSeasonsAnime} />
      <Pagination
        page={page}
        lastPage={newSeasonsAnime.pagination?.last_visible_page || 1}
        setPage={setPage}
      />
    </>
  );
};

export default Page;
