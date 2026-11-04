// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { Trash2, Edit3, AlertTriangle, X, Library, ArrowUpRight, BookOpen } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { getCategories } from "@/lib/books";

// const FIELD_CLASSES =
//   "h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

// export default function MyBooksClient() {
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Edit State
//   const [editingBook, setEditingBook] = useState(null);

//   // Delete Modal State
//   const [deletingBookId, setDeletingBookId] = useState(null);

//   const categories = getCategories();

//   // Fetch user's books with JWT Bearer token
//   useEffect(() => {
//     if (!user) return;

//     async function fetchMyBooks() {
//       try {
//         const { data: tokenData } = await authClient.token();
//         const token = tokenData?.token;

//         const res = await fetch(`http://localhost:5000/my-books`, {
//           headers: {
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setBooks(data);
//         } else {
//           toast.error("Failed to load your books.");
//         }
//       } catch (err) {
//         toast.error("Network error while loading your books.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMyBooks();
//   }, [user]);

//   // Handle Delete Confirmation
//   async function confirmDelete() {
//     if (!deletingBookId) return;

//     try {
//       const { data: tokenData } = await authClient.token();
//       const token = tokenData?.token;

//       const res = await fetch(`http://localhost:5000/books/${deletingBookId}`, {
//         method: "DELETE",
//         headers: {
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setBooks((prev) => prev.filter((b) => (b._id || b.id) !== deletingBookId));
//         toast.success("Book deleted successfully!");
//       } else {
//         toast.error(data.error || "Failed to delete book.");
//       }
//     } catch (err) {
//       toast.error("Network error during deletion.");
//     } finally {
//       setDeletingBookId(null);
//     }
//   }

//   // Handle Update Submit
//   async function handleUpdateSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const updatedData = Object.fromEntries(formData.entries());
//     const bookId = editingBook._id || editingBook.id;

//     try {
//       const { data: tokenData } = await authClient.token();
//       const token = tokenData?.token;

//       const res = await fetch(`http://localhost:5000/books/${bookId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setBooks((prev) =>
//           prev.map((b) => ((b._id || b.id) === bookId ? { ...b, ...updatedData } : b))
//         );
//         toast.success(`"${updatedData.title}" has been updated successfully.`);
//         setEditingBook(null);
//       } else {
//         toast.error(data.error || "Failed to update book.");
//       }
//     } catch (err) {
//       toast.error("Network error during update.");
//     }
//   }

//   if (isPending || loading) {
//     return <div className="py-20 text-center text-muted-foreground">Loading your books...</div>;
//   }

//   if (!user) {
//     return (
//       <div className="mx-auto max-w-3xl px-4 py-20 text-center">
//         <h2 className="text-xl font-bold">Access Denied</h2>
//         <p className="text-muted-foreground mt-2">Please log in to view your books.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
//       <div className="mb-8 space-y-3">
//         <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
//           Your shelf
//         </p>
//         <h1 className="font-heading text-3xl font-bold tracking-tight">My Books</h1>
//         <p className="text-muted-foreground">Manage, update, or remove the books you have added.</p>
//       </div>

//       {books.length === 0 ? (
//         <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-12 text-center">
//           <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
//             <Library className="size-7" />
//           </span>
//           <div className="space-y-1">
//             <h2 className="font-heading text-lg font-semibold">No books added yet</h2>
//             <p className="max-w-sm text-sm text-muted-foreground">
//               Books you add from the Add Book page will show up here, ready for other readers to borrow.
//             </p>
//           </div>
//           <Link href="/add-book" className={buttonVariants()}>
//             Add Your First Book
//           </Link>
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {books.map((book) => {
//             const bookId = book._id || book.id;
//             return (
//               <Card
//                 key={bookId}
//                 className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl"
//               >
//                 <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
//                   <Image
//                     src={book.cover || "/placeholder.svg"}
//                     alt={`Cover of ${book.title}`}
//                     fill
//                     unoptimized
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
//                   <span className="absolute left-3.5 top-3.5 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-md">
//                     {book.category}
//                   </span>
//                 </div>

//                 <CardHeader className="flex-1 gap-2.5 px-5 pb-3 pt-5">
//                   <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                     <BookOpen size={14} className="text-primary" />
//                     <span>My Collection</span>
//                   </div>
//                   <CardTitle className="line-clamp-2 text-lg font-bold leading-snug tracking-tight">
//                     {book.title}
//                   </CardTitle>
//                   <p className="text-sm text-muted-foreground">
//                     Written by <span className="font-medium text-foreground/80">{book.author}</span>
//                   </p>
//                 </CardHeader>

//                 <CardFooter className="flex gap-2 px-5 pb-5 pt-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 gap-1.5 rounded-xl font-semibold"
//                     onClick={() => setEditingBook(book)}
//                   >
//                     <Edit3 size={15} /> Edit
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     className="flex-1 gap-1.5 rounded-xl font-semibold"
//                     onClick={() => setDeletingBookId(bookId)}
//                   >
//                     <Trash2 size={15} /> Delete
//                   </Button>
//                 </CardFooter>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       {/* --- EDIT MODAL --- */}
//       {editingBook && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl border border-border">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-bold">Edit Book</h2>
//               <Button variant="ghost" size="icon" onClick={() => setEditingBook(null)}>
//                 <X size={18} />
//               </Button>
//             </div>

//             <form onSubmit={handleUpdateSubmit} className="space-y-4">
//               <div className="space-y-1.5">
//                 <Label htmlFor="edit-title">Title</Label>
//                 <Input id="edit-title" name="title" defaultValue={editingBook.title} required className={FIELD_CLASSES} />
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="edit-author">Author</Label>
//                 <Input id="edit-author" name="author" defaultValue={editingBook.author} required className={FIELD_CLASSES} />
//               </div>

//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="space-y-1.5">
//                   <Label htmlFor="edit-category">Category</Label>
//                   <select
//                     id="edit-category"
//                     name="category"
//                     defaultValue={editingBook.category}
//                     required
//                     className={FIELD_CLASSES}
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-1.5">
//                   <Label htmlFor="edit-cover">Cover URL</Label>
//                   <Input id="edit-cover" name="cover" type="url" defaultValue={editingBook.cover} className={FIELD_CLASSES} />
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="edit-description">Description</Label>
//                 <textarea
//                   id="edit-description"
//                   name="description"
//                   rows={3}
//                   defaultValue={editingBook.description}
//                   className={`${FIELD_CLASSES} h-auto py-2`}
//                 />
//               </div>

//               <div className="flex justify-end gap-2 pt-2">
//                 <Button type="button" variant="outline" onClick={() => setEditingBook(null)}>
//                   Cancel
//                 </Button>
//                 <Button type="submit">Save Changes</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
//       {deletingBookId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl border border-border text-center space-y-4">
//             <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
//               <AlertTriangle size={24} />
//             </div>
//             <div className="space-y-1">
//               <h3 className="font-bold text-lg">Delete Book</h3>
//               <p className="text-sm text-muted-foreground">
//                 Are you sure you want to delete this book? This action cannot be undone.
//               </p>
//             </div>
//             <div className="flex gap-2 justify-center pt-2">
//               <Button variant="outline" onClick={() => setDeletingBookId(null)} className="flex-1">
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={confirmDelete} className="flex-1">
//                 Yes, Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyBookCard({ book, onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[5/4]">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">By {book.author}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{book.description}</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(book)}>
          Edit
        </Button>

        <Button variant="destructive" onClick={() => onDelete(book._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
