import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import SocialLinks from "@/components/social-links";

const CONTACTS = [
  { icon: Mail, label: "hello@booknook.library" },
  { icon: Phone, label: "+1 (555) 012-3456" },
  { icon: MapPin, label: "42 Readers Lane, Storyville" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-white text-neutral-950">
              <BookOpen className="size-5" />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight text-white">
              BookNook
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            BookNook is a small online library where anyone can add a book,
            borrow a great read, and pass it on to the next reader.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm">
            {CONTACTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-neutral-500" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Follow us
          </h3>
          <p className="text-sm">
            News, new arrivals and reading lists, straight to your feed.
          </p>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p>Add a book · Borrow a book · Return a book</p>
        </div>
      </div>
    </footer>
  );
}
