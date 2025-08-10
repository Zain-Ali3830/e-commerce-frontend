"use client";
import axios from "axios";
import { add } from "date-fns";
import { id } from "date-fns/locale";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const itemsPerPage = 6;
function Hero({ searchItem }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/getproducts")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to to search item to the cart
  useEffect(() => {
    setCurrentPage(1);
    const delayBounce = setTimeout(() => {
      if (searchItem.trim() !== "") {
        axios
          .get(
            `http://localhost:4000/api/products/searchproducts?name=${searchItem}`
          )
          .then((response) => {
            setSearch(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setSearch([]);
      }
    }, 700);
    return () => clearTimeout(delayBounce);
  }, [searchItem]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const activeList = searchItem.trim() ? search : items;
  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  const currentItems = activeList.slice(startIndex, startIndex + itemsPerPage);

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Function to go to the previous page
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to add an item to the cart
  const router = useRouter();
  function addToCart(id) {
    toast.success("Item added to cart");
    axios
      .post(`http://localhost:4000/api/products/addtocart?id=${id}`)
      .then((response) => {
        console.log("Added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart");
      });

    router.push("/cart");
  }

  // Function to add an item to the wishlist
  function addToWishlist(id) {
    axios
      .post(`http://localhost:4000/api/products/addtowishlist?id=${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    router.push("/wishlist");
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {currentItems.map((item) => (
        <div
          key={item.id}
          className="bg-white w-[350px] max-w-xs shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-lg font-semibold text-gray-800 mb-1">
            {item.name}
          </h1>
          <p className="text-blue-600 font-medium text-md">Rs:{item.price}</p>
          <div className="flex gap-3">
            <button
              onClick={() => addToCart(item.id)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(item.id)}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-sm font-medium"
            >
              Wishlist
            </button>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-center items-center  mt-8 gap-4 w-full">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 transition"
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 transition"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Hero;
