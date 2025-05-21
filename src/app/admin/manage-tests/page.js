"use client";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ManageTests() {
  const tests = [
    {
      id: 1,
      name: "Mock Test 1",
      type: "JEE",
      attempts: 120,
      views: 450,
      publishDate: "2025-04-20",
      avgScore: 78,
    },
    {
      id: 2,
      name: "Mock Test 2",
      type: "NEET",
      attempts: 95,
      views: 320,
      publishDate: "2025-05-05",
      avgScore: 82,
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Manage Tests</h1>

      <div className="w-full max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Test Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Attempts</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Views</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Publish Date</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Average Score</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <motion.tr
                key={test.id}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                className="cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">{test.name}</td>
                <td className="border border-gray-300 px-4 py-2">{test.type}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{test.attempts}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{test.views}</td>
                <td className="border border-gray-300 px-4 py-2">{test.publishDate}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{test.avgScore}%</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <Link href={`/tests/view/${test.id}`} passHref legacyBehavior>
                    <Button as="a" variant="ghost" size="sm" aria-label="View test">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </Button>
                  </Link>
                  <Link href={`/tests/update/${test.id}`} passHref legacyBehavior>
                    <Button as="a" variant="ghost" size="sm" aria-label="Update test">
                      <Edit className="w-4 h-4 text-green-600" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" aria-label="Delete test">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
