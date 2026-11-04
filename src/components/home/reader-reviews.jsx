import { Star } from "lucide-react";
import { initials } from "@/lib/utils";

const REVIEWS = [
  {
    quote:
      "BookNook keeps my kids reading all summer. Borrowing takes seconds and we always know when to bring the book back.",
    name: "Sarah Mitchell",
    role: "Parent of two readers",
  },
  {
    quote:
      "I found three books in five minutes and added one of my own. It feels like a tiny library that lives in my pocket.",
    name: "Daniel Reyes",
    role: "University student",
  },
  {
    quote:
      "Returning a book is as satisfying as borrowing one. The whole cycle is simple, honest and oddly charming.",
    name: "Priya Kapoor",
    role: "Weekend book club host",
  },
];

export default function ReaderReviews() {
  return (
    <section
      aria-labelledby="reader-reviews-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6"
    >
      <div className="mb-10 space-y-3 text-center">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          From our readers
        </p>
        <h2
          id="reader-reviews-heading"
          className="font-heading text-3xl font-bold tracking-tight"
        >
          Reader Reviews
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          What the people of the Nook say about their borrowed stacks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10"
          >
            <div aria-label="5 out of 5 stars" className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="size-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
              “{review.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initials(review.name)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {review.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {review.role}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
