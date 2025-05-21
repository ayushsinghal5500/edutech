'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash } from 'lucide-react';

export default function AdminNewTestPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);

  const inputTypes = ['text', 'textarea', 'radio', 'checkbox'];

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        sectionName: '',
        questions: [],
      },
    ]);
  };

  const removeSection = (sectionIndex) => {
    const updated = [...sections];
    updated.splice(sectionIndex, 1);
    setSections(updated);
  };

  const updateSectionName = (index, value) => {
    const updated = [...sections];
    updated[index].sectionName = value;
    setSections(updated);
  };

  const addQuestion = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].questions.push({
      id: Date.now(),
      question: '',
      type: 'text',
      options: [''],
    });
    setSections(updated);
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].questions.splice(questionIndex, 1);
    setSections(updated);
  };

  const updateQuestionField = (sectionIndex, questionIndex, key, value) => {
    const updated = [...sections];
    updated[sectionIndex].questions[questionIndex][key] = value;
    setSections(updated);
  };

  const updateOption = (sectionIndex, questionIndex, optIndex, value) => {
    const updated = [...sections];
    updated[sectionIndex].questions[questionIndex].options[optIndex] = value;
    setSections(updated);
  };

  const addOption = (sectionIndex, questionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].questions[questionIndex].options.push('');
    setSections(updated);
  };

  const handleCreateTest = () => {
    const payload = {
      title,
      description,
      sections,
    };
    console.log(payload);
    // 🔗 API call to save test
  };

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create New Test with Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title & Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Test Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. NEET Grand Test" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief overview of the test" />
          </div>

          {/* Sections */}
          {sections.map((section, sectionIndex) => (
            <Card key={section.id} className="border shadow-md p-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <Input
                  className="flex-grow"
                  value={section.sectionName}
                  onChange={(e) => updateSectionName(sectionIndex, e.target.value)}
                  placeholder={`Section ${sectionIndex + 1} Name (e.g. Physics)`}
                />
                <Button variant="ghost" onClick={() => removeSection(sectionIndex)} className="text-red-500">
                  <Trash size={18} />
                </Button>
              </div>

              {/* Questions in this section */}
              {section.questions.map((q, questionIndex) => (
                <Card key={q.id} className="p-4 space-y-3 bg-muted/20">
                  <div className="flex flex-col gap-2">
                    <Input
                      value={q.question}
                      onChange={(e) => updateQuestionField(sectionIndex, questionIndex, 'question', e.target.value)}
                      placeholder={`Question ${questionIndex + 1}`}
                    />
                    <select
                      value={q.type}
                      onChange={(e) => updateQuestionField(sectionIndex, questionIndex, 'type', e.target.value)}
                      className="p-2 border rounded text-sm"
                    >
                      {inputTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.toUpperCase()}
                        </option>
                      ))}
                    </select>

                    {(q.type === 'radio' || q.type === 'checkbox') && (
                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => (
                          <Input
                            key={optIndex}
                            placeholder={`Option ${optIndex + 1}`}
                            value={opt}
                            onChange={(e) =>
                              updateOption(sectionIndex, questionIndex, optIndex, e.target.value)
                            }
                          />
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addOption(sectionIndex, questionIndex)}>
                          Add Option
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(sectionIndex, questionIndex)}
                    className="text-red-500"
                  >
                    <Trash size={16} className="mr-1" />
                    Remove Question
                  </Button>
                </Card>
              ))}

              <Button
                onClick={() => addQuestion(sectionIndex)}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Question
              </Button>
            </Card>
          ))}

          {/* Add Section */}
          <Button onClick={addSection} variant="outline" className="flex items-center gap-2">
            <Plus size={16} />
            Add Section
          </Button>

          {/* Final Submit */}
          <Button onClick={handleCreateTest} className="w-full mt-4">
            Create Full Test ({sections.length} Sections)
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
