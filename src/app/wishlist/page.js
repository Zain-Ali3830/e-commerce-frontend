"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/app-components/navbar";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
function Wishlist() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredWishList, setFilteredWishList] = useState([]);


  // Fetch wishlist items from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/getwishlist")
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[wishlist]);



  // Function to remove an item from the wishlist
  function removeFromWishlist(id) {
    axios
      .delete(`http://localhost:4000/api/products/deletewishlist?id=${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      toast.success("Item removed from wishlist"); 
  }



  // Filter wishlist items based on search input

  useEffect(() => {
      if (searchItem.trim() === "") {
        setFilteredWishList(wishlist);
        console.log(filteredWishList);
        console.log(searchItem);
      } else {
        const filtered = wishlist.filter((item) =>
          item.name.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredWishList(filtered);
      }
    }, [searchItem, wishlist]);

  return (
    <>
      <Navbar setSearchItem={setSearchItem} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            🛒 Your Wishlist
          </h1>

          {wishlist.length > 0 ? (
            <div className="space-y-6">
              {filteredWishList.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-5 border rounded-lg bg-gray-100 shadow-sm"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-lg border"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className=" flex sm:justify-end  items-center gap-4  w-1/3">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-white bg-red-500  hover:bg-red-700 text-md font-medium focus:ring-4 focus:ring-red-300 rounded-lg px-5 py-1.5 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your Wishlist is Empty 😕
              </h2>
              <p className="text-gray-500">
                Looks like you haven’t added anything yet.
              </p>
            </div>
          )}
          <div className="flex justify-center items-center mt-8 w-full ">
            <button
              onClick={() => router.push("/")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
