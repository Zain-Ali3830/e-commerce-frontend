import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "@/app/context/userContext";
import { useContext } from "react";
function SetProfile({ profile }) {
  const { profileData, setProfileData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullname: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save changes to the profile
  async function saveChanges() {
    const response = await axios.put(
      "http://localhost:4000/api/profile/setprofile",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setProfileData(response.data);
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="fullname"
              defaultValue={profile?.data?.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email-1">Email</Label>
            <Input
              id="email-1"
              name="email"
              defaultValue={profile?.data?.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone-1">Phone</Label>
            <Input
              id="phone-1"
              name="phone"
              defaultValue={profile?.data?.phone}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password-1">Password</Label>
            <Input
              id="password-1"
              name="password"
              placeholder="Set new password"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirm-password-1">Confirm password</Label>
            <Input
              id="confirm-password-1"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={saveChanges} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
export default SetProfile;
