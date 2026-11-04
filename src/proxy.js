// };
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Adjust to your actual Better Auth path
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // Supported natively since proxy runs on the Node.js runtime
  });

  const user = session?.user;
  console.log("Proxy User:", user);

  // If user is not logged in, redirect them to login
  if (!user) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-book", "/my-books", "/my-borrows", "/all-books/:path"],
};
