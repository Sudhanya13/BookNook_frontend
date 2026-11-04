// "use client";

// import Link from "next/link";
// import { BookOpen, LogIn, UserPlus, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverDescription,
//   PopoverHeader,
//   PopoverTitle,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export default function Navbar() {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const handleSignout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           // Redirect or reload if necessary, e.g., window.location.href = "/"
//         },
//       },
//     });
//   };

//   return (
//     <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
//       <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
//         <Link href="/" className="flex items-center gap-2.5 justify-self-start">
//           <span className="grid size-9 place-items-center rounded-xl bg-foreground text-background">
//             <BookOpen className="size-5" />
//           </span>
//           <span className="font-heading text-xl font-bold tracking-tight">
//             BookNook
//           </span>
//         </Link>

//         <ul className="hidden items-center gap-1 md:flex">
//           <li>
//             <Link
//               href="/"
//               className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/all-books"
//               className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//             >
//               All Books
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/add-book"
//               className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//             >
//               Add Book
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/my-books"
//               className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//             >
//               My Books
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/my-borrows"
//               className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//             >
//               My Borrows
//             </Link>
//           </li>
//         </ul>

//         <div className="flex items-center gap-2 justify-self-end sm:gap-4">
//           <div className="hidden h-6 border-l border-border/70 sm:block" />

//           {user ? (
//             /* User is logged in: Show Avatar Popover */
//             <Popover>
//               <PopoverTrigger>
//                 {/* <Button
//                   type="button"
//                   className="relative flex size-9 items-center justify-center rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                 > */}
//                 <Avatar className="size-9">
//                   <AvatarImage
//                     referrerPolicy="no-referrer"
//                     src={user.image || ""}
//                     alt={user.name || "User"}
//                   />
//                   <AvatarFallback>
//                     {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 {/* </Button> */}
//               </PopoverTrigger>
//               <PopoverContent className="w-56" align="end">
//                 <PopoverHeader className="space-y-2 text-left">
//                   <PopoverTitle className="text-sm font-semibold">
//                     {user.name}
//                   </PopoverTitle>
//                   <PopoverDescription className="text-xs text-muted-foreground truncate">
//                     {user.email}
//                   </PopoverDescription>
//                 </PopoverHeader>
//                 <div className="mt-4 pt-2 border-t">
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     className="w-full justify-start gap-2"
//                     onClick={handleSignout}
//                   >
//                     <LogOut className="size-4" />
//                     Sign Out
//                   </Button>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           ) : (
//             /* User is logged out: Show Login and Register buttons */
//             <>
//               <Button
//                 variant="ghost"
//                 size="lg"
//                 nativeButton={false}
//                 render={<Link href="/login" />}
//               >
//                 <LogIn className="size-4 mr-1" />
//                 Login
//               </Button>
//               <Button
//                 variant="default"
//                 nativeButton={false}
//                 size="lg"
//                 className="h-9 px-4"
//                 render={<Link href="/register" />}
//               >
//                 <UserPlus className="size-4 mr-1" />
//                 Register
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { BookOpen, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 justify-self-start">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-background">
            <BookOpen className="size-5" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight">
            BookNook
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {/* Public Routes */}
          <li>
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/all-books"
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              All Books
            </Link>
          </li>

          {/* Private Routes - Rendered ONLY if user is logged in */}
          {user && (
            <>
              <li>
                <Link
                  href="/add-book"
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  href="/my-books"
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  href="/my-borrows"
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  My Borrows
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-2 justify-self-end sm:gap-4">
          <div className="hidden h-6 border-l border-border/70 sm:block" />

          {!isPending && (
            <>
              {user ? (
                /* User is logged in: Show Avatar Popover */
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="size-9 cursor-pointer">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <PopoverHeader className="space-y-2 text-left">
                      <PopoverTitle className="text-sm font-semibold">
                        {user.name}
                      </PopoverTitle>
                      <PopoverDescription className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </PopoverDescription>
                    </PopoverHeader>
                    <div className="mt-4 pt-2 border-t">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={handleSignout}
                      >
                        <LogOut className="size-4" />
                        Sign Out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                /* User is logged out: Show Login and Register buttons */
                <>
                  <Button
                    variant="ghost"
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/login" />}
                  >
                    <LogIn className="size-4 mr-1" />
                    Login
                  </Button>
                  <Button
                    variant="default"
                    nativeButton={false}
                    size="lg"
                    className="h-9 px-4"
                    render={<Link href="/register" />}
                  >
                    <UserPlus className="size-4 mr-1" />
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
