
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  FileText, 
  Edit, 
  Trash2 
} from 'lucide-react';

// Mock student data
const initialStudents = [
  { 
    id: '1',
    name: 'John Smith',
    email: 'john@college.edu',
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: '3rd',
    portfolioStatus: 'Complete'
  },
  { 
    id: '2',
    name: 'Emily Johnson',
    email: 'emily@college.edu',
    studentId: 'CS2021002',
    department: 'Computer Science',
    year: '3rd',
    portfolioStatus: 'In Progress'
  },
  { 
    id: '3',
    name: 'Michael Brown',
    email: 'michael@college.edu',
    studentId: 'CS2020015',
    department: 'Computer Science',
    year: '4th',
    portfolioStatus: 'Complete'
  },
  { 
    id: '4',
    name: 'Sophia Chen',
    email: 'sophia@college.edu',
    studentId: 'CS2022030',
    department: 'Computer Science',
    year: '2nd',
    portfolioStatus: 'Not Started'
  },
  { 
    id: '5',
    name: 'James Wilson',
    email: 'james@college.edu',
    studentId: 'CS2020022',
    department: 'Computer Science',
    year: '4th',
    portfolioStatus: 'Complete'
  },
];

const Students = () => {
  const { user, isSuperAdmin } = useAuth();
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    studentId: '',
    department: user?.department || 'Computer Science',
    year: '',
    password: ''
  });

  // Filter students by search term
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Filter students by department for admins
  const departmentFilteredStudents = isSuperAdmin 
    ? filteredStudents 
    : filteredStudents.filter(student => student.department === user?.department);

  const handleAddStudent = () => {
    // In a real app, this would call an API
    const id = (students.length + 1).toString();
    setStudents([...students, {
      id,
      name: newStudent.name,
      email: newStudent.email,
      studentId: newStudent.studentId,
      department: newStudent.department,
      year: newStudent.year,
      portfolioStatus: 'Not Started'
    }]);
    
    setNewStudent({
      name: '',
      email: '',
      studentId: '',
      department: user?.department || 'Computer Science',
      year: '',
      password: ''
    });
    
    setIsAddDialogOpen(false);
    toast.success('Student added successfully');
  };

  const handleEditStudent = () => {
    // In a real app, this would call an API
    if (!currentStudent) return;
    
    const updatedStudents = students.map(student => 
      student.id === currentStudent.id ? currentStudent : student
    );
    
    setStudents(updatedStudents);
    setIsEditDialogOpen(false);
    toast.success('Student updated successfully');
  };

  const handleDeleteStudent = () => {
    // In a real app, this would call an API
    if (!currentStudent) return;
    
    const updatedStudents = students.filter(student => student.id !== currentStudent.id);
    setStudents(updatedStudents);
    setIsDeleteDialogOpen(false);
    toast.success('Student deleted successfully');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Complete':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Complete</span>;
      case 'In Progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In Progress</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Not Started</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Students</h2>
            <p className="text-muted-foreground">Manage student accounts and portfolios</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Create a new student account</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="studentId" className="text-right">Student ID</Label>
                  <Input
                    id="studentId"
                    className="col-span-3"
                    value={newStudent.studentId}
                    onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">Department</Label>
                  <Input
                    id="department"
                    className="col-span-3"
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                    disabled={!isSuperAdmin}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">Year</Label>
                  <Input
                    id="year"
                    className="col-span-3"
                    value={newStudent.year}
                    onChange={(e) => setNewStudent({...newStudent, year: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddStudent}>Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Email</TableHead>
                  {isSuperAdmin && <TableHead>Department</TableHead>}
                  <TableHead>Year</TableHead>
                  <TableHead>Portfolio Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentFilteredStudents.length > 0 ? (
                  departmentFilteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      {isSuperAdmin && <TableCell>{student.department}</TableCell>}
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{getStatusBadge(student.portfolioStatus)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Portfolio
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentStudent(student);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentStudent(student);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isSuperAdmin ? 7 : 6} className="text-center py-6">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
      
      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Update student information</DialogDescription>
          </DialogHeader>
          {currentStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={currentStudent.name}
                  onChange={(e) => setCurrentStudent({...currentStudent, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  className="col-span-3"
                  value={currentStudent.email}
                  onChange={(e) => setCurrentStudent({...currentStudent, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-studentId" className="text-right">Student ID</Label>
                <Input
                  id="edit-studentId"
                  className="col-span-3"
                  value={currentStudent.studentId}
                  onChange={(e) => setCurrentStudent({...currentStudent, studentId: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">Department</Label>
                <Input
                  id="edit-department"
                  className="col-span-3"
                  value={currentStudent.department}
                  onChange={(e) => setCurrentStudent({...currentStudent, department: e.target.value})}
                  disabled={!isSuperAdmin}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-year" className="text-right">Year</Label>
                <Input
                  id="edit-year"
                  className="col-span-3"
                  value={currentStudent.year}
                  onChange={(e) => setCurrentStudent({...currentStudent, year: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Student Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentStudent && (
            <div className="py-4">
              <p><strong>Name:</strong> {currentStudent.name}</p>
              <p><strong>Email:</strong> {currentStudent.email}</p>
              <p><strong>Student ID:</strong> {currentStudent.studentId}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteStudent}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Students;
