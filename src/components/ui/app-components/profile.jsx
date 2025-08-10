"use client";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import SetProfile from "./setProfile";
import { UserContext } from "@/app/context/userContext";
import { useContext } from "react";
function ViewProfile() {
  const { profileData } = useContext(UserContext);
  console.log("Profile Data:", profileData);

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            👤 Profile Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-4 py-2">
          <div>
            <p className="text-sm font-semibold text-gray-500">Full Name</p>
            <p className="text-base text-gray-800 ">
              {profileData?.data?.fullname}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Email</p>
            <p className="text-base text-gray-800">
              {profileData?.data?.email}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Phone</p>
            <p className="text-base text-gray-800">
              {profileData?.data?.phone}
            </p>
          </div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button className="text-gray-600 text-lg border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
                  Edit
                </button>
              </DialogTrigger>
              <SetProfile profile={profileData} />
            </form>
          </Dialog>
        </div>
      </DialogContent>
    </>
  );
}

export default ViewProfile;
