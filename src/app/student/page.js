'use client';
import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { BookOpen, Clock, BarChart, Trophy } from "lucide-react";

const DashboardPage = () => {
    const mockTests = [
        { name: "JEE Main Mock 10", score: "256/300", date: "April 15, 2024" },
        { name: "JEE Main Mock 9", score: "251/300", date: "April 7, 2024" },
        { name: "JEE Main Mock 8", score: "247/300", date: "April 1, 2024" },
        { name: "JEE Main Mock 7", score: "260/300", date: "March 30, 2024" },
        { name: "NEET Mock 5", score: "680/720", date: "March 25, 2024" },
    ];

    const studyProgressData = [
        { subject: 'Physics', progress: 75 },
        { subject: 'Chemistry', progress: 68 },
        { subject: 'Mathematics', progress: 82 },
    ];

    const graphData = [
        { month: 'Sep', score: 100 },
        { month: 'Oct', score: 120 },
        { month: 'Nov', score: 150 },
        { month: 'Dec', score: 180 },
        { month: 'Jan', score: 220 },
        { month: 'Feb', score: 250 },
        { month: 'Mar', score: 280 },
        { month: 'Apr', score: 300 },
    ];

    const stats = {
        airRank: "1502",
        completedTests: "12",
        averageScore: "82%",
        studyHours: "45h",
    };

    return (
        <div className="container mx-auto p-6">
            {/* Welcome Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h1 className="text-2xl font-bold">Welcome Back, Rahul! 👋</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <StatCard icon={<Trophy />} title="AIR Rank" value={stats.airRank} />
                    <StatCard icon={<BookOpen />} title="Completed Tests" value={stats.completedTests} />
                    <StatCard icon={<BarChart />} title="Avg. Score" value={stats.averageScore} />
                    <StatCard icon={<Clock />} title="Study Hours" value={stats.studyHours} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Card */}
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src="/avatar.png" alt="Rahul Verma" />
                                <AvatarFallback>RV</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>Rahul Verma</CardTitle>
                                <CardDescription>JEE Aspirant</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Progress value={72} className="h-2" />
                            <p className="text-sm text-gray-600">Your Syllabus Completed: 72%</p>
                            <p className="text-sm text-gray-600">Last Activity: Today</p>
                        </div>
                        <Button variant="outline">View Profile</Button>
                    </CardContent>
                </Card>

                {/* Session Tracker */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Session Tracker</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Upcoming Mentor Session</p>
                                <p className="text-sm text-gray-600">April 20, 2024 - Chemistry</p>
                            </div>
                            <Button>Join Session</Button>
                        </div>
                        <div className="h-40 bg-gray-100 rounded-md" /> {/* Placeholder for graph */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
                                <p className="text-sm text-gray-600">In Progress</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
                                <p className="text-sm text-gray-600">Completed</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
                                <p className="text-sm text-gray-600">Revised</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">Personalized mentor feedback</p>
                    </CardContent>
                </Card>

                {/* Top 5 Mock Tests */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Top 5 Mock Tests</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {mockTests.slice(0, 5).map((test, index) => (
                            <div key={index} className="flex justify-between items-center py-2">
                                <div>
                                    <p className="font-medium">{test.name}</p>
                                    <p className="text-sm text-gray-500">{test.date}</p>
                                </div>
                                <Badge variant="secondary">{test.score}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Study Progress (Subject Wise) */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Study Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {studyProgressData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-medium">{item.subject}</p>
                                    <p className="text-sm text-gray-500">{item.progress}%</p>
                                </div>
                                <Progress value={item.progress} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Progress Over Time */}
            <Card className="w-full mt-8">
                <CardHeader>
                    <CardTitle>Progress Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <LineChart width="100%" height={300} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 300]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" dot={false} />
                    </LineChart>
                </CardContent>
            </Card>
             <Card className="w-full mt-8">
                <CardHeader>
                    <CardTitle>Your Mentor</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="/path/to/mentor.jpg" alt="Mentor" />
                        <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">Dr. Sharma</p>
                        <p className="text-sm text-gray-500">Physics Mentor</p>
                        <Button variant="outline" size="sm">Contact</Button>
                    </div>
                </CardContent>
            </Card>
            </div>

            

            {/* Personal Mentor */}
           
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <Card className="p-4 flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    </Card>
);

export default DashboardPage;