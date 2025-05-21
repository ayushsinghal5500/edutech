// AdminReportsDashboard.jsx
"use client";

import {
  BarChart,
  Users,
  ClipboardList,
  BookOpenCheck,
  GraduationCap,
  LineChart,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function AdminReportsDashboard() {
  return (
    <div className="p-6 md:p-10 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold">Admin Report Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,459</div>
            <p className="text-xs text-muted-foreground">Active this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">237</div>
            <p className="text-xs text-muted-foreground">Verified and Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mock Tests Taken</CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,42,311</div>
            <p className="text-xs text-muted-foreground">Total this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notes Accessed</CardTitle>
            <BookOpenCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,92,875</div>
            <p className="text-xs text-muted-foreground">Across all users</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="flex gap-2">
          <TabsTrigger value="students">Student Report</TabsTrigger>
          <TabsTrigger value="mentors">Mentor Report</TabsTrigger>
          <TabsTrigger value="performance">Performance Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Students Activity Summary</h2>
            <div className="overflow-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Tests Taken</th>
                    <th className="p-3 text-left">Notes Read</th>
                    <th className="p-3 text-left">Progress</th>
                    <th className="p-3 text-left">Mentor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Ankit Sharma", tests: 102, notes: 87, progress: 76, mentor: "Rahul Jha" },
                    { name: "Priya Verma", tests: 89, notes: 110, progress: 82, mentor: "Sneha Roy" },
                    { name: "Ravi Gupta", tests: 65, notes: 45, progress: 54, mentor: "Rahul Jha" },
                  ].map((student, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.tests}</td>
                      <td className="p-3">{student.notes}</td>
                      <td className="p-3 w-40">
                        <Progress value={student.progress} />
                      </td>
                      <td className="p-3">{student.mentor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="mentors">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Mentor Summary</h2>
            <div className="overflow-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Mentor Name</th>
                    <th className="p-3 text-left">Students</th>
                    <th className="p-3 text-left">Sessions Held</th>
                    <th className="p-3 text-left">Avg Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Rahul Jha", students: 57, sessions: 214, feedback: "4.6/5" },
                    { name: "Sneha Roy", students: 63, sessions: 198, feedback: "4.8/5" },
                    { name: "Arjun Das", students: 40, sessions: 145, feedback: "4.5/5" },
                  ].map((mentor, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3">{mentor.name}</td>
                      <td className="p-3">{mentor.students}</td>
                      <td className="p-3">{mentor.sessions}</td>
                      <td className="p-3">{mentor.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="performance">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Priya Verma</p>
                  <p className="text-sm text-muted-foreground">Progress: 82%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Most Active Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Rahul Jha</p>
                  <p className="text-sm text-muted-foreground">214 Sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Overall Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">74% Active Users</p>
                  <Progress value={74} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
//                 <td className="border border-gray-300 px-4 py-2">{note.type}</td>
//                 <td className="border border-gray-300 px-4 py-2">{note.category}</td>