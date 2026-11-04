import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Layers } from "lucide-react";
import { formatDate, getBookById } from "@/lib/books";
import BorrowButton from "@/components/borrow-button";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// // Dynamic route: params and usePathname() (navbar) are runtime data, and
// // notFound() must produce a real 404 — so this route renders per request
// // instead of prerendering (Cache Components blocking route).
// export const instant = false;

// export async function generateMetadata({ params }) {
//   const { id } = await params;
//   const book = getBookById(id);
//   return {
//     title: book ? `${book.title} — BookNook` : "Book Not Found — BookNook",
//   };
// }

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  console.log({ jwtToken });
  // Fetch the specific book from your Express backend
  const res = await fetch(`http://localhost:5000/all-books/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${jwtToken?.token}`,
    },
  });

  if (!res.ok) {
    notFound();
  }

  const book = await res.json();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[320px_1fr]">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/10 md:aspect-[5/7]">
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {book.category}
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              {book.title}
            </h1>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
          </div>

          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {book.description}
          </p>

          <dl className="flex flex-wrap gap-x-8 gap-y-3 rounded-2xl bg-muted/50 p-5 text-sm">
            <div className="flex items-center gap-2.5">
              <Layers className="size-4 text-muted-foreground" />
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium">{book.category}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <CalendarDays className="size-4 text-muted-foreground" />
              <dt className="text-muted-foreground">Added</dt>
              <dd className="font-medium">{formatDate(book.createdAt)}</dd>
            </div>
          </dl>

          <div className="space-y-2">
            <BorrowButton bookId={book.id || book._id} />
            <p className="text-xs text-muted-foreground">
              Demo UI — borrowing is not saved anywhere yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
