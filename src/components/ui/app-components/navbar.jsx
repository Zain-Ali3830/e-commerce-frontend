"use client";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewProfile from "./profile";
import { DialogContent } from "@radix-ui/react-dialog";
function Navbar({ setSearchItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="flex items-center justify-center px-8 gap-5 shadow-md relative md:justify-between">
        <div className="">
          <img src="/logo1.png" alt="logo" className="h-24 w-20 scale-150  " />
        </div>
        <input
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          placeholder="Search"
          className="p-2 w-full rounded-sm border-2 border-gray-300 md:w-1/2"
        />

        <button
          className="md:hidden text-3xl text-gray-600 hover:text-black transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiOutlineMenu />
        </button>

        <ul className="hidden md:flex items-center gap-6 px-5">
          <li>
            <button
              onClick={() => router.push("/cart")}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-2xl"
            >
              <FaShoppingCart />
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/wishlist")}
              className="text-gray-600 hover:text-red-500 transition-colors duration-200 text-2xl"
            >
              <FaHeart />
            </button>
          </li>
          <li>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <button className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xl">
                    <CgProfile />
                  </button>
                </DialogTrigger>
                <ViewProfile />
              </form>
            </Dialog>
          </li>
        </ul>
        {isMenuOpen && (
          <ul className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 flex flex-col gap-4 md:hidden z-50">
            <li>
              <button className="text-gray-600 hover:text-blue-600 text-2xl">
                <FaShoppingCart />
              </button>
            </li>
            <li>
              <button className="text-gray-600 hover:text-red-500 text-2xl">
                <FaHeart />
              </button>
            </li>
            <li>
              <button className="text-gray-600 hover:text-purple-600 text-2xl">
                <CgProfile />
              </button>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;
