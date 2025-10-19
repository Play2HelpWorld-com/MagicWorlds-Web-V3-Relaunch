import Signin from "@/components/accounts/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page ",
  description: "This is Login page",
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
