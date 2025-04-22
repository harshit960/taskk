"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeTab === "login" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setActiveTab("login")}
          >
            Login
          </Button>
          <Button
            variant={activeTab === "register" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setActiveTab("register")}
          >
            Register
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="px-8 text-center text-sm text-muted-foreground">
          {activeTab === "login" ? (
            <>
              Don't have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => setActiveTab("register")}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => setActiveTab("login")}>
                Sign in
              </Button>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
} 