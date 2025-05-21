'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash } from 'lucide-react';

export default function AdminFeesPage() {
  const [plans, setPlans] = useState([
    {
      id: 101,
      name: '2-Year JEE Package',
      amount: 45000,
      description: 'Includes full syllabus mock tests, mentor support, and detailed performance analytics.',
      offer: '10% off for early birds',
      benefits: ['Mentor support', 'Weekly mock tests', 'Detailed reports'],
      feesModel: 'One-time payment',
    },
    {
      id: 102,
      name: '1-Year NEET Combo',
      amount: 38000,
      description: 'Includes biology-focused tests, notes access, and personal mentor sessions.',
      offer: 'Free notes access',
      benefits: ['Biology focused tests', 'Personal mentor sessions'],
      feesModel: 'Installments allowed',
    },
    {
      id: 103,
      name: 'Crash Course - Last 3 Months',
      amount: 18000,
      description: 'Fast revision tests and priority doubt-solving support.',
      offer: '',
      benefits: ['Fast revision', 'Priority doubt support'],
      feesModel: 'One-time payment',
    },
  ]);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [offer, setOffer] = useState('');
  const [benefits, setBenefits] = useState(''); // comma separated string for easy input
  const [feesModel, setFeesModel] = useState('One-time payment');
  const [editingId, setEditingId] = useState(null);

  function resetForm() {
    setName('');
    setAmount('');
    setDescription('');
    setOffer('');
    setBenefits('');
    setFeesModel('One-time payment');
    setEditingId(null);
  }

  function handleSave() {
    if (!name.trim() || !amount) return;

    const benefitsArr = benefits
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    if (editingId) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name, amount: Number(amount), description, offer, benefits: benefitsArr, feesModel }
            : p
        )
      );
    } else {
      setPlans((prev) => [
        ...prev,
        {
          id: Date.now(),
          name,
          amount: Number(amount),
          description,
          offer,
          benefits: benefitsArr,
          feesModel,
        },
      ]);
    }

    resetForm();
  }

  function handleEdit(plan) {
    setEditingId(plan.id);
    setName(plan.name);
    setAmount(String(plan.amount));
    setDescription(plan.description);
    setOffer(plan.offer || '');
    setBenefits(plan.benefits ? plan.benefits.join(', ') : '');
    setFeesModel(plan.feesModel || 'One-time payment');
  }

  function handleDelete(id) {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-6 max-w-5xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Fee Plan Management</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{editingId ? 'Update Fee Plan' : 'Create New Fee Plan'}</h3>

            <div>
              <label className="block mb-1 text-sm font-medium">Plan Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 1-Year NEET Combo"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Amount (₹)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="45000"
                min="0"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What’s included in this plan…"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Offer</label>
              <Input
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 10% off for early birds"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Benefits (comma separated)</label>
              <Input
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Mentor support, Weekly mock tests, Detailed reports"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Fees Model</label>
              <select
                value={feesModel}
                onChange={(e) => setFeesModel(e.target.value)}
                className="w-full rounded border px-3 py-2"
              >
                <option>One-time payment</option>
                <option>Installments allowed</option>
                <option>Monthly subscription</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave}>{editingId ? 'Update Plan' : 'Add Plan'}</Button>
              {editingId && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Existing Plans</h3>

            {plans.length === 0 && (
              <p className="text-muted-foreground text-sm">No fee plans yet. Start by adding one above.</p>
            )}

            {plans.map((plan) => (
              <Card key={plan.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">₹{plan.amount.toLocaleString()}</p>
                  {plan.description && <p className="text-sm mt-1 line-clamp-2 break-words">{plan.description}</p>}
                  {plan.offer && <p className="text-sm text-green-600 mt-1 italic">Offer: {plan.offer}</p>}
                  {plan.benefits && plan.benefits.length > 0 && (
                    <ul className="text-sm list-disc list-inside mt-1">
                      {plan.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {plan.feesModel && <p className="text-sm mt-1 font-semibold">Fees Model: {plan.feesModel}</p>}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(plan.id)}>
                    <Trash size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
