'use client'
import Navbar from "@/components/ui/app-components/navbar";
import Hero from "@/components/ui/app-components/hero";
import Footer from "@/components/ui/app-components/footer";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Crousal } from "@/components/ui/app-components/crousal";
export default function Home() {
  const [searchItem,setSearchItem]=useState("");
  return (
  <>
  <Navbar setSearchItem={setSearchItem} />
  <Crousal />
  <Hero searchItem={searchItem} />
  <Toaster position="top-center" reverseOrder={false} />
  <Footer />
  </>
  );
}
