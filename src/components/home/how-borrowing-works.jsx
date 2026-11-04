import {
  CalendarDays,
  MousePointerClick,
  RotateCcw,
  Search,
} from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Browse the catalogue",
    text: "Explore every book on the shelf, from newest arrivals to timeless classics.",
  },
  {
    icon: MousePointerClick,
    title: "Borrow in one click",
    text: "Open a book and hit Borrow — it instantly appears in My Borrows.",
  },
  {
    icon: CalendarDays,
    title: "Read for 14 days",
    text: "The book is yours for two weeks, with the due date always in view.",
  },
  {
    icon: RotateCcw,
    title: "Return and repeat",
    text: "Bring it back before the due date and pick your next adventure.",
  },
];

export default function HowBorrowingWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-y border-border bg-muted/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-heading text-3xl font-bold tracking-tight"
          >
            How Borrowing Works
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Four small steps stand between you and your next good book.
          </p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative rounded-2xl bg-background p-6 ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 font-heading text-4xl font-bold text-foreground/10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-1.5 font-heading font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
