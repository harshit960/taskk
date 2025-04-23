"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  // Get user details
  const fullName = user.user_metadata?.full_name || "No name provided";
  const email = user.email || "No email available";
  const avatarUrl = user.user_metadata?.avatar_url;
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    
    return (email.substring(0, 2) || "").toUpperCase();
  };
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Your personal information and settings
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt={fullName} />
                <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
              </Avatar>
              {/* <Button variant="outline" size="sm">
                Change Photo
              </Button> */}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                <p className="text-lg font-medium">{fullName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                <p className="text-lg">{email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">User ID</h3>
                <p className="text-sm text-muted-foreground truncate max-w-xs font-mono">{user.id}</p>
              </div>
              
              <div className="pt-4">
                {/* <Button>
                  Edit Profile
                </Button> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Password</h3>
            <div className="flex items-center justify-between">
              <p className="text-lg">••••••••</p>
              {/* <Button variant="outline">Change Password</Button> */}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Authentication Providers</h3>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{user.app_metadata?.provider || "Email"}</p>
                <p className="text-sm text-muted-foreground">
                  {user.app_metadata?.provider === "google" 
                    ? "Connected with Google account" 
                    : "Email and password authentication"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 