import Image from "next/image";
import Link from "next/link";
import Header from "@/Components/dashboard/header";
import prisma from "@/libs/prisma";
import { authUserSession } from "@/libs/auth-Libs";
import { getAnimeResponse } from "@/libs/apiLibs";

const page = async () => {
  // gambar dan alt
  const response =await getAnimeResponse(`anime/{id}`);
  const animeData = response.data
// m=user yang login
  const user = await authUserSession();
  const Collection = await prisma.Collection.findMany({
    where: { user_email: user.email },
  });
  console.log(Collection);
  return (
    <section className="mt-4 px-4 w-full">
      <Header title={"My Collection"} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Collection.map((collect,index) => {
          return (
            <Link key={index} href={`/anime/${collect.anime_mal_id}`} className="border-2 relative border-color-accent">
              <Image
                   src={animeData?.images.webp.image_url}
                   alt={`Gambar dari ${animeData?.title}`}
                width={350}
                height={350}
                className="w-full"
              />
              <div className="absolute flex justify-center items-center bottom-0 w-full bg-color-accent h-16">
                <h5 className="text-xl text-center ">{animeData?.title}</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default page;
