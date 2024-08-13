import { authUserSession } from "@/libs/auth-Libs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await authUserSession();
  console.log(user);

  return (
    <div className="mt-8 text-color-primary flex flex-col justify-center items-center">
      <h5 className=" text-2xl font-bold ">Welcome, {user.name}</h5>
      <Image src={user?.image} alt="..." width={250} height={250} />
      <div className="py-4 flex gap-4 flex-wrap">
        <Link
          href="/users/dashboard/collection"
          className="bg-color-accent text-color-dark font-bold px-4 py-3 text-xl shadow-md hover:bg-color-secondary transition "
        >
          My Collection
        </Link>
        <Link
          href="/users/dashboard/Comment"
          className="bg-color-accent text-color-dark font-bold px-4 py-3 text-xl shadow-lg hover:bg-color-secondary transition"
        >
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default page;
