'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Video, MessageSquare, Filter, X } from "lucide-react";

// Flat Mentor Data Structure
const allMentors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    subject: "Physics",
    expertise: "Mechanics Specialist",
    rating: 4.8,
    experience: "15+ Years",
    qualifications: ["M.Tech (IIT Bombay)", "JEE Advanced Expert"],
    image: "/mentors/1.jpg"
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    subject: "Chemistry",
    expertise: "Organic Chemistry Guru",
    rating: 4.9,
    experience: "12+ Years", 
    qualifications: ["PhD in Organic Chemistry", "NTSE Mentor"],
    image: "/mentors/2.jpg"
  },
  // ...more mentors
];

export default function MentorList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: '',
    minRating: 0,
    experience: ''
  });

  // Filtering logic
  const filteredMentors = allMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        mentor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = (
      (!filters.subject || mentor.subject === filters.subject) &&
      (mentor.rating >= filters.minRating) &&
      (!filters.experience || mentor.experience === filters.experience)
    );

    return matchesSearch && matchesFilters;
  });

  // Available filter options
  const subjects = [...new Set(allMentors.map(m => m.subject))];
  const experiences = ['1-3 Years', '4-6 Years', '7-10 Years', '10+ Years'];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search mentors by name, subject or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
            <Filter className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <Button 
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
              Filters
            </Button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
                <div className="space-y-4">
                  {/* Subject Filter */}
                  <div>
                    <h4 className="font-medium mb-2">Subject</h4>
                    <select 
                      className="w-full p-2 border rounded"
                      value={filters.subject}
                      onChange={(e) => setFilters({...filters, subject: e.target.value})}
                    >
                      <option value="">All Subjects</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h4 className="font-medium mb-2">Minimum Rating</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={filters.minRating}
                        onChange={(e) => setFilters({...filters, minRating: e.target.value})}
                        className="w-full"
                      />
                      <span className="text-sm">{filters.minRating}+</span>
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <h4 className="font-medium mb-2">Experience</h4>
                    <select
                      className="w-full p-2 border rounded"
                      value={filters.experience}
                      onChange={(e) => setFilters({...filters, experience: e.target.value})}
                    >
                      <option value="">Any Experience</option>
                      {experiences.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setFilters({
                          subject: '',
                          minRating: 0,
                          experience: ''
                        });
                        setShowFilters(false);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMentors.map(mentor => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={mentor.image} />
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>{mentor.name}</CardTitle>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-medium">
                      {mentor.subject} • {mentor.expertise}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{mentor.rating}/5 ({mentor.experience})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  {mentor.qualifications.join(' • ')}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Video className="w-4 h-4" /> Call
                  </Button>
                  <Button className="flex-1 gap-2">
                    <MessageSquare className="w-4 h-4" /> Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No mentors found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}