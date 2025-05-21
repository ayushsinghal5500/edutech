import { 
  Users, BookOpen, ClipboardList, Activity, ChevronRight,
  Star, AlertCircle, MessageSquare, Calendar, FileText 
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
  // Top 5 data sets
  const topStudents = [
    { name: 'Rahul Sharma', score: 94, progress: 82 },
    { name: 'Priya Patel', score: 92, progress: 78 },
    { name: 'Amit Singh', score: 91, progress: 75 },
    { name: 'Neha Gupta', score: 89, progress: 70 },
    { name: 'Vikram Joshi', score: 88, progress: 68 }
  ];

  const activeMentors = [
    { name: 'Dr. Sharma', students: 45, rating: 4.8 },
    { name: 'Prof. Patel', students: 38, rating: 4.7 },
    { name: 'Dr. Reddy', students: 32, rating: 4.6 },
    { name: 'Prof. Iyer', students: 28, rating: 4.5 },
    { name: 'Dr. Kapoor', students: 25, rating: 4.4 }
  ];

  const recentActivity = [
    { type: 'Mock Test', user: 'Rahul Sharma', time: '15 min ago' },
    { type: 'Note Viewed', user: 'Sneha Reddy', time: '32 min ago' },
    { type: 'Session', user: 'Arjun Mehta', time: '1h ago' },
    { type: 'Mock Test', user: 'Priya Patel', time: '2h ago' },
    { type: 'Note Viewed', user: 'Kunal Verma', time: '3h ago' }
  ];

  const alerts = [
    { type: 'Inactive', user: 'Rajiv Khanna', days: 9 },
    { type: 'Low Score', user: 'Meena Kapoor', score: 45 },
    { type: 'Inactive', user: 'Sanjay Malhotra', days: 12 },
    { type: 'Unsubmitted', user: 'Anjali Bhatia', test: 'Physics Mock 3' },
    { type: 'Inactive', user: 'Vivek Nair', days: 10 }
  ];

  const quickStats = [
    { title: 'Active Students', value: 876, icon: <Users className="h-5 w-5" />, trend: '↑ 12%' },
    { title: 'Avg. Score', value: '72%', icon: <ClipboardList className="h-5 w-5" />, trend: '↑ 3%' },
    { title: 'Sessions', value: 245, icon: <Activity className="h-5 w-5" />, trend: '↑ 8%' },
    { title: 'Notes Viewed', value: 1243, icon: <BookOpen className="h-5 w-5" />, trend: '↑ 15%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Key metrics and recent activity</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-green-600">{stat.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content - Top 5 Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Students */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Top Students</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {topStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <Progress value={student.progress} className="h-2 w-32" />
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {student.score}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Mentors */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Active Mentors</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeMentors.map((mentor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mentor.name}</p>
                    <p className="text-sm text-gray-500">{mentor.students} students</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1">{mentor.rating}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1 p-1 rounded-full bg-blue-50">
                  {activity.type === 'Mock Test' ? (
                    <ClipboardList className="h-4 w-4 text-blue-600" />
                  ) : activity.type === 'Note Viewed' ? (
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Activity className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-500">
                    {activity.type} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Alerts</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1 p-1 rounded-full bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">{alert.user}</p>
                  <p className="text-sm text-gray-500">
                    {alert.type === 'Inactive' 
                      ? `${alert.days} days inactive`
                      : alert.type === 'Low Score'
                      ? `Low score: ${alert.score}%`
                      : `Unsubmitted: ${alert.test}`}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" /> Add Student
              </Button>
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" /> Add Mentor
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" /> Schedule Session
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" /> Upload Content
              </Button>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" /> Send Announcement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}