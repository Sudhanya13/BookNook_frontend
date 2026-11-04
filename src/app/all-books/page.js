import BookCard from "@/components/book-card";

export default async function AllBooksPage() {
  const res = await fetch("http://localhost:5000/all-books");
  const books = await res.json();
  console.log(books);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          The shelves
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          All Books
        </h1>
        <p className="text-muted-foreground">
          {books.length} titles waiting for a reader — newest arrivals first.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id || book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
