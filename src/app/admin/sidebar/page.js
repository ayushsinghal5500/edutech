"use client";
import Link from "next/link";
import { X, LogOut, Home, Users, UserCheck, BookOpen, FileText, BarChart2, Inbox, MessageCircle, Settings, ShieldCheck, ClipboardList, DollarSign, Clipboard, LifeBuoy } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menu = [
  // ── Overview ────────────────────────────────────
  { label: "Dashboard", link: "/admin/", icon: Home },

  // ── User Management ─────────────────────────────
  { label: "Users Management", link: "/admin/users/", icon: Users },

  // ── Mentor Management ───────────────────────────
  { label: "Mentors", link: "/admin/mentors", icon: UserCheck },

  // ── Mock Test Management ────────────────────────
  { label: "New Tests", link: "/admin/new-test/", icon: BookOpen },
  { label: "Manage Tests", link: "/admin/manage-tests", icon: FileText },

  // ── Notes Management ────────────────────────────
  { label: "Notes Management", link: "/admin/notes-management/", icon: ClipboardList },

  // ── Reports & Progress ─────────────────────────
  { label: "Reports", link: "/admin/reports/", icon: BarChart2 },

  // ── Inbox & Chat Management ─────────────────────
  { label: "Inbox", link: "/admin/inbox-management", icon: Inbox },
  { label: "Live Chat", link: "/admin/live-chat-management", icon: MessageCircle },

  // ── Settings ────────────────────────────────────
  { label: "System Settings", link: "/admin/settings/system", icon: Settings },
  { label: "Account Preferences", link: "/admin/settings/account", icon: ShieldCheck },
  { label: "Roles & Access", link: "/admin/settings/roles", icon: Clipboard },

  // ── Audit & Monitoring ──────────────────────────
  { label: "Fees Management", link: "/admin/fees-management", icon: DollarSign },
   { label: "Audit Logs", link: "/admin/audit-logs", icon: ClipboardList },
  { label: "Payment & Billing", link: "/admin/payment-billing", icon: DollarSign },
  { label: "Support Tickets", link: "/admin/support-tickets", icon: LifeBuoy },
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
        {/* Close Button (mobile) */}
        <div className="flex justify-end md:hidden">
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* App Title */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-blue-600">EduTrack • Admin</h1>
        </div>

        {/* Admin Avatar */}
        <Link href="/admin/profile" className="flex items-center gap-3 mb-6">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src="/admin-avatar.png" alt="Admin Avatar" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </Link>

        {/* Nav Menu */}
        <nav>
          <ul className="space-y-2">
            {menu.map(({ label, link, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={link}
                  className="flex items-center gap-2 font-semibold px-2 py-1 hover:bg-gray-200 rounded"
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                  {label}
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
