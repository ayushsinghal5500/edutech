"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const mockTests = [
  { id: 1, title: "JEE Main 2024 - Physics", subject: "Physics", date: "2024-03-15", duration: 180, questions: 75, attempted: false },
  { id: 2, title: "NEET 2024 - Biology", subject: "Biology", date: "2024-04-02", duration: 210, questions: 180, attempted: true },
  { id: 3, title: "JEE Advanced 2023", subject: "Composite", date: "2023-06-18", duration: 240, questions: 90, attempted: false },
  { id: 4, title: "Class 12 Board - Chemistry", subject: "Chemistry", date: "2024-02-28", duration: 150, questions: 60, attempted: true },
  { id: 5, title: "NEET 2024 - Physics", subject: "Physics", date: "2024-05-01", duration: 180, questions: 75, attempted: false },
];

export default function StartPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortAscending, setSortAscending] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const categories = ['All', 'Recent', 'Upcoming', 'Physics', 'Chemistry', 'Biology', 'Mathematics'];

  const filteredTests = mockTests
    .filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const testDate = new Date(test.date);
      const currentDate = new Date();
      
      const matchesCategory = selectedCategory === 'All' ? true : 
                            selectedCategory === 'Recent' ? 
                            testDate > new Date(currentDate - 7 * 24 * 60 * 60 * 1000) :
                            selectedCategory === 'Upcoming' ? 
                            testDate > currentDate :
                            test.subject === selectedCategory;

      const matchesDateRange = (!dateRange.start || testDate >= new Date(dateRange.start)) &&
                             (!dateRange.end || testDate <= new Date(`${dateRange.end}T23:59:59`));

      return matchesSearch && matchesCategory && matchesDateRange;
    })
    .sort((a, b) => {
      const modifier = sortAscending ? 1 : -1;
      if (sortBy === 'date') return (new Date(b.date) - new Date(a.date)) * modifier;
      if (sortBy === 'name') return a.title.localeCompare(b.title) * modifier;
      return (a.duration - b.duration) * modifier;
    });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('date');
    setSortAscending(false);
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mock Tests</h1>
        
        {/* Enhanced Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 space-y-6">
          {/* Search and Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search tests..."
                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 pr-10 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Date Range Picker */}
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border-2 border-gray-200">
              <div className="flex items-center flex-1 gap-2">
                <input
                  type="date"
                  className="w-full p-2 bg-transparent focus:outline-none text-sm"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
                <span className="text-gray-400 text-sm">to</span>
                <input
                  type="date"
                  className="w-full p-2 bg-transparent focus:outline-none text-sm"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
              <button 
                onClick={() => setDateRange({ start: '', end: '' })}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border-2 border-gray-200">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 bg-transparent p-2 text-sm focus:outline-none"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="duration">Sort by Duration</option>
              </select>
              <button 
                onClick={() => setSortAscending(!sortAscending)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {sortAscending ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:border-blue-200'
                }`}
              >
                <span>{category}</span>
                {category === 'Recent' && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">New</span>
                )}
                {category === 'Upcoming' && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Soon</span>
                )}
              </button>
            ))}
            <button
              onClick={resetFilters}
              className="ml-auto px-4 py-2 text-red-500 hover:bg-red-50 rounded-full flex items-center gap-2 border-2 border-red-100 transition-colors"
            >
              Reset All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Test Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTests.map(test => (
            <motion.div
              key={test.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    test.attempted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {test.attempted ? 'Attempted' : 'New'}
                  </span>
                  <span className="text-sm text-gray-500">{test.subject}</span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">{test.title}</h3>
                
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(test.date).toLocaleDateString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Duration:</span>
                    <span>{test.duration} mins</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Questions:</span>
                    <span>{test.questions}</span>
                  </p>
                </div>

                <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                  <Link href={`/student/mock/start/`}>
                    {test.attempted ? 'Retake Test' : 'Start Test'}
                  </Link>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No tests found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}