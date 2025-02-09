import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import Lookup from "../../data/Lookup";
import { Button } from "../ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { useState } from "react";

export default function SignInDialog({ openDialog, closeDialog, signIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Call NextAuth.js signIn method with credentials
    const result = await signIn("credentials", {
      redirect: false, // Prevents redirect on failure
      email,
      password,
    });

    if (result?.error) {
      alert(result.error); // Handle error (e.g., show a toast notification)
    } else {
      closeDialog(); // Close the dialog on successful sign-in
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription className="text-center">
            {Lookup.SIGNIN_SUBHEADING}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email ID
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="col-span-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Sign In
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign In with Google Button */}
          <Button
            onClick={() => signIn("google")} // Sign in with Google
            variant="outline"
            className="w-full bg-white text-gray-700 hover:bg-gray-100 border-gray-300 flex items-center justify-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Sign In with Google</span>
          </Button>

          {/* Agreement Text */}
          <p className="text-center text-sm text-gray-500">
            {Lookup?.SIGNIn_AGREEMENT_TEXT}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
