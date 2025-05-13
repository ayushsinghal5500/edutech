"use client";
import Link from "next/link";
import { X, LogOut } from "lucide-react";
import { Avatar ,AvatarFallback,
  AvatarImage } from "@/components/ui/avatar";

const menu = [
  { label: "Home Dashboard", link: "/student" },
  { label: "Mock Tests", link: "/student/mock" },
  { label: "Notes", link: "/student/notes" },
  { label: "Reports", link: "/student/reports" },
  { label: "Personal Mentor", link: "/student/mentor" },
  { label: "Inbox", link: "/student/inbox" },
  { label: "Live Chats", link: "/student/chats" },
  { label: "Settings", link: "/student/settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  const handleLogout = () => {
    alert("Logged out successfully.");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-100 p-4 overflow-y-auto transition-transform transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-end md:hidden">
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* App Title */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-blue-600">EduTrack</h1>
        </div>

        {/* User Info */}
        <Link href="/student/profile" className="flex items-center gap-3 mb-6">
         <Avatar className="w-8 h-8 border-2 border-white">
          <AvatarImage src="/avatar.png" alt="Student Avatar" />
          <AvatarFallback>RS</AvatarFallback> {/* fallback initials */}
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Rahul Sharma</p>
            <p className="text-xs text-gray-500">JEE Aspirant</p>
          </div>
        </Link>

        {/* Simple Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className="block font-semibold px-2 py-1 hover:bg-gray-200 rounded"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left font-semibold px-2 py-1 hover:bg-red-100 text-red-600 rounded flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
