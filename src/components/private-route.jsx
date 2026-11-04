// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/auth-context";

// // Frontend-only guard for the private routes (Add Book, My Books,
// // My Borrows, My Profile). Redirects to /login when nobody is signed in.
// export default function PrivateRoute({ children }) {
//   const { user, ready } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (ready && !user) {
//       router.replace("/login");
//     }
//   }, [ready, user, router]);

//   if (!ready) {
//     return (
//       <div className="flex min-h-[40vh] items-center justify-center">
//         <div
//           className="size-8 animate-spin rounded-full border-2 border-muted border-t-foreground"
//           aria-label="Loading"
//         />
//       </div>
//     );
//   }

//   if (!user) return null;

//   return children;
// }
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { BookOpen, LogOut, Menu, User, X } from "lucide-react";
// // import { useAuth } from "@/lib/auth-context";
// import { cn, initials } from "@/lib/utils";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const NAV_LINKS = [
//   { href: "/", label: "Home" },
//   { href: "/all-books", label: "All Books" },
//   { href: "/add-book", label: "Add Book", private: true },
//   { href: "/my-books", label: "My Books", private: true },
//   { href: "/my-borrows", label: "My Borrows", private: true },
// ];

// function isActive(pathname, href) {
//   if (href === "/") return pathname === "/";
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function NavLink({ href, label, onClick }) {
//   const pathname = usePathname();
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       aria-current={isActive(pathname, href) ? "page" : undefined}
//       className={cn(
//         "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//         isActive(pathname, href)
//           ? "bg-accent text-foreground"
//           : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
//       )}
//     >
//       {label}
//     </Link>
//   );
// }

// function Brand() {
//   return (
//     <Link href="/" className="flex items-center gap-2.5">
//       <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
//         <BookOpen className="size-5" />
//       </span>
//       <span className="font-heading text-xl font-bold tracking-tight">
//         BookNook
//       </span>
//     </Link>
//   );
// }

// // function AuthActions({ onNavigate }) {
// // const { user, ready, logout } = useAuth();

// // if (!ready) {
// //   return (
// //     <div
// //       className="h-8 w-36 animate-pulse rounded-lg bg-muted"
// //       aria-hidden="true"
// //     />
// //   );
// // }

// // if (!user) {
// //   return (
// //     <div className="flex items-center gap-2">
// //       <Link
// //         href="/login"
// //         className={buttonVariants({ variant: "outline" })}
// //         onClick={onNavigate}
// //       >
// //   Login
// // </Link>
// //       <Link
// //         href="/register"
// //         className={buttonVariants({ variant: "default" })}
// //         onClick={onNavigate}
// //       >
// //         Register
// //       </Link>
// //     </div>
// //   );
// // }

// //   function handleLogout() {
// //     // PrivateRoute redirects automatically when a protected page loses its user.
// //     logout();
// //     onNavigate?.();
// //   }

// //   return (
// //     <DropdownMenu>
// //       <DropdownMenuTrigger
// //         aria-label={`Account menu for ${user.name}`}
// //         className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
// //       >
// //         <Avatar className="size-9 ring-1 ring-border">
// //           {user.photo ? <AvatarImage src={user.photo} alt={user.name} /> : null}
// //           <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
// //             {initials(user.name)}
// //           </AvatarFallback>
// //         </Avatar>
// //       </DropdownMenuTrigger>
// //       <DropdownMenuContent align="end" className="w-60">
// //         <DropdownMenuLabel>
// //           <span className="block text-sm font-semibold text-foreground">
// //             {user.name}
// //           </span>
// //           <span className="block truncate text-xs text-muted-foreground">
// //             {user.email}
// //           </span>
// //         </DropdownMenuLabel>
// //         <DropdownMenuSeparator />
// //         <DropdownMenuItem
// //           render={<Link href="/profile" />}
// //           onClick={onNavigate}
// //           className="gap-2.5"
// //         >
// //           <User className="size-4" />
// //           My Profile
// //         </DropdownMenuItem>
// //         <DropdownMenuItem
// //           onClick={handleLogout}
// //           className="gap-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
// //         >
// //           <LogOut className="size-4" />
// //           Logout
// //         </DropdownMenuItem>
// //       </DropdownMenuContent>
// //     </DropdownMenu>
// //   );
// // }
{
  /* //   const [open, setOpen] = useState(false);
//   // const { user, ready, logout } = useAuth();
//   const close = () => setOpen(false);

//   return (
//     <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
//         <Brand />

//         <nav
//           className="hidden items-center gap-1 md:flex"
//           aria-label="Main navigation"
//         >
//           {NAV_LINKS.map((link) => (
//             <NavLink key={link.href} {...link} />
//           ))}
//         </nav>

//         <div className="hidden items-center gap-2 md:flex">
//           {/* <AuthActions /> */
}
//         </div>

{
  /* //         <button */
}
//           type="button"
//           onClick={() => setOpen((value) => !value)}
//           aria-expanded={open}
//           aria-label={open ? "Close menu" : "Open menu"}
//           className="grid size-9 place-items-center rounded-lg text-foreground hover:bg-accent md:hidden"
//         >
//           {open ? <X className="size-5" /> : <Menu className="size-5" />}
//         </button>
//       </div>

//       {open ? (
//         <div className="border-t border-border/70 bg-background md:hidden">
//           <nav
//             className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4"
//             aria-label="Mobile navigation"
//           >
//             {NAV_LINKS.map((link) => (
//               <NavLink key={link.href} {...link} onClick={close} />
//             ))}

//             <div className="mt-3 flex flex-col gap-2 border-t border-border/70 pt-4">
//               {!ready ? (
//                 <div
//                   className="h-8 w-full animate-pulse rounded-lg bg-muted"
//                   aria-hidden="true"
//                 />
//               ) : user ? (
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-3">
//                     <Avatar className="size-9 ring-1 ring-border">
//                       {user.photo ? (
//                         <AvatarImage src={user.photo} alt={user.name} />
//                       ) : null}
//                       <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
//                         {initials(user.name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-semibold">
//                         {user.name}
//                       </p>
//                       <p className="truncate text-xs text-muted-foreground">
//                         {user.email}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       logout();
//                       close();
//                     }}
//                     className="text-destructive"
//                   >
//                     <LogOut />
//                     Logout
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <Link
//                     href="/login"
//                     onClick={close}
//                     className={buttonVariants({ variant: "outline" })}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     onClick={close}
//                     className={buttonVariants({ variant: "default" })}
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </nav>
//         </div>
//       ) : null}
//     </header>
//   );
// } */}
