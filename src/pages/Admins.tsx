
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
  Edit, 
  Trash2,
  Users
} from 'lucide-react';

// Mock admin data
const initialAdmins = [
  { 
    id: '1',
    name: 'Computer Science Admin',
    email: 'csadmin@college.edu',
    department: 'Computer Science',
    studentsManaged: 320,
    dateAdded: '2023-06-15'
  },
  { 
    id: '2',
    name: 'Engineering Admin',
    email: 'engadmin@college.edu',
    department: 'Engineering',
    studentsManaged: 275,
    dateAdded: '2023-05-20'
  },
  { 
    id: '3',
    name: 'Business Admin',
    email: 'businessadmin@college.edu',
    department: 'Business',
    studentsManaged: 310,
    dateAdded: '2023-04-10'
  },
  { 
    id: '4',
    name: 'Arts Admin',
    email: 'artsadmin@college.edu',
    department: 'Arts',
    studentsManaged: 190,
    dateAdded: '2023-07-05'
  },
];

const Admins = () => {
  const { isSuperAdmin } = useAuth();
  const [admins, setAdmins] = useState(initialAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    department: '',
    password: ''
  });

  if (!isSuperAdmin) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Unauthorized Access</h2>
            <p className="text-muted-foreground">You do not have permission to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Filter admins by search term
  const filteredAdmins = admins.filter((admin) => {
    return (
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddAdmin = () => {
    // In a real app, this would call an API
    const id = (admins.length + 1).toString();
    const today = new Date().toISOString().split('T')[0];
    
    setAdmins([...admins, {
      id,
      name: newAdmin.name,
      email: newAdmin.email,
      department: newAdmin.department,
      studentsManaged: 0,
      dateAdded: today
    }]);
    
    setNewAdmin({
      name: '',
      email: '',
      department: '',
      password: ''
    });
    
    setIsAddDialogOpen(false);
    toast.success('Admin added successfully');
  };

  const handleEditAdmin = () => {
    // In a real app, this would call an API
    if (!currentAdmin) return;
    
    const updatedAdmins = admins.map(admin => 
      admin.id === currentAdmin.id ? currentAdmin : admin
    );
    
    setAdmins(updatedAdmins);
    setIsEditDialogOpen(false);
    toast.success('Admin updated successfully');
  };

  const handleDeleteAdmin = () => {
    // In a real app, this would call an API
    if (!currentAdmin) return;
    
    const updatedAdmins = admins.filter(admin => admin.id !== currentAdmin.id);
    setAdmins(updatedAdmins);
    setIsDeleteDialogOpen(false);
    toast.success('Admin deleted successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Admins</h2>
            <p className="text-muted-foreground">Manage department administrators</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogDescription>Create a new department administrator account</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">Department</Label>
                  <Input
                    id="department"
                    className="col-span-3"
                    value={newAdmin.department}
                    onChange={(e) => setNewAdmin({...newAdmin, department: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAdmin}>Add Admin</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search admins..."
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
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Students Managed</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.length > 0 ? (
                  filteredAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.department}</TableCell>
                      <TableCell className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {admin.studentsManaged}
                      </TableCell>
                      <TableCell>{admin.dateAdded}</TableCell>
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
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentAdmin(admin);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentAdmin(admin);
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
                    <TableCell colSpan={6} className="text-center py-6">
                      No admins found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
      
      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>Update admin information</DialogDescription>
          </DialogHeader>
          {currentAdmin && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={currentAdmin.name}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  className="col-span-3"
                  value={currentAdmin.email}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">Department</Label>
                <Input
                  id="edit-department"
                  className="col-span-3"
                  value={currentAdmin.department}
                  onChange={(e) => setCurrentAdmin({...currentAdmin, department: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditAdmin}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Admin Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Admin</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this admin? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentAdmin && (
            <div className="py-4">
              <p><strong>Name:</strong> {currentAdmin.name}</p>
              <p><strong>Email:</strong> {currentAdmin.email}</p>
              <p><strong>Department:</strong> {currentAdmin.department}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAdmin}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Admins;
