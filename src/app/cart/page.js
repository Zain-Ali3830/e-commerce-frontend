"use client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/app-components/navbar";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
function addToCart() {
  const [cart, setCart] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredCart, setFilteredCart] = useState([]);
  const [order, setOrder] = useState("");
  const router = useRouter();

  // Get cart items from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/getcart")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("Cart", cart);


  // Filter cart items based on search input
  useEffect(() => {
    if (searchItem.trim() === "") {
      setFilteredCart(cart);
      console.log(filteredCart);
      console.log(searchItem);
    } else {
      const filtered = cart.filter((item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredCart(filtered);
    }
  }, [searchItem, cart]);


  // Function to remove an item from the cart
  function removeFromCart(id) {
    axios
      .delete(`http://localhost:4000/api/products/deletecart?id=${id}`)
      .then((response) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  // Function to add an order
  function addOrder(id) {
    axios
      .post(`http://localhost:4000/api/orders/addorder?id=${id}`)
      .then((response) => {
        setOrder(response.data);
        toast.success(response.data.message);
      });
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Number(item.quantity=0) };
      }
      return item;
    });

    setCart(updatedCart);
  }


  // Function to add quantity to an item in the cart
  function addQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Number(item.quantity + 1) };
      }
      return item;
    });

    setCart(updatedCart);
  }


  // Function to remove quantity from an item in the cart
  function removeQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity > 0 ? Number(item.quantity - 1) : 0,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar setSearchItem={setSearchItem} />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            🛒 Your Cart
          </h1>

          {cart.length > 0 ? (
            <div className="space-y-6">
              {filteredCart.map((item) => (
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

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => removeQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400"
                        >
                          <FaMinus />
                        </button>

                        <span className="text-lg font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => addQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className=" flex sm:justify-end  items-center gap-4  w-1/3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white bg-red-500  hover:bg-red-700 text-md font-medium focus:ring-4 focus:ring-red-300 rounded-lg px-5 py-1.5 cursor-pointer"
                    >
                      Remove
                    </button>
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            className={
                              "text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 text-md rounded-lg font-medium px-5 py-2.5 cursor-pointer"
                            }
                          >
                            Order
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <div className="grid gap-4">
                            <div className="flex justify-between px-5 py-5">
                              <Label htmlFor="name-1">Item</Label>
                              <Label>{item.name}</Label>
                            </div>
                            <div className="flex justify-between px-5">
                              <Label htmlFor="username-1">Quantity</Label>
                              <Label>{item.quantity}</Label>
                            </div>
                            <div className="flex justify-between px-5">
                              <Label htmlFor="username-1">Total</Label>
                              <Label>{item.price * item.quantity}</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="submit"
                                disabled={item.quantity <= 0}
                                onClick={() => addOrder(item.id)}
                              >
                                Confirm Order
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your Cart is Empty 😕
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

export default addToCart;
