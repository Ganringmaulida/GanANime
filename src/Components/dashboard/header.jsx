"use client"
import { ArrowSquareLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
const Header = ({title}) => {
const router = useRouter()
const handleBack = (event) => {
    event.preventDefault()
router.back()
}

  return (
    <div className="flex mb-4 justify-between items-center">
      <button className="text-color-primary" onClick={handleBack}>
        <ArrowSquareLeft size={24} />
      </button>
      <h3 className="bg-color-primary text-2xl  font-bold">{title}</h3>
    </div>
  );
};
export default Header;
