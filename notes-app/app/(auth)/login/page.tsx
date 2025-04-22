import { AuthTabs } from "@/components/auth/auth-tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Notes App",
  description: "Login to your Notes App account",
};

export default function LoginPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
} 