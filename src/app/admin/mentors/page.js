"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialMentors = [
  {
    id: 1,
    name: "Dr. Kavita Rao",
    expertise: "Physics",
    bio: "15+ years mentoring JEE students. Ex‑IIT Bombay.",
    active: true,
    lastLogin: "2025-05-10T14:30:00Z",
    picture: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    expertise: "Mathematics",
    bio: "Author of best‑selling calculus guide. 10 years teaching NEET/JEE.",
    active: false,
    lastLogin: "2025-04-28T09:15:00Z",
    picture: "https://i.pravatar.cc/40?img=2",
  },
];

export default function MentorManagementPage() {
  const [mentors, setMentors] = useState(initialMentors);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);

  const filtered = mentors.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase()) ||
    m.expertise.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSave = (mentor) => {
    if (mentor.id) {
      setMentors((prev) =>
        prev.map((m) => (m.id === mentor.id ? { ...m, ...mentor } : m))
      );
    } else {
      mentor.id = Date.now();
      mentor.active = true;
      mentor.lastLogin = new Date().toISOString();
      mentor.picture = `https://i.pravatar.cc/40?u=${mentor.name}`;
      setMentors((prev) => [...prev, mentor]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this mentor?")) {
      setMentors((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const toggleActive = (id) => {
    setMentors((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m
      )
    );
  };

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-2xl font-semibold">
            Mentor Management
          </CardTitle>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
              <Input
                placeholder="Search mentors..."
                className="pl-9"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                setEditingMentor(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Mentor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">S.No</th>
                <th className="py-2">Picture</th>
                <th className="py-2">Name</th>
                <th className="py-2">Expertise</th>
                <th className="py-2">Bio</th>
                <th className="py-2">Active</th>
                <th className="py-2">Last Login</th>
                <th className="py-2 text-center">Block/Unblock</th>
                <th className="py-2 text-center">View Profile</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, index) => (
                <motion.tr
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="border-b last:border-0"
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    <img
                      src={m.picture || "https://i.pravatar.cc/40"}
                      alt={m.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 font-medium">{m.name}</td>
                  <td className="py-2">{m.expertise}</td>
                  <td className="py-2 max-w-xs truncate" title={m.bio}>
                    {m.bio}
                  </td>
                  <td className="py-2 text-center">
                    {m.active ? (
                      <UserCheck className="inline-block h-5 w-5 text-green-600" />
                    ) : (
                      <UserX className="inline-block h-5 w-5 text-red-600" />
                    )}
                  </td>
                  <td className="py-2 text-center">
                    {new Date(m.lastLogin).toLocaleString()}
                  </td>
                  <td className="py-2 text-center">
                    <Button
                      size="sm"
                      variant={m.active ? "destructive" : "default"}
                      onClick={() => toggleActive(m.id)}
                    >
                      {m.active ? "Block" : "Unblock"}
                    </Button>
                  </td>
                  <td className="py-2 text-center">
                    <Link
                      href={`#profile-${m.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </Link>
                  </td>
                  <td className="py-2 flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingMentor(m);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(m.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-4 text-center text-muted-foreground"
                  >
                    No mentors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingMentor ? "Edit Mentor" : "Add Mentor"}</DialogTitle>
          </DialogHeader>
          <MentorForm
            defaultValues={editingMentor}
            onCancel={() => setOpen(false)}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function MentorForm({ defaultValues, onCancel, onSave }) {
  const [form, setForm] = useState(
    defaultValues || { name: "", expertise: "", bio: "" }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.expertise) return;
    onSave({ ...form, id: defaultValues?.id, active: defaultValues?.active, lastLogin: defaultValues?.lastLogin, picture: defaultValues?.picture });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expertise">Expertise</Label>
        <Input
          id="expertise"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
