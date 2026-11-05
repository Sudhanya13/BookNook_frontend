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

// "use client";

// import Link from "next/link";
// import { BookOpen, LogIn, UserPlus, LogOut, User } from "lucide-react";
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
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const handleSignout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           window.location.href = "/";
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
//           {/* Public Routes */}
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

//           {/* Private Routes - Rendered ONLY if user is logged in */}
//           {user && (
//             <>
//               <li>
//                 <Link
//                   href="/add-book"
//                   className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//                 >
//                   Add Book
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/my-books"
//                   className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//                 >
//                   My Books
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/my-borrows"
//                   className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//                 >
//                   My Borrows
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         <div className="flex items-center gap-2 justify-self-end sm:gap-4">
//           <div className="hidden h-6 border-l border-border/70 sm:block" />

//           {!isPending && (
//             <>
//               {user ? (
//                 /* User is logged in: Show Avatar Popover */
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Avatar className="size-9 cursor-pointer">
//                       <AvatarImage
//                         referrerPolicy="no-referrer"
//                         src={user.image || ""}
//                         alt={user.name || "User"}
//                       />
//                       <AvatarFallback>
//                         {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-56" align="end">
//                     <PopoverHeader className="space-y-1 text-left">
//                       <PopoverTitle className="text-sm font-semibold">
//                         {user.name}
//                       </PopoverTitle>
//                       <PopoverDescription className="text-xs text-muted-foreground truncate">
//                         {user.email}
//                       </PopoverDescription>
//                     </PopoverHeader>

//                     <div className="mt-3 space-y-1 pt-2 border-t">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="w-full justify-start gap-2 font-normal"
//                         nativeButton={false}
//                         render={<Link href="/profile" />}
//                       >
//                         <User className="size-4" />
//                         My Profile
//                       </Button>

//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         className="w-full justify-start gap-2"
//                         onClick={handleSignout}
//                       >
//                         <LogOut className="size-4" />
//                         Sign Out
//                       </Button>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               ) : (
//                 /* User is logged out: Show Login and Register buttons */
//                 <>
//                   <Button
//                     variant="ghost"
//                     size="lg"
//                     nativeButton={false}
//                     render={<Link href="/login" />}
//                   >
//                     <LogIn className="size-4 mr-1" />
//                     Login
//                   </Button>
//                   <Button
//                     variant="default"
//                     nativeButton={false}
//                     size="lg"
//                     className="h-9 px-4"
//                     render={<Link href="/register" />}
//                   >
//                     <UserPlus className="size-4 mr-1" />
//                     Register
//                   </Button>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, LogIn, UserPlus, LogOut, User, Menu, X } from "lucide-react";

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass =
    "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  const mobileLinkClass =
    "block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={closeMobileMenu}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-background">
            <BookOpen className="size-5" />
          </span>

          <span className="font-heading text-lg font-bold tracking-tight sm:text-xl">
            BookNook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link href="/" className={navLinkClass}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/all-books" className={navLinkClass}>
              All Books
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link href="/add-book" className={navLinkClass}>
                  Add Book
                </Link>
              </li>

              <li>
                <Link href="/my-books" className={navLinkClass}>
                  My Books
                </Link>
              </li>

              <li>
                <Link href="/my-borrows" className={navLinkClass}>
                  My Borrows
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            {!isPending &&
              (user ? (
                <Popover>
                  <PopoverTrigger asChild>
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
                    <PopoverHeader className="space-y-1 text-left">
                      <PopoverTitle className="text-sm font-semibold">
                        {user.name}
                      </PopoverTitle>

                      <PopoverDescription className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="mt-3 space-y-1 border-t pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 font-normal"
                        nativeButton={false}
                        render={<Link href="/profile" />}
                      >
                        <User className="size-4" />
                        My Profile
                      </Button>

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
                <>
                  <Button
                    variant="ghost"
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/login" />}
                  >
                    <LogIn className="mr-1 size-4" />
                    Login
                  </Button>

                  <Button
                    variant="default"
                    size="lg"
                    className="h-9 px-4"
                    nativeButton={false}
                    render={<Link href="/register" />}
                  >
                    <UserPlus className="mr-1 size-4" />
                    Register
                  </Button>
                </>
              ))}
          </div>

          {/* Mobile User Avatar */}
          {!isPending && user && (
            <div className="sm:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="size-8 cursor-pointer">
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
                  <PopoverHeader className="space-y-1 text-left">
                    <PopoverTitle className="text-sm font-semibold">
                      {user.name}
                    </PopoverTitle>

                    <PopoverDescription className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </PopoverDescription>
                  </PopoverHeader>

                  <div className="mt-3 space-y-1 border-t pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 font-normal"
                      nativeButton={false}
                      render={<Link href="/profile" />}
                    >
                      <User className="size-4" />
                      My Profile
                    </Button>

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
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/70 bg-background px-4 py-4 shadow-lg md:hidden">
          <ul className="mx-auto max-w-7xl space-y-1">
            <li>
              <Link
                href="/"
                className={mobileLinkClass}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/all-books"
                className={mobileLinkClass}
                onClick={closeMobileMenu}
              >
                All Books
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link
                    href="/add-book"
                    className={mobileLinkClass}
                    onClick={closeMobileMenu}
                  >
                    Add Book
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-books"
                    className={mobileLinkClass}
                    onClick={closeMobileMenu}
                  >
                    My Books
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-borrows"
                    className={mobileLinkClass}
                    onClick={closeMobileMenu}
                  >
                    My Borrows
                  </Link>
                </li>
              </>
            )}

            {/* Mobile Login/Register */}
            {!isPending && !user && (
              <li className="flex gap-2 border-t pt-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  nativeButton={false}
                  render={<Link href="/login" />}
                  onClick={closeMobileMenu}
                >
                  <LogIn className="mr-1 size-4" />
                  Login
                </Button>

                <Button
                  className="flex-1"
                  nativeButton={false}
                  render={<Link href="/register" />}
                  onClick={closeMobileMenu}
                >
                  <UserPlus className="mr-1 size-4" />
                  Register
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
