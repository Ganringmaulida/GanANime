"use client";
import { BookmarkSimple } from "@phosphor-icons/react";
import { data } from "autoprefixer";
import React, { useState } from "react";

const CollectionButton = ({ anime_mal_id, user_email }) => {
  const [isCreated, setIsCreated] = useState(false);

  const handleCollection = async (event) => {
    event.preventDefault();

    const data = { anime_mal_id, user_email };

    const response = await fetch("/api/v1/collection", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const collection = await response.json();
    if (collection.status == 200) {
      setIsCreated(true);
    }
    return;
  };

  return (
    <button
      onClick={handleCollection}
      className={`px-2 py-1 ${isCreated ? "bg-blue-500" : "bg-color-accent"}`}
    >
      <BookmarkSimple size={32} weight={isCreated ? "fill" : "regular"} />
    </button>
  );
};
export default CollectionButton;
