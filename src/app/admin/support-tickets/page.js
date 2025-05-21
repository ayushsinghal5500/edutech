"use client";
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

// Simple Modal component (you can replace with your UI modal)
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Support() {
  const [tickets, setTickets] = useState([
    {
      id: "TCKT001",
      subject: "Login issue",
      priority: "High",
      status: "Open",
      createdAt: "2025-05-15",
      userName: "John Doe",
      email: "john@example.com"
    },
    {
      id: "TCKT002",
      subject: "Payment failed",
      priority: "Medium",
      status: "In Progress",
      createdAt: "2025-05-16",
      userName: "Jane Smith",
      email: "jane@example.com"
    },
    {
      id: "TCKT003",
      subject: "Bug in checkout",
      priority: "Low",
      status: "Closed",
      createdAt: "2025-05-17",
      userName: "Alice Johnson",
      email: "alice@example.com"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'Medium',
    assignedTo: '',
    userName: '',
    email: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { subject, assignedTo, userName, email } = newTicket;

    if (!subject || !assignedTo || !userName || !email) {
      alert('Please fill subject, assigned user, user name, and email');
      return;
    }

    const createdTime = 'Just now'; // For demo, you can add real timestamps here

    const newEntry = {
      id: `TCKT${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      userName: newTicket.userName,
      email: newTicket.email,
      assignedTo: newTicket.assignedTo,
      status: 'Open',
      priority: newTicket.priority,
      createdAt: createdTime,
    };

    setTickets((prev) => [newEntry, ...prev]);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'Medium',
      assignedTo: '',
      userName: '',
      email: ''
    });
    setIsModalOpen(false);
  }

// Search state
const [search, setSearch] = useState('');

// Filter tickets based on search
const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
    ticket.userName.toLowerCase().includes(search.toLowerCase()) ||
    ticket.email.toLowerCase().includes(search.toLowerCase()) ||
    ticket.id.toLowerCase().includes(search.toLowerCase())
);

return (
    <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Support Tickets</h1>
                <p className="text-gray-600">Manage and respond to support tickets from users.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>+ Create New Ticket</Button>
        </header>

        <Card>
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Open Tickets</CardTitle>
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full sm:w-64"
                />
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Ticket ID</th>
                                <th className="border border-gray-300 px-4 py-2">Subject</th>
                                <th className="border border-gray-300 px-4 py-2">User Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Priority</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Created At</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{ticket.id}</td>
                                    <td className="border border-gray-300 px-4 py-2 font-medium">{ticket.subject}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ticket.userName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ticket.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{ticket.priority}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Badge
                                            variant={ticket.status === 'Closed' ? 'outline' : 'secondary'}
                                            className={`${
                                                ticket.status === 'Open'
                                                    ? 'bg-red-100 text-red-700'
                                                    : ticket.status === 'In Progress'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-green-100 text-green-700'
                                            }`}
                                        >
                                            {ticket.status}
                                        </Badge>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{ticket.createdAt}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                            View <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredTickets.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500">
                                        No tickets found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        {/* Modal for New Ticket */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block font-medium mb-1">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={newTicket.subject}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={newTicket.description}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="block font-medium mb-1">
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={newTicket.priority}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="assignedTo" className="block font-medium mb-1">
                        Assign To (User) <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="assignedTo"
                        name="assignedTo"
                        type="text"
                        value={newTicket.assignedTo}
                        onChange={handleInputChange}
                        placeholder="Team member name or username"
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">Create Ticket</Button>
                </div>
            </form>
        </Modal>
    </div>
);
}
