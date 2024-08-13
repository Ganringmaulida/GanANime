import { getAnimeResponse } from "@/libs/apiLibs";
import VideoPlayer from "@/components/utility/VideoPlayer"; // Pastikan path benar
import Image from "next/image";
import CollectionButton from "@/Components/AnimeList/collectionButton";
import { authUserSession } from "@/libs/auth-Libs";
import prisma from "@/libs/prisma";

const Page = async ({ params }) => {
  const id = params.id; // Ambil id dari params

  // Ambil data anime dengan id
  const response = await getAnimeResponse(`anime/${id}`);
  const user = await authUserSession();
  const animeData = response.data; // Ambil data dari respons API

  const collection = await prisma.collection.findFirst({
    where: { user_email: user?.email, anime_mal_id: id },
  });
  console.log(collection);

  return (
    <>
      <div className="pt-4 px-4">
        <h3 className="text-color-primary text-2xl">
          {animeData?.title} - {animeData?.year}
        </h3>
        {!collection && user && (
          <CollectionButton anime_mal_id={id} user_email={user?.email} />
        )}
      </div>

      <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border-2 p-2 border-color-primary ">
          <h3>Peringkat</h3>
          <p>{animeData?.rank}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border-2 p-2 border-color-primary">
          <h3>Skor</h3>
          <p>{animeData?.score}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border-2 p-2 border-color-primary">
          <h3>Episode</h3>
          <p>{animeData?.episodes}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border-2 p-2 border-color-primary">
          <h3>Popularitas</h3>
          <p>{animeData?.popularity}</p>
        </div>
      </div>

      <div className="pt-4 px-4 flex gap-2 sm:flex-nowrap flex-wrap text-color-primary">
        <Image
          src={animeData?.images.webp.image_url}
          alt={`Gambar dari ${animeData?.title}`}
          width={250}
          height={250}
          className="w-full rounded object-cover"
        />
        
        <p className="justify-center text-xl">{animeData?.synopsis}</p>
      </div>

      <div>
        {animeData?.trailer?.youtube_id && (
          <VideoPlayer youtubeId={animeData.trailer.youtube_id} />
        )}
      </div>
    </>
  );
};

export default Page;
