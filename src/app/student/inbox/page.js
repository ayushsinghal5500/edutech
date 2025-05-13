"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, MailOpen, Mail, Reply, Plus } from "lucide-react";
import clsx from "clsx";

const sampleMessages = [
  {
    id: 1,
    title: "New Assignment: Physics",
    content: "Please complete Chapter 5 – Newton's Laws before Friday.",
    type: "assignment",
    date: "May 12, 2025",
    read: false,
    replies: [],
  },
  {
    id: 2,
    title: "Reminder: Mentor Session",
    content: "Your session with Dr. Sharma is scheduled for tomorrow at 4:30 PM.",
    type: "reminder",
    date: "May 11, 2025",
    read: true,
    replies: [
      {
        id: 1,
        text: "I'll be there!",
        sender: "me",
        date: "May 11, 2025 10:00 AM"
      }
    ],
  },
  {
    id: 3,
    title: "Message from Admin",
    content: "We’ve updated our mock test schedule. Please check your dashboard.",
    type: "message",
    date: "May 10, 2025",
    read: false,
    replies: [],
  },
];

const MessageTag = ({ type, onClick, isButton }) => {
  const tagMap = {
    assignment: { label: "Assignment", color: "bg-blue-100 text-blue-700" },
    reminder: { label: "Reminder", color: "bg-yellow-100 text-yellow-800" },
    message: { label: "Message", color: "bg-green-100 text-green-800" },
  };

  return (
    <span
      className={clsx(
        "text-xs px-2 py-0.5 rounded-full font-medium",
        tagMap[type]?.color,
        isButton && "cursor-pointer hover:opacity-80"
      )}
      onClick={onClick}
    >
      {tagMap[type]?.label}
    </span>
  );
};

export default function StudentInbox() {
  const [messages, setMessages] = useState(sampleMessages);
  const [trashedMessages, setTrashedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState("inbox");
  const [composeData, setComposeData] = useState({
    subject: "",
    content: ""
  });

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || msg.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // New message composition handler
  const handleCompose = (e) => {
    e.preventDefault();
    const newMessage = {
      id: Date.now(),
      title: composeData.subject,
      content: composeData.content,
      type: "message",
      date: new Date().toLocaleDateString(),
      read: false,
      replies: [],
    };
    setMessages(prev => [newMessage, ...prev]);
    setComposeData({ subject: "", content: "" });
    setActiveTab("inbox");
  };

  // Reply handler
  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText || !selectedMessage) return;

    const newReply = {
      id: Date.now(),
      text: replyText,
      sender: "me",
      date: new Date().toLocaleString(),
    };

    setMessages(prev =>
      prev.map(msg =>
        msg.id === selectedMessage.id
          ? { ...msg, replies: [...msg.replies, newReply] }
          : msg
      )
    );
    setReplyText("");
  };

  // Move to trash
  const deleteMessage = (id) => {
    const message = messages.find(msg => msg.id === id);
    setTrashedMessages(prev => [...prev, message]);
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  // Restore from trash
  const restoreMessage = (id) => {
    const message = trashedMessages.find(msg => msg.id === id);
    setMessages(prev => [...prev, message]);
    setTrashedMessages(prev => prev.filter(msg => msg.id !== id));
  };

  // Mark as read/unread
  const markAsRead = (id) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, read: !msg.read } : msg))
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Sidebar */}
      <div className="md:w-1/3 w-full border-r bg-white overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === "inbox" ? "default" : "outline"}
              onClick={() => setActiveTab("inbox")}
              size="sm"
            >
              Inbox
            </Button>
            <Button
              variant={activeTab === "compose" ? "default" : "outline"}
              onClick={() => setActiveTab("compose")}
              size="sm"
              className="gap-2"
            >
              <Plus size={16} /> Compose
            </Button>
            <Button
              variant={activeTab === "trash" ? "default" : "outline"}
              onClick={() => setActiveTab("trash")}
              size="sm"
            >
              <Trash2 size={16} className="mr-2" /> 
              Trash ({trashedMessages.length})
            </Button>
          </div>

          {/* Inbox Filters */}
          {activeTab === "inbox" && (
            <>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  size="sm"
                >
                  All
                </Button>
                {["assignment", "reminder", "message"].map((type) => (
                  <MessageTag
                    key={type}
                    type={type}
                    isButton
                    onClick={() => setSelectedCategory(type)}
                  />
                ))}
              </div>
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </>
          )}
        </div>

        {/* Messages List */}
        {activeTab === "inbox" && (
          <ul className="divide-y">
            {filteredMessages.map((msg) => (
              <li
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.read) markAsRead(msg.id);
                }}
                className={clsx(
                  "p-4 cursor-pointer hover:bg-gray-100 transition-all",
                  !msg.read && "bg-gray-50 font-semibold"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm">{msg.title}</h4>
                  <MessageTag type={msg.type} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {msg.content.slice(0, 50)}...
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[10px] text-gray-400">{msg.date}</p>
                  {msg.replies.length > 0 && (
                    <span className="text-xs text-blue-500">
                      {msg.replies.length} replies
                    </span>
                  )}
                </div>
              </li>
            ))}
            {filteredMessages.length === 0 && (
              <li className="p-4 text-sm text-muted-foreground">
                No messages found.
              </li>
            )}
          </ul>
        )}

        {/* Trash List */}
        {activeTab === "trash" && (
          <ul className="divide-y">
            {trashedMessages.map((msg) => (
              <li
                key={msg.id}
                className="p-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedMessage(msg)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm">{msg.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {msg.content.slice(0, 50)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        restoreMessage(msg.id);
                      }}
                    >
                      Restore
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrashedMessages(prev => 
                          prev.filter(m => m.id !== msg.id)
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Panel */}
      <div className="md:w-2/3 w-full flex-1 bg-gray-50 overflow-y-auto p-6">
        {activeTab === "compose" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">New Message</h2>
            <form onSubmit={handleCompose} className="space-y-4">
              <Input
                placeholder="Subject"
                value={composeData.subject}
                onChange={(e) =>
                  setComposeData(prev => ({
                    ...prev,
                    subject: e.target.value
                  }))
                }
              />
              <textarea
                className="w-full p-4 h-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message..."
                value={composeData.content}
                onChange={(e) =>
                  setComposeData(prev => ({
                    ...prev,
                    content: e.target.value
                  }))
                }
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("inbox")}
                >
                  Cancel
                </Button>
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <AnimatePresence>
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Message Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMessage.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <MessageTag type={selectedMessage.type} />
                      <p className="text-sm text-muted-foreground">
                        {selectedMessage.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => markAsRead(selectedMessage.id)}
                    >
                      {selectedMessage.read ? (
                        <MailOpen size={18} />
                      ) : (
                        <Mail size={18} />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteMessage(selectedMessage.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-800">{selectedMessage.content}</p>
                </div>

                {/* Replies Section */}
                <div className="space-y-6">
                  <h3 className="font-medium border-b pb-2">
                    Replies ({selectedMessage.replies.length})
                  </h3>
                  
                  {/* Replies List */}
                  <div className="space-y-4">
                    {selectedMessage.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={clsx(
                          "p-4 rounded-lg border",
                          reply.sender === "me"
                            ? "bg-blue-50 border-blue-100 ml-6"
                            : "bg-white border-gray-100"
                        )}
                      >
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{reply.sender}</span>
                          <span className="text-muted-foreground">{reply.date}</span>
                        </div>
                        <p className="text-gray-800">{reply.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <form onSubmit={handleReply} className="pt-4">
                    <div className="flex gap-2">
                      <Input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                      />
                      <Button type="submit" className="gap-2">
                        <Reply size={16} />
                        Send
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-400 mt-20">
                <p>
                  {activeTab === "trash" 
                    ? "Select a trashed message to view" 
                    : "Select a message to read"}
                </p>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}