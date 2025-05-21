"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Eye, Edit, Trash2, Plus, File, Filter, Download, BarChart
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ManageNotes() {
  const [open, setOpen] = useState(false);

  const notes = [
    {
      id: 1,
      title: "Organic Chemistry Basics",
      type: "PDF",
      category: "Chemistry",
      uploadDate: "2025-04-20",
      fileSize: "2.4 MB",
      downloads: 245,
      views: 890,
    },
    {
      id: 2,
      title: "Trigonometry Formulas",
      type: "DOCX",
      category: "Mathematics",
      uploadDate: "2025-05-05",
      fileSize: "1.8 MB",
      downloads: 178,
      views: 642,
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-7xl mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Manage Notes</h1>

        {/* Upload Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Upload New Notes
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload New Notes</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle upload logic here
                setOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="title" className="mb-3">Title</Label>
                <Input id="title" placeholder="Enter note title" required />
              </div>
              <div>
                <Label htmlFor="type" className="mb-3">Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOCX">DOCX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category" className="mb-3">Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bio">Bio</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file" className={"mb-3"}>Upload File</Label>
                <Input id="file" type="file" required />
              </div>
              <DialogFooter>
                <Button type="submit">Upload</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters Section */}
      <div className="w-full max-w-7xl mb-4 flex gap-4">
        <Input placeholder="Search notes..." className="max-w-xs" />
        <Select>
          <SelectTrigger className="w-32">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="docx">DOCX</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes Table */}
      <div className="w-full max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left w-12">S.No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                <Download className="inline w-4 h-4 mr-1" />
                Downloads
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                <BarChart className="inline w-4 h-4 mr-1" />
                Views
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Upload Date</th>
              <th className="border border-gray-300 px-4 py-2 text-right">File Size</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <motion.tr
                key={note.id}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                className="cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 font-medium">{note.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-blue-600" />
                    {note.type}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">{note.category}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{note.downloads}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{note.views}</td>
                <td className="border border-gray-300 px-4 py-2">{note.uploadDate}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{note.fileSize}</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <Button variant="ghost" size="sm" aria-label="View note">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Edit note">
                    <Edit className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Delete note">
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
