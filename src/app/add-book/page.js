"use client";

import { useState } from "react";
import { CheckCircle2, User, Mail, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { getCategories } from "@/lib/books";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const FIELD_CLASSES =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

export default function AddBookPage() {
  const categories = getCategories();
  const [added, setAdded] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleSubmit(event) {
    event.preventDefault();

    if (isPending) {
      toast.error("Please wait while your account loads.");
      return;
    }

    if (!user?.name || !user?.email) {
      toast.error("Please log in before adding a book.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Prepare data according to backend structure
    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      category: formData.get("category"),
      cover: formData.get("cover"),
      description: formData.get("description"),
      addedBy: {
        name: user.name,
        email: user.email,
      },
    };

    try {
      setSubmitting(true);

      const response = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      setAdded(bookData.title);
      form.reset();

      toast.success(
        `"${bookData.title}" has been successfully added to the shelf.`,
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Grow the shelf
        </p>

        <h1 className="font-heading text-3xl font-bold tracking-tight">
          Add Book
        </h1>

        <p className="text-muted-foreground">
          Share a title with every reader of the Nook.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-6" />
          </div>

          <CardTitle>Book Details</CardTitle>

          <CardDescription>
            Fill in the information that should appear on the book card.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {added && (
              <p
                role="status"
                className="flex items-center gap-2 rounded-lg bg-emerald-600/10 px-3 py-2 text-sm font-medium text-emerald-700"
              >
                <CheckCircle2 className="size-4 shrink-0" />“{added}” was added
                to the shelf.
              </p>
            )}

            {/* Book Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="The Midnight Library"
                className={FIELD_CLASSES}
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                name="author"
                required
                placeholder="Matt Haig"
                className={FIELD_CLASSES}
              />
            </div>

            {/* Category and Image */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className={`${FIELD_CLASSES} bg-background text-foreground`}
                >
                  <option
                    value=""
                    disabled
                    className="bg-background text-foreground"
                  >
                    Choose a category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover">Book Image URL</Label>
                <Input
                  id="cover"
                  name="cover"
                  type="url"
                  required
                  placeholder="https://example.com/book.jpg"
                  className={FIELD_CLASSES}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                placeholder="Write a short description about the book..."
                className={`${FIELD_CLASSES} h-auto min-h-24 resize-y py-2`}
              />
            </div>

            {/* Logged In User Details */}
            <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
              <div>
                <p className="text-sm font-semibold">Added By</p>
                <p className="text-xs text-muted-foreground">
                  Your account details are automatically filled in.
                </p>
              </div>

              {/* User Name */}
              <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="userName"
                    value={user?.name || ""}
                    readOnly
                    className={`${FIELD_CLASSES} pl-9`}
                  />
                </div>
              </div>

              {/* User Email */}
              <div className="space-y-2">
                <Label htmlFor="userEmail">User Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="userEmail"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className={`${FIELD_CLASSES} pl-9`}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="reset"
                variant="outline"
                disabled={submitting}
                onClick={() => setAdded("")}
              >
                Clear
              </Button>

              <Button
                type="submit"
                className="gap-2"
                disabled={submitting || isPending || !user?.email}
              >
                <BookOpen className="size-4" />
                {submitting ? "Adding Book..." : "Add Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
