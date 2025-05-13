'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookText, Trophy, BarChart, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function Profile() {
  const mockTests = [
    { name: "JEE Main Mock 1", date: "2024-03-01", score: "235/300" },
    { name: "JEE Main Mock 2", date: "2024-03-15", score: "248/300" }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 text-black">
      {/* Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/student.jpg" // Add profile image in public/images folder
              alt="Student Avatar"
              width={72}
              height={72}
              className="rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold">Rahul Verma</h1>
              <p className="text-sm text-gray-700">JEE Aspirant</p>
            </div>
          </div>
          <Button variant="outline" className="bg-white/10 text-black border-black hover:bg-white/20" asChild>
            <a href="/profile/edit">Edit Profile</a>
          </Button>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Card className="p-6 border border-gray-200 rounded-2xl shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <BookText className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold">Personal Information</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Name:</strong> Rahul Verma</p>
                <p><strong>DOB:</strong> 15th March 2007</p>
                <p><strong>Exam Type:</strong> JEE</p>
                <p><strong>Email:</strong> rahuljee@gmail.com</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
                <p><strong>Address:</strong> 45/A, Laxmi Nagar, Delhi</p>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 border border-gray-200 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold">Achievements</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-500/80 text-white">🎖️ Top 10% in Physics</Badge>
                <Badge className="bg-blue-500/80 text-white">📚 50+ Notes Completed</Badge>
                <Badge className="bg-white/20 text-white opacity-50">🔒 Perfect Score (Locked)</Badge>
              </div>
            </div>
          </Card>

          {/* Study Progress */}
          <Card className="p-6 border border-gray-200 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold">Study Progress</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2">JEE Syllabus Completion</p>
                  <Progress value={65} className="h-2 bg-white/30" />
                </div>
                <div>
                  <p className="text-sm mb-2">Weak Areas Identified</p>
                  <div className="flex gap-2">
                    <Badge variant="destructive" className="bg-red-600/80">Organic Chemistry</Badge>
                    <Badge variant="destructive" className="bg-red-600/80">Rotational Motion</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 border border-gray-200 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-4 bg-white/5">
                  <p className="font-medium mb-2">📝 Latest Mock Test</p>
                  <p className="text-sm">{mockTests[0].name}</p>
                  <p className="text-sm text-gray-500">{mockTests[0].score}</p>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-white/5">
                  <p className="font-medium mb-2">👨🏫 Upcoming Mentor Session</p>
                  <p className="text-sm">15th April 2024 (Chemistry)</p>
                  <Button size="sm" className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black">
                    Join Session
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg" asChild>
            <a href="/mock-tests">Take Mock Test</a>
          </Button>
          <Button variant="outline" className="border-black text-black hover:bg-black/10" asChild>
            <a href="/notes">View Study Notes</a>
          </Button>
          <Button variant="outline" className="border-black text-black hover:bg-black/10" asChild>
            <a href="/mentor">Book Mentor Session</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
