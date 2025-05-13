'use client';
import React from "react";
import {
  Badge as UIBadge
} from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  BookOpen,
  Clock,
  Award,
  AlertTriangle,
  BarChart2,
  BarChart as BarChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useState, useEffect } from "react";

export default function StudentReports() {
  const performanceData = [
    { subject: "Physics", "Mock Tests": 82, "Assignments": 75 },
    { subject: "Chemistry", "Mock Tests": 78, "Assignments": 80 },
    { subject: "Mathematics", "Mock Tests": 92, "Assignments": 88 },
  ];

  const attendanceData = [
    { date: "Jan", attendance: 85 },
    { date: "Feb", attendance: 88 },
    { date: "Mar", attendance: 92 },
    { date: "Apr", attendance: 90 },
  ];

  const recentReports = [
    { id: 1, name: "Mid-Term Report", date: "2024-03-15", score: "A", status: "Released" },
    { id: 2, name: "Pre-Board Report", date: "2024-04-01", score: "B+", status: "Pending" },
  ];

  const weakAreas = ["Organic Chemistry", "Vector Algebra", "Thermodynamics"];

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Award className="w-7 h-7 sm:w-8 sm:h-8" />
            Student Performance Dashboard
          </h1>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Overall Progress" 
            value="78%" 
            icon={<BookOpen />}
            trend="+2.5% from last month"
          />
          <StatCard 
            title="Attendance" 
            value="92%" 
            icon={<Clock />}
            trend="Consistent last 3 months"
          />
          <StatCard 
            title="Mock Test Average" 
            value="84/100" 
            icon={<BarChartIcon />}
            trend="Rank: Top 15%"
          />
          <StatCard 
            title="Weak Areas" 
            value={weakAreas.length} 
            icon={<AlertTriangle />}
            trend="Focus needed"
            variant="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Subject-wise Performance</h3>
            <div className="h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Mock Tests" fill="#8884d8" />
                  <Bar dataKey="Assignments" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
            <div className="h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Reports and Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 hover:bg-gray-100 rounded">
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <UIBadge variant={report.status === "Released" ? "default" : "secondary"}>
                      {report.status}
                    </UIBadge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
            <div className="space-y-3">
              {weakAreas.map((area, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-red-50 rounded">
                  <span className="text-sm">{area}</span>
                  <Button variant="link" size="sm" className="text-red-600 mt-1 sm:mt-0">
                    View Resources
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, trend, variant = "default" }) => {
  const variants = {
    default: "bg-white",
    warning: "bg-orange-50 border border-orange-100",
  };

  return (
    <Card className={`p-4 ${variants[variant]} rounded-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-sm text-muted-foreground mt-2">{trend}</p>
        </div>
        <div className="p-2 bg-blue-100 rounded-full">
          {React.cloneElement(icon, { className: "w-6 h-6 text-blue-600" })}
        </div>
      </div>
    </Card>
  );
};
