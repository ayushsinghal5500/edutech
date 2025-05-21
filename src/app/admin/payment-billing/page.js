import { CreditCard, DollarSign, Users, Wallet, BadgePercent, 
  FileText, Download, Filter, Search, Plus, ArrowUpDown, Calendar} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from '@/components/ui/card';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button'
  import { Badge} from  '@/components/ui/badge';
import {Input }from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Ensure Progress is correctly imported; if it's a default export, use:
import {Progress} from '@/components/ui/progress';
// If it's a named export, keep as is, but make sure the export exists in the file.

export default function PaymentSystem() {
  // Student Plans Data
  const studentPlans = [
    { id: 'STU-001', name: 'Rahul Sharma', plan: 'Premium', amount: 2499, status: 'Active', expiry: '2023-12-15' },
    { id: 'STU-002', name: 'Priya Patel', plan: 'Basic', amount: 1499, status: 'Active', expiry: '2023-11-30' },
    { id: 'STU-003', name: 'Amit Singh', plan: 'Premium', amount: 2499, status: 'Expired', expiry: '2023-10-25' },
    { id: 'STU-004', name: 'Neha Gupta', plan: 'Pro', amount: 3499, status: 'Active', expiry: '2024-01-10' },
  ];

  // Mentor Payouts Data
  const mentorPayouts = [
    { id: 'MEN-001', name: 'Dr. Sharma', students: 12, amount: 24000, status: 'Pending', badge: 'Gold' },
    { id: 'MEN-002', name: 'Prof. Patel', students: 8, amount: 16000, status: 'Paid', badge: 'Silver' },
    { id: 'MEN-003', name: 'Dr. Reddy', students: 5, amount: 10000, status: 'Pending', badge: 'Bronze' },
  ];

  // Badge Rewards System
  const badgeRewards = [
    { name: 'Gold', threshold: 10, reward: 5000, studentsRequired: 10 },
    { name: 'Silver', threshold: 5, reward: 2000, studentsRequired: 5 },
    { name: 'Bronze', threshold: 1, reward: 500, studentsRequired: 1 },
  ];

  // Admin Financial Summary
  const financialSummary = {
    totalCollected: 89400,
    totalPayouts: 40000,
    platformEarnings: 49400,
    pendingPayouts: 34000,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment & Salary System</h1>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Student Plans</TabsTrigger>
          <TabsTrigger value="mentors">Mentor Salaries</TabsTrigger>
          <TabsTrigger value="badges">Badge Rewards</TabsTrigger>
          <TabsTrigger value="finance">Admin Finance</TabsTrigger>
        </TabsList>

        {/* Student Plans Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Active Plans" 
              value="32" 
              icon={<FileText className="h-5 w-5" />} 
              description="Currently active subscriptions"
            />
            <StatCard 
              title="Monthly Revenue" 
              value="₹84,500" 
              icon={<DollarSign className="h-5 w-5" />} 
              description="From student plans"
            />
            <StatCard 
              title="Renewals Due" 
              value="8" 
              icon={<Calendar className="h-5 w-5" />} 
              description="In next 7 days"
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Subscription Plans</CardTitle>
                  <CardDescription>All active and expired student plans</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Plan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.id}</TableCell>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>{plan.plan}</TableCell>
                      <TableCell>₹{plan.amount}</TableCell>
                      <TableCell>{plan.expiry}</TableCell>
                      <TableCell>
                        <Badge variant={plan.status === 'Active' ? 'default' : 'destructive'}>
                          {plan.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mentor Salaries Tab */}
        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Total Mentors" 
              value="15" 
              icon={<Users className="h-5 w-5" />} 
              description="Registered mentors"
            />
            <StatCard 
              title="Pending Payouts" 
              value="₹34,000" 
              icon={<DollarSign className="h-5 w-5" />} 
              description="To be processed"
            />
            <StatCard 
              title="Avg. Salary" 
              value="₹18,500" 
              icon={<Wallet className="h-5 w-5" />} 
              description="Per mentor monthly"
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mentor Salary Payouts</CardTitle>
                  <CardDescription>Salary calculations based on student allocations</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <DollarSign className="h-4 w-4" /> Process Payouts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mentor ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentorPayouts.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell className="font-medium">{mentor.id}</TableCell>
                      <TableCell>{mentor.name}</TableCell>
                      <TableCell>{mentor.students}</TableCell>
                      <TableCell>
                        <Badge variant={
                          mentor.badge === 'Gold' ? 'default' : 
                          mentor.badge === 'Silver' ? 'secondary' : 'outline'
                        }>
                          {mentor.badge}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{mentor.amount}</TableCell>
                      <TableCell>
                        <Badge variant={mentor.status === 'Paid' ? 'default' : 'secondary'}>
                          {mentor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {mentor.status === 'Pending' && (
                          <Button variant="outline" size="sm">Pay Now</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Badge Rewards Tab */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Badge Reward System</CardTitle>
              <CardDescription>
                Incentivize mentors based on student count and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {badgeRewards.map((badge) => (
                  <Card key={badge.name}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BadgePercent className="h-5 w-5" />
                        {badge.name} Badge
                      </CardTitle>
                      <Badge variant={
                        badge.name === 'Gold' ? 'default' : 
                        badge.name === 'Silver' ? 'secondary' : 'outline'
                      }>
                        {badge.name}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Students Required: {badge.studentsRequired}+</p>
                        <p>Reward Amount: ₹{badge.reward}</p>
                        <Progress 
                          value={(badge.studentsRequired / 10) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Configure Rewards
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Finance Tab */}
        <TabsContent value="finance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Total Collected" 
              value={`₹${financialSummary.totalCollected.toLocaleString()}`} 
              icon={<DollarSign className="h-5 w-5" />} 
              description="From all students"
            />
            <StatCard 
              title="Total Payouts" 
              value={`₹${financialSummary.totalPayouts.toLocaleString()}`} 
              icon={<Wallet className="h-5 w-5" />} 
              description="To mentors"
            />
            <StatCard 
              title="Platform Earnings" 
              value={`₹${financialSummary.platformEarnings.toLocaleString()}`} 
              icon={<DollarSign className="h-5 w-5" />} 
              description="Net revenue"
            />
            <StatCard 
              title="Pending Payouts" 
              value={`₹${financialSummary.pendingPayouts.toLocaleString()}`} 
              icon={<Wallet className="h-5 w-5" />} 
              description="To be processed"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Last 6 months overview</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for financial chart */}
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Monthly financial chart visualization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, icon, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}