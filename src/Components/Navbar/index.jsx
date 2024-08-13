import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./userActionButton";
import ListButton from "./list";

const Navbar = () => {
  return (
    <header className="bg-color-accent sticky top-0 z-50">
      <div className="flex md:flex-row flex-col justify-between  md:items-center p-4 gap-2">
        <div className="flex items-center gap-2">
          <ListButton />
          <Link href="/" className="font-bold text-2xl ">
            GANANIME
          </Link>
        </div>
        <InputSearch />
        <UserActionButton />
      </div>
    </header>
  );
};

export default Navbar;
