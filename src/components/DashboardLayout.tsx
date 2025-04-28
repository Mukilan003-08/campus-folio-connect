
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Users, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  FileText,
  Award,
  BarChart4,
  UserPlus
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout, isSuperAdmin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Dashboard', icon: <Home className="w-5 h-5 mr-2" />, href: '/' },
      { name: 'My Profile', icon: <User className="w-5 h-5 mr-2" />, href: '/profile' },
    ];
    
    if (isSuperAdmin) {
      return [
        ...commonItems,
        { name: 'Admins', icon: <UserPlus className="w-5 h-5 mr-2" />, href: '/admins' },
        { name: 'Students', icon: <Users className="w-5 h-5 mr-2" />, href: '/students' },
        { name: 'Departments', icon: <BookOpen className="w-5 h-5 mr-2" />, href: '/departments' },
        { name: 'Settings', icon: <Settings className="w-5 h-5 mr-2" />, href: '/settings' },
        { name: 'Analytics', icon: <BarChart4 className="w-5 h-5 mr-2" />, href: '/analytics' },
      ];
    } else if (isAdmin) {
      return [
        ...commonItems,
        { name: 'Students', icon: <Users className="w-5 h-5 mr-2" />, href: '/students' },
        { name: 'Portfolios', icon: <FileText className="w-5 h-5 mr-2" />, href: '/portfolios' },
        { name: 'Department', icon: <BookOpen className="w-5 h-5 mr-2" />, href: '/department' },
        { name: 'Analytics', icon: <BarChart4 className="w-5 h-5 mr-2" />, href: '/analytics' },
      ];
    } else {
      return [
        ...commonItems,
        { name: 'Portfolio', icon: <FileText className="w-5 h-5 mr-2" />, href: '/portfolio' },
        { name: 'Projects', icon: <BookOpen className="w-5 h-5 mr-2" />, href: '/projects' },
        { name: 'Achievements', icon: <Award className="w-5 h-5 mr-2" />, href: '/achievements' },
      ];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - hidden on mobile */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transform transition-transform duration-200 ease-in-out md:translate-x-0 border-r border-border hidden md:block">
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="mb-8 px-4 py-3">
            <h1 className="text-xl font-bold text-campus-600">Campus Portfolio</h1>
          </div>
          
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start mb-1"
                onClick={() => navigate(item.href)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>
          
          <div className="pt-2 mt-6 border-t border-border">
            {user && (
              <div className="px-4 py-3 mb-2 flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden border-b border-border bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-medium ml-2">Campus Portfolio</h1>
          </div>
          
          {user && (
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background transform transition-transform duration-200 ease-in-out md:translate-x-0 border-r border-border md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="mb-8 px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-campus-600">Campus Portfolio</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start mb-1"
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>
          
          <div className="pt-2 mt-6 border-t border-border">
            {user && (
              <div className="px-4 py-3 mb-2 flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="md:pl-64 pt-0 md:pt-0">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
