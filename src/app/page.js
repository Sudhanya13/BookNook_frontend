import { Suspense } from "react";
import { connection } from "next/server";
// import HeroSlider from "@/components/home/hero-slider";
import NewArrivals from "@/components/home/new-arrivals";
import HowBorrowingWorks from "@/components/home/how-borrowing-works";
import ReaderReviews from "@/components/home/reader-reviews";
import Banner from "@/components/home/Banner";

// Swiper reads the current time while rendering, which cannot be baked into
// a static shell. `connection()` marks the page as request-time work so the
// slider resolves server-side on each visit; `instant = false` allows the
// blocking render (Cache Components).
// export const instant = false;

export default async function HomePage() {
  await connection();

  return (
    <>
      <Banner></Banner>

      {/* <Suspense
        fallback={
          <div
            className="mx-auto max-w-7xl px-4 pt-6 sm:px-6"
            aria-hidden="true"
          >
            <div className="h-[420px] w-full animate-pulse rounded-2xl bg-muted md:h-[480px]" />
          </div>
        }
      >
        <HeroSlider />
      </Suspense> */}
      <NewArrivals />
      <HowBorrowingWorks />
      <ReaderReviews />
    </>
  );
}
