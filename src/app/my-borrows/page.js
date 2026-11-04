// // import Link from "next/link";
// // import { Bookmark } from "lucide-react";
// // // import PrivateRoute from "@/components/private-route";
// // import { buttonVariants } from "@/components/ui/button";

// // export const metadata = {
// //   title: "My Borrows — BookNook",
// // };

// // export default function MyBorrowsPage() {
// //   return (
// //     // <PrivateRoute>
// //     <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
// //       <div className="mb-8 space-y-3">
// //         <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
// //           Your checkout desk
// //         </p>
// //         <h1 className="font-heading text-3xl font-bold tracking-tight">
// //           My Borrows
// //         </h1>
// //         <p className="text-muted-foreground">
// //           Books you have borrowed, with their due dates.
// //         </p>
// //       </div>

// //       <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-12 text-center">
// //         <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
// //           <Bookmark className="size-7" />
// //         </span>
// //         <div className="space-y-1">
// //           <h2 className="font-heading text-lg font-semibold">
// //             You haven’t borrowed anything yet
// //           </h2>
// //           <p className="max-w-sm text-sm text-muted-foreground">
// //             Pick a book from the shelves, borrow it for a couple of weeks, and
// //             it will appear here.
// //           </p>
// //         </div>
// //         <Link href="/all-books" className={buttonVariants()}>
// //           Browse Books
// //         </Link>
// //       </div>
// //     </div>
// //     // </PrivateRoute>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import toast from "react-hot-toast";

// export default function MyBorrowsPage() {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [borrows, setBorrows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchBorrows = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/borrows?email=${encodeURIComponent(user.email)}`,
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch borrowed books");
//         }

//         const data = await response.json();
//         setBorrows(data);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBorrows();
//   }, [user?.email]);

//   const handleReturn = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/borrows/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to return book");
//       }

//       setBorrows((prev) => prev.filter((borrow) => borrow._id !== id));

//       toast.success("Book returned successfully!");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   if (loading) return <p>Loading borrowed books...</p>;

//   if (!user) return <p>Please log in to see your borrowed books.</p>;

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="mb-6 text-3xl font-bold">My Borrows</h1>

//       {borrows.length === 0 ? (
//         <p>You haven't borrowed any books yet.</p>
//       ) : (
//         <div className="overflow-x-auto rounded-lg border">
//           <table className="w-full text-left">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Title</th>
//                 <th className="p-4">Borrow Date</th>
//                 <th className="p-4">Return Date</th>
//                 <th className="p-4">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {borrows.map((borrow) => (
//                 <tr key={borrow._id} className="border-t">
//                   <td className="p-4">
//                     <img
//                       src={borrow.bookImage}
//                       alt={borrow.bookTitle}
//                       className="h-16 w-12 rounded object-cover"
//                     />
//                   </td>

//                   <td className="p-4 font-medium">{borrow.bookTitle}</td>

//                   <td className="p-4">
//                     {new Date(borrow.borrowDate).toLocaleDateString()}
//                   </td>

//                   <td className="p-4">
//                     {new Date(borrow.returnDate).toLocaleDateString()}
//                   </td>

//                   <td className="p-4">
//                     <button
//                       onClick={() => handleReturn(borrow._id)}
//                       className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//                     >
//                       Return Book
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function MyBorrowsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  // Fetch borrowed books
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setLoading(false);
      return;
    }

    async function fetchBorrows() {
      try {
        const response = await fetch(
          `http://localhost:5000/my-borrows?email=${encodeURIComponent(
            user.email,
          )}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books.");
        }

        const data = await response.json();
        setBorrows(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBorrows();
  }, [user?.email, isPending]);

  // Return book
  async function handleReturn(id) {
    try {
      setReturningId(id);

      const response = await fetch(`http://localhost:5000/my-borrows/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to return book.");
      }

      setBorrows((previousBorrows) =>
        previousBorrows.filter((borrow) => borrow._id !== id),
      );

      toast.success("Book returned successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not return book.");
    } finally {
      setReturningId(null);
    }
  }

  if (isPending || loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-muted-foreground">Loading borrowed books...</p>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p>Please log in to see your borrowed books.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Your checkout desk
        </p>

        <h1 className="font-heading text-3xl font-bold tracking-tight">
          My Borrows
        </h1>

        <p className="text-muted-foreground">
          Books you have borrowed, with their due dates.
        </p>
      </div>

      {borrows.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-12 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bookmark className="size-7" />
          </span>

          <div className="space-y-1">
            <h2 className="font-heading text-lg font-semibold">
              You haven't borrowed anything yet
            </h2>

            <p className="max-w-sm text-sm text-muted-foreground">
              Pick a book from the shelves and borrow it. It will appear here.
            </p>
          </div>

          <Link href="/all-books" className={buttonVariants()}>
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left">
            <thead className="bg-muted">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Borrow Date</th>
                <th className="p-4">Return Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      className="h-16 w-12 rounded object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{borrow.bookTitle}</td>

                  <td className="p-4">
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(borrow.returnDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={returningId === borrow._id}
                      onClick={() => handleReturn(borrow._id)}
                    >
                      {returningId === borrow._id
                        ? "Returning..."
                        : "Return Book"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
