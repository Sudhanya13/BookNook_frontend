// import Link from "next/link";
// import { Library } from "lucide-react";

// import { buttonVariants } from "@/components/ui/button";

// export const metadata = {
//   title: "My Books — BookNook",
// };

// export default function MyBooksPage() {
//   return (
//     <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
//       <div className="mb-8 space-y-3">
//         <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
//           Your shelf
//         </p>
//         <h1 className="font-heading text-3xl font-bold tracking-tight">
//           My Books
//         </h1>
//         <p className="text-muted-foreground">
//           The books you have added to BookNook.
//         </p>
//       </div>

//       <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-12 text-center">
//         <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
//           <Library className="size-7" />
//         </span>
//         <div className="space-y-1">
//           <h2 className="font-heading text-lg font-semibold">
//             No books added yet
//           </h2>
//           <p className="max-w-sm text-sm text-muted-foreground">
//             Books you add from the Add Book page will show up here, ready for
//             other readers to borrow.
//           </p>
//         </div>
//         <Link href="/add-book" className={buttonVariants()}>
//           Add Your First Book
//         </Link>
//       </div>
//     </div>
//   );
// }
// // import MyBooksClient from "./my-books-client";

// // export const metadata = {
// //   title: "My Books — BookNook",
// // };

// // export default function MyBooksPage() {
// //   return <MyBooksClient  />;
// // }

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Library, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
export const dynamic = "force-dynamic";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyBooksPage() {
  const { data: session, isPending } = authClient.useSession();
  // backend api / request /user information fetch , cookies session token . when the  user loggged in

  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch books added by logged-in user
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setLoading(false);
      return;
    }

    async function fetchMyBooks() {
      try {
        const response = await fetch(
          // `${process.env.NEXT_PUBLIC_API_URL}/my-books`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${tokenData.token}`,
          //   },
          // },
          `${process.env.NEXT_PUBLIC_API_URL}/my-books?email=${encodeURIComponent(
            user.email,
          )}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load your books.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyBooks();
  }, [user?.email, isPending]);

  // Delete book
  async function handleDelete(id) {
    setDeletingId(id);

    try {
      const response = await fetch(`http://localhost:5000/all-books/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete book");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== id),
      );

      toast.success("Book deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not delete book.");
    } finally {
      setDeletingId(null);
    }
  }

  // Update book
  async function handleUpdate(e) {
    e.preventDefault();

    if (!editingBook) return;

    try {
      setUpdating(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all-books/${editingBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingBook.title,
            author: editingBook.author,
            category: editingBook.category,
            cover: editingBook.cover,
            description: editingBook.description,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update book.");
      }

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book._id === editingBook._id ? { ...book, ...editingBook } : book,
        ),
      );

      setEditingBook(null);

      toast.success("Book updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not update book.");
    } finally {
      setUpdating(false);
    }
  }

  if (isPending || loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-muted-foreground">Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Page Heading */}
      <div className="mb-8 space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Your shelf
        </p>

        <h1 className="font-heading text-3xl font-bold tracking-tight">
          My Books
        </h1>

        <p className="text-muted-foreground">
          The books you have added to BookNook.
        </p>
      </div>

      {/* Not Logged In */}
      {!user?.email ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p>Please log in to view your books.</p>
        </div>
      ) : books.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-12 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Library className="size-7" />
          </span>

          <div className="space-y-1">
            <h2 className="font-heading text-lg font-semibold">
              No books added yet
            </h2>

            <p className="max-w-sm text-sm text-muted-foreground">
              Books you add from the Add Book page will show up here, ready for
              other readers to borrow.
            </p>
          </div>

          <Link href="/add-book" className={buttonVariants()}>
            Add Your First Book
          </Link>
        </div>
      ) : (
        /* My Book Cards */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden rounded-xl border bg-card"
            >
              {/* Book Image */}
              <div className="relative aspect-[5/4] bg-muted">
                {book.cover && (
                  <Image
                    src={
                      book.cover ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkhSOncIx4-57gKBejlCyW-wdPeBvj1JKeydYs0u3PzQ&s"
                    }
                    alt={book.title}
                    height={45}
                    width={55}
                    className="object-cover"
                  />
                )}
              </div>

              {/* Book Details */}
              <div className="space-y-3 p-4">
                <div>
                  <h2 className="text-lg font-semibold">{book.title}</h2>

                  <p className="text-sm text-muted-foreground">
                    By {book.author}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">{book.category}</p>

                <p className="line-clamp-3 text-sm">{book.description}</p>

                {/* Edit and Delete */}
                <div className="flex justify-end gap-2 pt-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast("Edit functionality will be added next.")
                    }
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button> */}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingBook({ ...book })}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deletingId === book._id}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this book?</AlertDialogTitle>

                        <AlertDialogDescription>
                          Are you sure you want to delete {book.title}? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(book._id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Book Modal */}
      <Dialog
        open={!!editingBook}
        onOpenChange={(open) => {
          if (!open && !updating) {
            setEditingBook(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update your book information below.
            </DialogDescription>
          </DialogHeader>

          {editingBook && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label>Book Title</Label>
                <Input
                  value={editingBook.title || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={editingBook.author || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      author: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={editingBook.category || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input
                  value={editingBook.cover || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      cover: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingBook.description || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  required
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingBook(null)}
                  disabled={updating}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={updating}>
                  {updating ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
