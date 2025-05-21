"use client";

import { Bell, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const initialNotifications = [
  {
    id: 1,
    title: "📘 New Notes Uploaded",
    message: "Organic Chemistry – Hydrocarbons is now available.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    title: "🧪 Mock Test Reminder",
    message: "Physics Mock Test 4 starts at 6 PM today.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "📣 Mentor Message",
    message: "Your mentor replied in the chat.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 4,
    title: "📊 Report Generated",
    message: "Your progress report for April is available.",
    time: "Yesterday",
    read: true,
  },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [deletedNotifications, setDeletedNotifications] = useState([]);
  const undoTimeouts = useRef({});

  const unreadCount = notifications.filter((note) => !note.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((note) => ({ ...note, read: true })));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((note) => (note.id === id ? { ...note, read: true } : note))
    );
  };

  const handleDeleteWithUndo = (id) => {
    const noteToDelete = notifications.find((note) => note.id === id);
    if (!noteToDelete) return;

    setDeletedNotifications((prev) => [...prev, noteToDelete]);
    setNotifications((prev) => prev.filter((note) => note.id !== id));

    undoTimeouts.current[id] = setTimeout(() => {
      setDeletedNotifications((prev) => prev.filter((note) => note.id !== id));
      delete undoTimeouts.current[id];
    }, 5000);
  };

  const handleUndo = (id) => {
    clearTimeout(undoTimeouts.current[id]);
    const restored = deletedNotifications.find((note) => note.id === id);
    if (restored) {
      setNotifications((prev) => [...prev, restored]);
      setDeletedNotifications((prev) => prev.filter((note) => note.id !== id));
    }
    delete undoTimeouts.current[id];
  };

  return (
    <div className="w-full px-2 sm:px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-primary w-5 h-5" />
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Notifications

          </h2>
        </div>
        {notifications.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllRead}
              className="text-xs"
            >
              Mark all read
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteAll}
              className="text-xs"
            >
              Delete all
            </Button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center mt-10">
          🎉 You&#39;re all caught up!
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map((note) => (
            <motion.div
              key={note.id}
              className={`w-full border border-muted rounded-xl overflow-hidden transition-all duration-200 ${
                note.read
                  ? "bg-muted/50 hover:bg-muted/70"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => handleMarkAsRead(note.id)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -100) {
                  handleDeleteWithUndo(note.id);
                }
              }}
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle
                  className={`text-base font-medium break-words ${
                    note.read ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-muted-foreground">
                <span className="break-words">{note.message}</span>
                <span className="flex items-center gap-1 text-xs text-primary whitespace-nowrap">
                  <Clock className="w-4 h-4" />
                  {note.time}
                </span>
              </CardContent>
            </motion.div>
          ))}
        </div>
      )}

      {/* Undo Message */}
      {deletedNotifications.map((note) => (
        <div
          key={note.id}
          className="flex justify-between items-center bg-destructive/10 text-destructive text-sm rounded-md px-4 py-2 mt-4"
        >
          <span>Notification deleted</span>
          <Button
            variant="link"
            size="sm"
            className="text-xs"
            onClick={() => handleUndo(note.id)}
          >
            Undo
          </Button>
        </div>
      ))}
    </div>
  );
}
