// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { BookOpen, Check } from "lucide-react";
// // import { useAuth } from "@/lib/auth-context";
// import { Button, buttonVariants } from "@/components/ui/button";

// export default function BorrowButton() {
//   // const { user, ready } = useAuth();
//   const [borrowed, setBorrowed] = useState(false);

//   // if (!ready) {
//   //   return (
//   //     <div
//   //       className="h-9 w-40 animate-pulse rounded-lg bg-muted"
//   //       aria-hidden="true"
//   //     />
//   //   );
//   // }

//   // if (!user) {
//   //   return (
//   //     <Link href="/login" className={buttonVariants({ size: "lg" })}>
//   //       <BookOpen />
//   //       Log in to borrow
//   //     </Link>
//   //   );
//   }

//   if (borrowed) {
//     return (
//       <span className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600/10 px-4 text-sm font-medium text-emerald-700">
//         <Check className="size-4" />
//         Borrowed — see My Borrows
//       </span>
//     );
//   }

//   return (
//     <Button size="lg" onClick={() => setBorrowed(true)}>
//       <BookOpen />
//       Borrow Book
//     </Button>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { BookOpen, Check } from "lucide-react";
// // import { useAuth } from "@/lib/auth-context";
// import { Button, buttonVariants } from "@/components/ui/button";

// export default function BorrowButton() {
//   // const { user, ready } = useAuth();
//   const [borrowed, setBorrowed] = useState(false);

// if (!ready) {
//   return (
//     <div
//       className="h-9 w-40 animate-pulse rounded-lg bg-muted"
//       aria-hidden="true"
//     />
//   );
// }

// if (!user) {
//   return (
//     <Link href="/login" className={buttonVariants({ size: "lg" })}>
//       <BookOpen />
//       Log in to borrow
//     </Link>
//   );
// }

//   if (borrowed) {
//     return (
//       <span className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600/10 px-4 text-sm font-medium text-emerald-700">
//         <Check className="size-4" />
//         Borrowed — see My Borrows
//       </span>
//     );
//   }

//   return (
//     <Button size="lg" onClick={() => setBorrowed(true)}>
//       <BookOpen />
//       Borrow Book
//     </Button>
//   );
// }

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Check } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BorrowButton({ bookId, copies }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [borrowed, setBorrowed] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleBorrow() {
    if (!user?.name || !user?.email) {
      toast.error("Please log in to borrow this book.");
      return;
    }

    if (!bookId) {
      toast.error("Book information is missing.");
      return;
    }

    try {
      setBorrowing(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId,
            userName: user.name,
            userEmail: user.email,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to borrow book.");
      }

      setBorrowed(true);
      setOpen(false);
      router.refresh();

      toast.success("Book borrowed successfully!");
    } catch (error) {
      console.error("Borrow error:", error);
      toast.error(error.message || "Could not borrow this book.");
    } finally {
      setBorrowing(false);
    }
  }

  if (isPending) {
    return (
      <Button size="lg" disabled>
        Loading...
      </Button>
    );
  }
  if (copies <= 0) {
    return (
      <Button size="lg" disabled>
        Not Available
      </Button>
    );
  }

  if (!user) {
    return (
      <Link href="/login" className={buttonVariants({ size: "lg" })}>
        <BookOpen className="mr-2 size-4" />
        Log in to borrow
      </Link>
    );
  }

  if (borrowed) {
    return (
      <Link
        href="/my-borrows"
        className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600/10 px-4 text-sm font-medium text-emerald-700"
      >
        <Check className="size-4" />
        Borrowed — See My Borrows
      </Link>
    );
  }

  return (
    <>
      <Button size="lg" onClick={() => setOpen(true)} disabled={copies <= 0}>
        <BookOpen className="mr-2 size-4" />
        {copies <= 0 ? "Not Available" : "Borrow Book"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Borrowing</DialogTitle>
            <DialogDescription>
              Review your information before borrowing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Your Name</Label>
              <Input value={user?.name || ""} readOnly />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={user?.email || ""} readOnly />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleBorrow} disabled={borrowing}>
              {borrowing ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
