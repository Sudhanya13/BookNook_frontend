// "use client";

// import Link from "next/link";
// import { BookMarked, LogOut } from "lucide-react";
// import { useAuth } from "@/lib/auth-context";
// import { initials } from "@/lib/utils";
// import PrivateRoute from "@/components/private-route";
// import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// function ProfilePanel() {
//   const { user, logout } = useAuth();
//   if (!user) return null;

//   return (
//     <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
//       <div className="mb-8 space-y-3">
//         <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
//           Your account
//         </p>
//         <h1 className="font-heading text-3xl font-bold tracking-tight">
//           My Profile
//         </h1>
//       </div>

//       <Card>
//         <CardHeader>
//           <div className="flex items-center gap-4">
//             <Avatar className="size-16 ring-1 ring-border">
//               {user.photo ? (
//                 <AvatarImage src={user.photo} alt={user.name} />
//               ) : null}
//               <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
//                 {initials(user.name)}
//               </AvatarFallback>
//             </Avatar>
//             <div className="min-w-0">
//               <CardTitle className="truncate text-lg">{user.name}</CardTitle>
//               <CardDescription className="truncate">
//                 {user.email}
//               </CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex flex-wrap gap-2">
//             <Link
//               href="/my-books"
//               className={buttonVariants({ variant: "outline", size: "sm" })}
//             >
//               <BookMarked />
//               My Books
//             </Link>
//             <Link
//               href="/my-borrows"
//               className={buttonVariants({ variant: "outline", size: "sm" })}
//             >
//               <BookMarked />
//               My Borrows
//             </Link>
//           </div>

//           <Button
//             variant="destructive"
//             className="w-full"
//             onClick={logout}
//           >
//             <LogOut />
//             Logout
//           </Button>

//           <p className="text-center text-xs text-muted-foreground">
//             Demo account stored in this browser only.
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default function ProfilePage() {
//   return (
//     <PrivateRoute>
//       <ProfilePanel />
//     </PrivateRoute>
//   );
// }
