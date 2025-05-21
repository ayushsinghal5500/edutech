"use client";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Users,
  NotebookPen,
  FilePlus,
  Upload,
  MessageCircle,
  FileBarChart,
  CheckCircle2,
  CalendarClock,
  Inbox,
  Clipboard,
  FileText,
  Bell,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menu = [
  { label: "Dashboard", link: "/mentor", icon: LayoutDashboard },
  { label: "Profile", link: "/mentor/profile", icon: User },
  { label: "My Students", link: "/mentor/students", icon: Users },
  { label: "Personal Mentoring", link: "/mentor/panel", icon: NotebookPen },
  { label: "Create New Test", link: "/mentor/create-test", icon: FilePlus },
  { label: "Upload Notes", link: "/mentor/upload-notes", icon: Upload },
  { label: "1-on-1 Doubts", link: "/mentor/doubts", icon: MessageCircle },
  { label: "Student Reports", link: "/mentor/reports", icon: FileBarChart },
  { label: "Suggestions", link: "/mentor/suggestions", icon: CheckCircle2 },
  { label: "Schedule Sessions", link: "/mentor/schedule", icon: CalendarClock },
  { label: "Session Requests", link: "/mentor/requests", icon: Inbox },
  { label: "Session History", link: "/mentor/session-history", icon: Clipboard },
  { label: "Feedback", link: "/mentor/feedback", icon: FileText },
  { label: "Inbox & Chats", link: "/mentor/inbox", icon: MessageCircle },
  { label: "Notifications", link: "/mentor/notifications", icon: Bell },
  { label: "Settings", link: "/mentor/settings", icon: Settings },
];

export default function MentorSidebar({ isOpen, onClose }) {
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
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white border-r p-4 overflow-y-auto transition-transform transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button (mobile) */}
        <div className="flex justify-end md:hidden">
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* App Title */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-blue-600">EduTrack • Mentor</h1>
        </div>

        {/* Mentor Avatar */}
        <Link href="/mentor/profile" className="flex items-center gap-3 mb-6">
          <Avatar className="w-9 h-9 border-2 border-white">
            <AvatarImage src="/mentor-avatar.png" alt="Mentor Avatar" />
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Mentor Name</p>
            <p className="text-xs text-gray-500">JEE/NEET Mentor</p>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {menu.map(({ label, link, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={link}
                  className="flex items-center gap-2 font-medium text-gray-700 px-2 py-1 hover:bg-gray-100 rounded"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  {label}
                </Link>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left font-medium px-2 py-1 hover:bg-red-100 text-red-600 rounded flex items-center gap-2"
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
