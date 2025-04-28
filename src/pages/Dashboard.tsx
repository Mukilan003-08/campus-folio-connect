
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, BookOpen, FileText, Users, UserPlus, Award } from 'lucide-react';

const SuperAdminDashboard = () => {
  const stats = [
    { title: 'Total Admins', value: '12', icon: <UserPlus className="h-8 w-8 text-blue-500" /> },
    { title: 'Total Students', value: '1,234', icon: <Users className="h-8 w-8 text-green-500" /> },
    { title: 'Departments', value: '8', icon: <BookOpen className="h-8 w-8 text-purple-500" /> },
    { title: 'Total Portfolios', value: '986', icon: <FileText className="h-8 w-8 text-orange-500" /> },
  ];

  const chartData = [
    { name: 'Computer Science', students: 350, portfolios: 320 },
    { name: 'Engineering', students: 275, portfolios: 230 },
    { name: 'Business', students: 310, portfolios: 260 },
    { name: 'Arts', students: 190, portfolios: 150 },
    { name: 'Medicine', students: 109, portfolios: 80 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
        <p className="text-muted-foreground">College-wide portfolio system overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Students and portfolios by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#0ea5e9" name="Students" />
                  <Bar dataKey="portfolios" fill="#8b5cf6" name="Portfolios" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New admin added to Engineering dept", time: "2 hours ago", icon: <UserPlus className="h-4 w-4" /> },
                { action: "Portfolio approval request from J. Smith", time: "3 hours ago", icon: <FileText className="h-4 w-4" /> },
                { action: "Department settings updated for CS", time: "5 hours ago", icon: <BookOpen className="h-4 w-4" /> },
                { action: "New student batch imported (45 students)", time: "Yesterday", icon: <Users className="h-4 w-4" /> },
                { action: "System backup completed", time: "Yesterday", icon: <Activity className="h-4 w-4" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-muted p-2 rounded mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const department = user?.department || 'Unknown Department';
  
  const stats = [
    { title: 'Department Students', value: '320', icon: <Users className="h-8 w-8 text-blue-500" /> },
    { title: 'Active Portfolios', value: '275', icon: <FileText className="h-8 w-8 text-green-500" /> },
    { title: 'Pending Reviews', value: '18', icon: <Activity className="h-8 w-8 text-amber-500" /> },
    { title: 'Recent Achievements', value: '42', icon: <Award className="h-8 w-8 text-purple-500" /> },
  ];

  const chartData = [
    { name: 'Year 1', students: 85, portfolios: 60, complete: 40 },
    { name: 'Year 2', students: 75, portfolios: 65, complete: 50 },
    { name: 'Year 3', students: 90, portfolios: 85, complete: 70 },
    { name: 'Year 4', students: 70, portfolios: 65, complete: 60 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{department} Dashboard</h2>
        <p className="text-muted-foreground">Department portfolio system overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Student Statistics</CardTitle>
            <CardDescription>By academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#0ea5e9" name="Students" />
                  <Bar dataKey="portfolios" fill="#8b5cf6" name="Portfolios" />
                  <Bar dataKey="complete" fill="#10b981" name="Complete" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Portfolio Activity</CardTitle>
            <CardDescription>Latest updates from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { student: "Emily Wang", action: "Updated project details", time: "2 hours ago", icon: <FileText className="h-4 w-4" /> },
                { student: "Jason Rodriguez", action: "Added new certificate", time: "5 hours ago", icon: <Award className="h-4 w-4" /> },
                { student: "Sarah Johnson", action: "Submitted portfolio for review", time: "Yesterday", icon: <Activity className="h-4 w-4" /> },
                { student: "Michael Brown", action: "Updated skills section", time: "2 days ago", icon: <FileText className="h-4 w-4" /> },
                { student: "Sophia Chen", action: "Added internship experience", time: "2 days ago", icon: <BookOpen className="h-4 w-4" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-muted p-2 rounded mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.student}</p>
                    <p className="text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const stats = [
    { title: 'Portfolio Completion', value: '75%', icon: <FileText className="h-8 w-8 text-blue-500" /> },
    { title: 'Projects Added', value: '8', icon: <BookOpen className="h-8 w-8 text-green-500" /> },
    { title: 'Achievements', value: '5', icon: <Award className="h-8 w-8 text-amber-500" /> },
    { title: 'Skills Listed', value: '12', icon: <Activity className="h-8 w-8 text-purple-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h2>
        <p className="text-muted-foreground">Track and manage your academic portfolio</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Portfolio Checklist</CardTitle>
            <CardDescription>Track your portfolio completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { item: "Basic Information", status: "complete" },
                { item: "Education Details", status: "complete" },
                { item: "Projects", status: "complete" },
                { item: "Skills", status: "complete" },
                { item: "Achievements", status: "in-progress" },
                { item: "Work Experience", status: "in-progress" },
                { item: "Recommendations", status: "not-started" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    item.status === 'complete' ? 'bg-green-500' :
                    item.status === 'in-progress' ? 'bg-amber-400' :
                    'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p>{item.item}</p>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'complete' ? 'bg-green-100 text-green-800' :
                      item.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status === 'complete' ? 'Complete' :
                       item.status === 'in-progress' ? 'In Progress' :
                       'Not Started'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Updates on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Added project 'Machine Learning App'", time: "2 days ago", icon: <BookOpen className="h-4 w-4" /> },
                { action: "Updated skills section", time: "4 days ago", icon: <FileText className="h-4 w-4" /> },
                { action: "Added certificate in Web Development", time: "1 week ago", icon: <Award className="h-4 w-4" /> },
                { action: "Created portfolio", time: "2 weeks ago", icon: <FileText className="h-4 w-4" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-muted p-2 rounded mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { isSuperAdmin, isAdmin, isStudent } = useAuth();
  
  return (
    <DashboardLayout>
      {isSuperAdmin && <SuperAdminDashboard />}
      {isAdmin && <AdminDashboard />}
      {isStudent && <StudentDashboard />}
    </DashboardLayout>
  )
};

export default Dashboard;
