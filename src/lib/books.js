// Demo catalog for the BookNook UI.
// Shaped like MongoDB documents so it can be swapped for real API calls later.

const books = [
  {
    id: "b01",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    cover: "/covers/cover-1.svg",
    description:
      "Between life and death there is a library, and within it, the books are chances to try another life you could have lived.",
    createdAt: "2026-10-28",
  },
  {
    id: "b02",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Psychology",
    cover: "/covers/cover-2.svg",
    description:
      "Tiny changes, remarkable results — a proven framework for building good habits and breaking bad ones.",
    createdAt: "2026-10-25",
  },
  {
    id: "b03",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    cover: "/covers/cover-3.svg",
    description:
      "A brief history of humankind, from an unremarkable ape to the master of the planet.",
    createdAt: "2026-10-22",
  },
  {
    id: "b04",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    cover: "/covers/cover-4.svg",
    description:
      "From the Big Bang to black holes — a landmark exploration of the universe we call home.",
    createdAt: "2026-10-19",
  },
  {
    id: "b05",
    title: "Educated",
    author: "Tara Westover",
    category: "Biography",
    cover: "/covers/cover-5.svg",
    description:
      "A memoir about a young woman who leaves her survivalist family and earns a PhD from Cambridge.",
    createdAt: "2026-10-15",
  },
  {
    id: "b06",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    cover: "/covers/cover-6.svg",
    description:
      "A handbook of agile software craftsmanship — write code that reads like prose.",
    createdAt: "2026-10-12",
  },
  {
    id: "b07",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    cover: "/covers/cover-3.svg",
    description:
      "Jay Gatsby's glittering, doomed pursuit of the American Dream on Long Island in the summer of 1922.",
    createdAt: "2026-10-05",
  },
  {
    id: "b08",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    cover: "/covers/cover-1.svg",
    description:
      "Bilbo Baggins sets out on an unexpected journey to reclaim a dragon-guarded mountain treasure.",
    createdAt: "2026-09-28",
  },
  {
    id: "b09",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    cover: "/covers/cover-4.svg",
    description:
      "The two systems that drive the way we think — fast intuition and slow, deliberate reasoning.",
    createdAt: "2026-09-21",
  },
  {
    id: "b10",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "History",
    cover: "/covers/cover-5.svg",
    description:
      "The true diary of a Jewish girl hiding from the Nazis in Amsterdam during World War II.",
    createdAt: "2026-09-14",
  },
  {
    id: "b11",
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Fiction",
    cover: "/covers/cover-6.svg",
    description:
      "A chilling vision of a future society engineered for comfort, stability — and no freedom at all.",
    createdAt: "2026-09-07",
  },
  {
    id: "b12",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    cover: "/covers/cover-2.svg",
    description:
      "The gene's-eye view of evolution — we are survival machines built by our DNA.",
    createdAt: "2026-08-30",
  },
  {
    id: "b13",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    cover: "/covers/cover-1.svg",
    description:
      "The defining portrait of Apple's co-founder, based on more than forty interviews.",
    createdAt: "2026-08-22",
  },
  {
    id: "b14",
    title: "Charlotte's Web",
    author: "E.B. White",
    category: "Children",
    cover: "/covers/cover-5.svg",
    description:
      "A spider, a pig, and a friendship that changes a farm forever — a children's classic.",
    createdAt: "2026-08-15",
  },
];

/** All books, newest first (mirrors sort({ createdAt: -1 }) in MongoDB). */
export function getAllBooks() {
  return [...books].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** The latest N books (mirrors sort({ createdAt: -1 }).limit(n)). */
export function getLatestBooks(count = 6) {
  return getAllBooks().slice(0, count);
}

export function getBookById(id) {
  return books.find((book) => book.id === id) ?? null;
}

export function getCategories() {
  return [...new Set(books.map((book) => book.category))].sort();
}

/** Timezone-free date formatting (ISO input keeps server/client renders identical). */
/** Timezone-free date formatting (ISO input keeps server/client renders identical). */
export function formatDate(isoDate) {
  // If isoDate is missing, undefined, or not a string, return a fallback text
  if (!isoDate || typeof isoDate !== "string") {
    return "Recently added";
  }

  const parts = isoDate.split("-");
  if (parts.length < 3) return isoDate; // Fallback if format is unexpected

  const [year, month, day] = parts.map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[month - 1] || "";
  return `${monthName} ${day}, ${year}`;
}
