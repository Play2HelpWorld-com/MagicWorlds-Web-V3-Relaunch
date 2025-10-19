import Signup from "@/components/accounts/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page ",
  description: "This is Sign Up page ",
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
