// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { buttonVariants } from "@/components/ui/button";

// export default function BookCard({ book }) {
//   return (
//     <Card className="group h-full gap-0 overflow-hidden pt-0 transition-shadow hover:shadow-md">
//       <div className="relative aspect-[5/4] w-full overflow-hidden bg-muted">
//         <Image
//           src={book.cover}
//           alt={`Cover of ${book.title}`}
//           fill
//           unoptimized
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>

//       <CardHeader className="flex-1 gap-2 pt-4">
//         <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
//           {book.category}
//         </span>
//         <CardTitle className="line-clamp-2 text-base font-semibold">
//           {book.title}
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">by {book.author}</p>
//       </CardHeader>

//       <CardFooter>
//         <Link
//           href={`/all-books/${book.id}`}
//           className={buttonVariants({ size: "sm", variant: "outline" })}
//         >
//           View Details
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, BookOpen } from "lucide-react";

export default function BookCard({ book }) {
  console.log(book);
  return (
    <Card className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl">
      {/* Book Cover Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <Image
          src={
            book.cover ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkhSOncIx4-57gKBejlCyW-wdPeBvj1JKeydYs0u3PzQ&s"
          }
          alt={`Cover of ${book.title}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <span className="absolute left-3.5 top-3.5 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-md">
          {book.category}
        </span>
      </div>

      {/* Book Information */}
      <CardHeader className="flex-1 gap-2.5 px-5 pb-3 pt-5">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <BookOpen size={14} className="text-primary" />
          <span>BookNook Collection</span>
        </div>

        <CardTitle className="line-clamp-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {book.title}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Written by{" "}
          <span className="font-medium text-foreground/80">{book.author}</span>
        </p>
      </CardHeader>

      {/* Footer CTA */}
      <CardFooter className="px-5 pb-5 pt-2">
        <Link
          href={`/all-books/${book.id || book._id}`}
          className={`${buttonVariants({ size: "default" })} w-full justify-between rounded-xl font-semibold shadow-sm transition-all duration-300`}
        >
          <span>Explore Book</span>
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
