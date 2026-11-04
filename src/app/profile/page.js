"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Mail, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Sync state when session data loads
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">
          Please log in to view your profile.
        </p>
        <Button render={<Link href="/login" />} nativeButton={false}>
          Login
        </Button>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { error: updateError } = await authClient.updateUser({
        name: name,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update profile.");
      } else {
        setSuccessMessage("Profile updated successfully!");
        // Refresh session data to reflect updated name globally in the navbar
        refetch?.();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          <CardDescription>
            View and update your personal account information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and basic info header */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user.image || ""}
                alt={user.name || "User"}
              />
              <AvatarFallback className="text-xl">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Success / Error Banners */}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle2 className="size-4 shrink-0" />
              {successMessage}
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Update Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-4 pt-4 border-t"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="pl-9 bg-muted/50 text-muted-foreground cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Email address cannot be changed directly.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
