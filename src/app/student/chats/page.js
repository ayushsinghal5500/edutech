'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, SmilePlus, Paperclip, BookOpen, Users, MessageSquare, Video } from "lucide-react";
import { motion } from 'framer-motion';

export default function StudentChatPage() {
  const [activeTab, setActiveTab] = useState('mentors');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "क्या किसी को Electromagnetism समझ में आया?", sender: "Rahul", timestamp: "10:00 AM" },
    { id: 2, text: "मुझे Chemical Bonding में doubt है", sender: "You", timestamp: "10:05 AM" }
  ]);
  const messagesEndRef = useRef(null);

  // Mock Data
  const mentors = [
    { id: 1, name: "Physics Mentor", subject: "Mechanics", status: "online", avatar: "/mentor1.jpg" },
    { id: 2, name: "Chemistry Expert", subject: "Organic", status: "offline", avatar: "/mentor2.jpg" }
  ];

  const studyGroups = [
    { id: 1, name: "JEE Study Group", members: 12, unread: 3, subjects: ["Physics", "Maths"], lastMessage: "Let's discuss thermodynamics" },
    { id: 2, name: "NEET Biology", members: 8, unread: 0, subjects: ["Biology"], lastMessage: "Welcome to the group!" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage("");
  };

  const getFallbackInitials = (name) => {
    return name.split(" ").map(w => w[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant={activeTab === 'mentors' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('mentors')}
                className="flex-1"
              >
                <Users className="w-4 h-4 mr-2" /> Mentors
              </Button>
              <Button 
                variant={activeTab === 'groups' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('groups')}
                className="flex-1"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Groups
              </Button>
            </div>

            {activeTab === 'mentors' ? (
              <div className="space-y-3">
                <h3 className="font-medium">Available Mentors</h3>
                {mentors.map(mentor => (
                  <motion.div 
                    key={mentor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div 
                      className={`p-2 rounded-lg cursor-pointer ${selectedChat?.id === mentor.id ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedChat(mentor)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={mentor.avatar} />
                          <AvatarFallback>
                            {getFallbackInitials(mentor.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{mentor.name}</p>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${mentor.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <span className="text-sm text-muted-foreground">{mentor.subject}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-medium">Study Groups</h3>
                {studyGroups.map(group => (
                  <motion.div 
                    key={group.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div 
                      className={`p-2 rounded-lg cursor-pointer ${selectedChat?.id === group.id ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedChat(group)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <div className="text-sm text-muted-foreground">
                            {group.subjects.join(", ")}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {group.lastMessage}
                          </p>
                        </div>
                        {group.unread > 0 && (
                          <span className="bg-primary text-white rounded-full px-2 py-1 text-xs">
                            {group.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          <Button className="w-full" variant="secondary">
            <MessageSquare className="mr-2 w-4 h-4" /> New Group
          </Button>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedChat?.avatar && (
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>
                        {getFallbackInitials(selectedChat.name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <CardTitle>{selectedChat?.name || "Select a Chat"}</CardTitle>
                    {selectedChat?.subject && (
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.subject} Mentor • {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                      </p>
                    )}
                  </div>
                </div>
                {selectedChat && (
                  <Button 
                    variant="ghost"
                    disabled={selectedChat.status === 'offline'}
                    aria-label="Start video call"
                  >
                    <Video className="w-4 h-4 mr-2" /> Video Call
                  </Button>
                )}
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat ? (
                messages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6">
                    कोई संदेश नहीं - संवाद प्रारंभ करें!
                  </p>
                ) : (
                  messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className={`flex ${message.sender === "You" ? 'justify-end' : ''}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "You" 
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          <div className="text-sm font-medium">
                            {message.sender}
                          </div>
                          <p className="mt-1">{message.text}</p>
                          <div className="text-xs mt-2 opacity-70">
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  कृपया चैट या स्टडी ग्रुप चुनें
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            {selectedChat && (
              <form className="border-t p-4" onSubmit={handleSendMessage}>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      aria-label="Add emoji"
                      type="button"
                    >
                      <SmilePlus className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      aria-label="Attach file"
                      type="button"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                  </div>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    aria-label="Type your message"
                  />
                  <Button type="submit" aria-label="Send message">
                    <Send className="w-5 h-5 mr-2" /> भेजें
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}