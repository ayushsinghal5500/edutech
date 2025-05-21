'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Video, MessageSquare, BookOpen, Clock, Download, X ,Filter} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mentor Data
const allMentors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    subject: "Physics",
    expertise: "Mechanics Specialist",
    rating: 4.8,
    experience: "15+ Years",
    image: "/mentors/1.jpg",
    qualifications: ["M.Tech (IIT Bombay)", "JEE Advanced Expert"],
    currentSessions: [
      { date: "Today", time: "4:00 PM", topic: "Newton's Laws Application" }
    ],
    upcomingSessions: [
      { date: "2024-03-22", time: "5:00 PM", topic: "Rotational Motion" }
    ],
    resources: [
      { title: "Mechanics Formula Sheet.pdf", type: "PDF" },
      { title: "Practice Problems Set.docx", type: "DOC" }
    ],
    suggestions: [
      "Focus on free-body diagrams practice",
      "Revise torque concepts daily"
    ],
    solvedDoubts: 45
  },
  {
    id: 2,
    name: "Ms. Anjali Verma",
    subject: "Chemistry",
    expertise: "Organic Chemistry",
    rating: 4.9,
    experience: "10 Years",
    image: "/mentors/2.jpg",
     qualifications: ["PhD in Organic Chemistry", "NTSE Mentor"],
    currentSessions: [],
    upcomingSessions: [
      { date: "2024-03-24", time: "3:00 PM", topic: "Hydrocarbons" }
    ],
    resources: [
      { title: "Organic Reactions Summary.pdf", type: "PDF" }
    ],
    suggestions: [
      "Practice reaction mechanisms",
      "Use color-coded notes for groups"
    ],
    solvedDoubts: 38
  },
  // Add more mentors as needed
];

export default function MentorList() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [activeTab, setActiveTab] = useState('sessions');
  const [sessionRequest, setSessionRequest] = useState({
    date: '',
    topic: '',
    message: ''
  });

  const handleSessionRequest = (e) => {
    e.preventDefault();
    console.log('Session Request Submitted:', sessionRequest);
    setSessionRequest({ date: '', topic: '', message: '' });
  };

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
         <div className="flex flex-row flex-wrap gap-4 items-start">
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

        <div className={`grid gap-4 transition-all ${selectedMentor ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {allMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className={`relative cursor-pointer transition-all ${
                selectedMentor && selectedMentor.id !== mentor.id 
                  ? 'opacity-50 pointer-events-none' 
                  : 'hover:shadow-lg'
              } ${
                selectedMentor?.id === mentor.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() =>
                setSelectedMentor(
                  selectedMentor?.id === mentor.id ? null : mentor
                )
              }
            >
              <CardHeader className="flex flex-col items-center text-center gap-3 p-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={mentor.image} />
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{mentor.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{mentor.subject} — {mentor.expertise}</p>
                <div className="flex items-center gap-2 text-primary text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {mentor.rating}/5 • {mentor.experience}
                </div>
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
              </CardHeader>
            </Card>
          ))}
        </div>

        {selectedMentor && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedMentor(null)} className="gap-2">
              <X className="w-4 h-4" /> Back to All Mentors
            </Button>

            <Card className="shadow-xl">
              <CardHeader className="border-b">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={selectedMentor.image} />
                    <AvatarFallback>{selectedMentor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{selectedMentor.name}</h1>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Star className="w-5 h-5 fill-current" />
                        <span>{selectedMentor.rating}/5</span>
                      </div>
                      <span className="text-muted-foreground">
                        {selectedMentor.experience} Experience
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="mt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="sessions">
                      <Clock className="w-4 h-4 mr-2" /> Sessions
                    </TabsTrigger>
                    <TabsTrigger value="resources">
                      <BookOpen className="w-4 h-4 mr-2" /> Resources
                    </TabsTrigger>
                    <TabsTrigger value="request">
                      <Video className="w-4 h-4 mr-2" /> Request
                    </TabsTrigger>
                  </TabsList>

                  {/* Sessions */}
                  <TabsContent value="sessions" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Active Sessions</h3>
                      {selectedMentor.currentSessions.length ? selectedMentor.currentSessions.map((session, idx) => (
                        <Card key={idx} className="mb-4">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{session.date} • {session.time}</p>
                              <p className="text-muted-foreground">{session.topic}</p>
                            </div>
                            <Button><Video className="mr-2 h-4 w-4" /> Join Now</Button>
                          </CardContent>
                        </Card>
                      )) : <p className="text-muted-foreground">No active sessions.</p>}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Upcoming Sessions</h3>
                      {selectedMentor.upcomingSessions.length ? selectedMentor.upcomingSessions.map((session, idx) => (
                        <Card key={idx} className="mb-4">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{session.date} • {session.time}</p>
                              <p className="text-muted-foreground">{session.topic}</p>
                            </div>
                            <Button variant="outline">Set Reminder</Button>
                          </CardContent>
                        </Card>
                      )) : <p className="text-muted-foreground">No upcoming sessions.</p>}
                    </div>
                  </TabsContent>

                  {/* Resources */}
                  <TabsContent value="resources" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Study Materials</h3>
                        <div className="space-y-4">
                          {selectedMentor.resources.map((res, idx) => (
                            <Card key={idx}>
                              <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{res.title}</p>
                                  <p className="text-muted-foreground">{res.type}</p>
                                </div>
                                <Button variant="outline"><Download className="h-4 w-4" /></Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Expert Suggestions</h3>
                        <ul className="space-y-3">
                          {selectedMentor.suggestions.map((text, idx) => (
                            <li key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                              <span className="text-primary">•</span>
                              <p className="text-muted-foreground">{text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Request */}
                  <TabsContent value="request" className="mt-6">
                    <form onSubmit={handleSessionRequest} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Preferred Date & Time</label>
                        <Input
                          type="datetime-local"
                          required
                          value={sessionRequest.date}
                          onChange={(e) => setSessionRequest({...sessionRequest, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Session Topic</label>
                        <Input
                          required
                          placeholder="Enter session topic"
                          value={sessionRequest.topic}
                          onChange={(e) => setSessionRequest({...sessionRequest, topic: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Additional Notes</label>
                        <Textarea
                          rows={4}
                          placeholder="Describe your requirements..."
                          value={sessionRequest.message}
                          onChange={(e) => setSessionRequest({...sessionRequest, message: e.target.value})}
                        />
                      </div>
                      <Button type="submit" className="w-full">Submit Request</Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="border-t mt-6 pt-4">
                <div className="text-muted-foreground">Doubts Solved: {selectedMentor.solvedDoubts}+</div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}