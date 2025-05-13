'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Download, Star, Search, Share2, FileText } from "lucide-react";

const notes = [
  // Physics Notes
  { id: 1, title: "Newton's Laws", subject: "Physics", isNew: true, downloads: 45, isFavorited: false, isDownloaded: false },
  { id: 2, title: "Electromagnetism", subject: "Physics", isNew: false, downloads: 32, isFavorited: true, isDownloaded: true },
  
  // Chemistry Notes
  { id: 3, title: "Atomic Structure", subject: "Chemistry", isNew: true, downloads: 28, isFavorited: false, isDownloaded: false },
  { id: 4, title: "Organic Chemistry", subject: "Chemistry", isNew: false, downloads: 24, isFavorited: true, isDownloaded: true },
  
  // Maths Notes
  { id: 5, title: "Calculus Basics", subject: "Maths", isNew: true, downloads: 37, isFavorited: false, isDownloaded: false },
];

export default function StudentNotes() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('all');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = activeSubject === 'all' || note.subject.toLowerCase() === activeSubject;
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'new' && note.isNew) ||
      (activeTab === 'downloads' && note.isDownloaded) ||
      (activeTab === 'favorites' && note.isFavorited);

    return matchesSearch && matchesSubject && matchesTab;
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <h1 className="text-3xl font-bold">📚 Study Materials</h1>
          <div className="relative w-full md:w-96">
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Subjects Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeSubject === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveSubject('all')}
            >
              All
            </Button>
            {['Physics', 'Chemistry', 'Maths'].map(subject => (
              <Button
                key={subject}
                variant={activeSubject === subject.toLowerCase() ? 'default' : 'outline'}
                onClick={() => setActiveSubject(subject.toLowerCase())}
              >
                {subject}
              </Button>
            ))}
          </div>

          {/* Tabs Filter */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="downloads">My Downloads</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNotes.map(note => (
            <Card key={note.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col h-full justify-between">
                {/* Note Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-muted-foreground">{note.subject}</span>
                  </div>
                  {note.isNew && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      New
                    </span>
                  )}
                </div>

                {/* Note Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{note.downloads} Downloads</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {/* Add favorite logic */}}
                  >
                    <Star className={`w-4 h-4 ${note.isFavorited ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {/* Add download logic */}}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {/* Add share logic */}}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No notes found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}