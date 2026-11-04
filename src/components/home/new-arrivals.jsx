// // // "use client";
// // // import Image from "next/image";
// // // import React, { useEffect, useState } from "react";
// // // import Link from "next/link"; // Or use your router package

// // // const NewArrivals = () => {
// // //   const [books, setBooks] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetch("http://localhost:5000/new-arrivals")
// // //       .then((res) => res.json())
// // //       .then((data) => {
// // //         setBooks(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Failed to load new arrivals:", err);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   if (loading) {
// // //     return <div className="text-center py-10">Loading New Arrivals...</div>;
// // //   }

// // //   return (
// // //     <section className="py-12 px-4 max-w-7xl mx-auto">
// // //       <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>

// // //       {/* Books Grid */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// // //         {books.map((book) => (
// // //           <div
// // //             key={book._id}
// // //             className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
// // //           >
// // //             <Image
// // //               src={book.cover}
// // //               alt={book.title}
// // //               height={45}
// // //               width={55}
// // //               className="h-64 w-full object-cover"
// // //             />
// // //             <div className="p-4 flex flex-col flex-grow">
// // //               <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
// // //                 {book.category}
// // //               </span>
// // //               <h3 className="text-lg font-bold text-gray-800 mt-1">
// // //                 {book.title}
// // //               </h3>
// // //               <p className="text-sm text-gray-600 mb-4">By {book.author}</p>

// // //               <div className="mt-auto">
// // //                 <Link
// // //                   to={`/all-books/${book._id}`}
// // //                   className="block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
// // //                 >
// // //                   View Details
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* See All Books Button */}
// // //       <div className="text-center mt-10">
// // //         <Link
// // //           href="/all-books"
// // //           className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
// // //         >
// // //           See All Books
// // //         </Link>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default NewArrivals;

// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import React, { useEffect, useState } from "react";

// // const NewArrivals = () => {
// //   const [books, setBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch("http://localhost:5000/new-arrivals")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setBooks(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Failed to load new arrivals:", err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center py-24">
// //         <div className="animate-pulse flex space-x-4 items-center">
// //           <div className="rounded-full bg-indigo-200 h-10 w-10"></div>
// //           <div className="text-gray-500 font-medium text-lg">
// //             Curating New Arrivals...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="py-16 px-4 max-w-7xl mx-auto">
// //       {/* Section Header */}
// //       <div className="text-center mb-12">
// //         <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1.5 rounded-full">
// //           Fresh Off the Press
// //         </span>
// //         <h2 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
// //           New Arrivals
// //         </h2>
// //         <p className="text-gray-500 mt-2 max-w-md mx-auto">
// //           Explore the latest additions to our library catalog, handpicked just
// //           for you.
// //         </p>
// //       </div>

// //       {/* Books Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {books.map((book) => (
// //           <div
// //             key={book._id}
// //             className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
// //           >
// //             {/* Book Image Container */}
// //             <div className="relative h-72 w-full overflow-hidden bg-gray-100">
// //               <Image
// //                 src={book.cover}
// //                 alt={book.title}
// //                 height={55}
// //                 width={45}
// //                 className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

// //               {/* Category Badge Floating */}
// //               <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
// //                 {book.category}
// //               </span>
// //             </div>

// //             {/* Book Content */}
// //             <div className="p-6 flex flex-col flex-grow">
// //               <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
// //                 {book.title}
// //               </h3>
// //               <p className="text-sm font-medium text-gray-500 mt-1 mb-6">
// //                 By <span className="text-gray-700">{book.author}</span>
// //               </p>

// //               {/* Action Button */}
// //               <div className="mt-auto">
// //                 <a
// //                   href={`/all-books/${book._id}`}
// //                   className="w-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-semibold py-2.5 px-4 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm"
// //                 >
// //                   View Details
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* See All Books Button */}
// //       <div className="text-center mt-14">
// //         <Link
// //           href="/all-books"
// //           className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:bg-indigo-600 hover:shadow-indigo-200 transition-all duration-300"
// //         >
// //           See All Books
// //           <svg
// //             className="w-4 h-4 ml-2 -mr-1"
// //             fill="none"
// //             stroke="currentColor"
// //             viewBox="0 0 24 24"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <path
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               strokeWidth="2"
// //               d="M14 5l7 7m0 0l-7 7m7-7H3"
// //             ></path>
// //           </svg>
// //         </Link>
// //       </div>
// //     </section>
// //   );
// // };

// // export default NewArrivals;

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const NewArrivals = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/new-arrivals")
//       .then((res) => res.json())
//       .then((data) => {
//         setBooks(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load new arrivals:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-24 bg-gray-950 text-gray-400">
//         <div className="animate-pulse flex space-x-4 items-center">
//           <div className="rounded-full bg-indigo-500/20 h-10 w-10"></div>
//           <div className="font-medium text-lg">Curating New Arrivals...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 px-4 max-w-7xl mx-auto bg-gray-950 text-gray-100 min-h-screen">
//       {/* Section Header */}
//       <div className="text-center mb-12">
//         <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
//           Fresh Off the Press ({books.length})
//         </span>
//         <h2 className="text-4xl font-extrabold text-white mt-3 tracking-tight">
//           New Arrivals
//         </h2>
//         <p className="text-gray-400 mt-2 max-w-md mx-auto">
//           Explore the latest additions to our library catalog, handpicked just
//           for you.
//         </p>
//       </div>

//       {/* Books Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {books.map((book) => (
//           <div
//             key={book._id}
//             className="group bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
//           >
//             {/* Book Image Container */}
//             <div className="relative h-72 w-full overflow-hidden bg-gray-800">
//               <Image
//                 src={book.cover}
//                 height={55}
//                 width={55}
//                 alt={book.title}
//                 className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />

//               {/* Category Badge Floating */}
//               <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-indigo-300 border border-indigo-500/20 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
//                 {book.category}
//               </span>
//             </div>

//             {/* Book Content */}
//             <div className="p-6 flex flex-col flex-grow">
//               <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
//                 {book.title}
//               </h3>
//               <p className="text-sm font-medium text-gray-400 mt-1 mb-6">
//                 By <span className="text-gray-200">{book.author}</span>
//               </p>

//               {/* Action Button */}
//               <div className="mt-auto">
//                 <a
//                   href={`/all-books/${book._id}`}
//                   className="w-full flex items-center justify-center bg-white-600/20 border border-indigo-500/30 text-indigo-300 font-semibold py-2.5 px-4 rounded-xl hover:bg-white-600 hover:text-white transition-all duration-200 shadow-sm"
//                 >
//                   View Details
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* See All Books Button */}
//       <div className="text-center mt-14">
//         <Link
//           href="/all-books"
//           className="inline-flex items-center justify-center bg-white-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 transition-all duration-300"
//         >
//           See All Books
//           <svg
//             className="w-4 h-4 ml-2 -mr-1"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M14 5l7 7m0 0l-7 7m7-7H3"
//             ></path>
//           </svg>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

"use client";

import BookCard from "@/components/book-card";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewArrivals = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/new-arrivals")
      .then((res) => res.json())
      .then((data) => {
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load new arrivals:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="rounded-full bg-blue-500/20 h-10 w-10"></div>
          <div className="text-muted-foreground font-medium text-lg">
            Curating New Arrivals...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Section Header */}
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Fresh Off the Press ({books.length})
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight">
          New Arrivals
        </h2>
        <p className="text-muted-foreground">
          Explore the latest additions to our library catalog, handpicked just
          for you.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id || book._id} book={book} />
        ))}
      </div>

      {/* See All Books Button */}
      {/* <div className="text-center mt-14">
        <Link
          href="/all-books"
          className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/50 transition-all duration-300"
        >
          See All Books
          <svg
            className="w-4 h-4 ml-2 -mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link> */}
      {/* See All Books Button */}
      <div className="text-center mt-14">
        <Link
          href="/all-books"
          className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-3.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/50 transition-all duration-300"
        >
          See All Books
          <svg
            className="w-4 h-4 ml-2 -mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
