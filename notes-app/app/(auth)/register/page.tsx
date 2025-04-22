import { AuthTabs } from "@/components/auth/auth-tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Notes App",
  description: "Create a new Notes App account",
};

export default function RegisterPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up for a new account to get started
          </p>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
} 