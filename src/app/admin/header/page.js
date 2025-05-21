"use client";
import { useState } from "react";
import { Menu, ChevronDown, Bell, Mail } from "lucide-react";
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function Header({ onToggleSidebar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold">Student Portal</h3>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link href="/student/notifications">
          <Bell className="w-5 h-5 cursor-pointer" />
        </Link>
        <Link href="/student/inbox">
          <Mail className="w-5 h-5 cursor-pointer" />
        </Link>

        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Avatar className="w-8 h-8 border-2 border-white">
          <AvatarImage src="/avatar.png" alt="Student Avatar" />
          <AvatarFallback>RS</AvatarFallback> {/* fallback initials */}
          </Avatar>
            <span className="hidden md:inline font-medium">John Doe</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
              <ul>
  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Link href="/student/profile">Profile</Link>
  </li>
  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Link href="/settings">Settings</Link>
  </li>
  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Link href="/login">Logout</Link>
  </li>
</ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
