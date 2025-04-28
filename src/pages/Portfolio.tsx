
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import {
  PlusCircle,
  Save,
  Upload,
  Paperclip,
  Trash2,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Code
} from 'lucide-react';

// Mock initial portfolio data
const initialPortfolio = {
  personal: {
    name: 'John Smith',
    title: 'Computer Science Student',
    bio: 'A passionate CS student with interests in web development, AI, and cybersecurity.',
    phone: '555-123-4567',
    website: 'johnsmith.dev',
    linkedin: 'linkedin.com/in/johnsmith',
    github: 'github.com/johnsmith'
  },
  education: [
    {
      id: '1',
      institution: 'Sample University',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2020-09',
      endDate: '2024-05',
      gpa: '3.8',
      description: 'Focusing on software engineering and artificial intelligence.'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Developed a full-stack e-commerce platform with React, Node.js, and MongoDB.',
      startDate: '2022-06',
      endDate: '2022-08',
      link: 'github.com/johnsmith/ecommerce',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API']
    },
    {
      id: '2',
      name: 'Machine Learning Classifier',
      description: 'Built an image classification model using TensorFlow and Keras.',
      startDate: '2023-01',
      endDate: '2023-03',
      link: 'github.com/johnsmith/ml-classifier',
      skills: ['Python', 'TensorFlow', 'Keras', 'Jupyter', 'Data Science']
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      position: 'Software Development Intern',
      startDate: '2022-05',
      endDate: '2022-08',
      description: 'Worked on front-end development using React and implemented RESTful APIs.',
      skills: ['React', 'JavaScript', 'REST APIs', 'Git']
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Dean\'s List',
      issuer: 'Sample University',
      date: '2022-12',
      description: 'Awarded for academic excellence in Fall 2022 semester.'
    },
    {
      id: '2',
      title: 'Hackathon Winner',
      issuer: 'CodeFest 2023',
      date: '2023-03',
      description: 'First place in the annual CodeFest hackathon for developing an AI-assisted learning platform.'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Advanced' },
    { id: '2', name: 'React', level: 'Advanced' },
    { id: '3', name: 'Python', level: 'Intermediate' },
    { id: '4', name: 'Node.js', level: 'Intermediate' },
    { id: '5', name: 'MongoDB', level: 'Intermediate' },
    { id: '6', name: 'Git', level: 'Advanced' },
    { id: '7', name: 'SQL', level: 'Beginner' },
    { id: '8', name: 'TensorFlow', level: 'Beginner' }
  ]
};

const Portfolio = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [activeTab, setActiveTab] = useState('personal');
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    link: '',
    skills: ''
  });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: ''
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    issuer: '',
    date: '',
    description: ''
  });
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Beginner'
  });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      personal: {
        ...portfolio.personal,
        [name]: value
      }
    });
  };

  const handleSavePortfolio = () => {
    // In a real app, this would call an API to save the portfolio
    toast.success('Portfolio saved successfully');
  };

  const calculateCompletionPercentage = () => {
    let totalFields = 0;
    let completedFields = 0;
    
    // Count personal fields
    const personalFields = Object.values(portfolio.personal);
    totalFields += personalFields.length;
    completedFields += personalFields.filter(field => field && field.trim() !== '').length;
    
    // Count other sections
    if (portfolio.education.length > 0) completedFields += 1;
    if (portfolio.projects.length > 0) completedFields += 1;
    if (portfolio.experience.length > 0) completedFields += 1;
    if (portfolio.achievements.length > 0) completedFields += 1;
    if (portfolio.skills.length > 0) completedFields += 1;
    
    // Add section totals
    totalFields += 5; // One for each section besides personal
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const addNewProject = () => {
    if (!newProject.name || !newProject.description) {
      toast.error('Please fill in required fields');
      return;
    }
    
    const id = (portfolio.projects.length + 1).toString();
    const skillsArray = newProject.skills.split(',').map(skill => skill.trim()).filter(Boolean);
    
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          id,
          name: newProject.name,
          description: newProject.description,
          startDate: newProject.startDate,
          endDate: newProject.endDate,
          link: newProject.link,
          skills: skillsArray
        }
      ]
    });
    
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      link: '',
      skills: ''
    });
    
    setIsAddingProject(false);
    toast.success('Project added successfully');
  };

  const addNewExperience = () => {
    if (!newExperience.company || !newExperience.position || !newExperience.description) {
      toast.error('Please fill in required fields');
      return;
    }
    
    const id = (portfolio.experience.length + 1).toString();
    const skillsArray = newExperience.skills.split(',').map(skill => skill.trim()).filter(Boolean);
    
    setPortfolio({
      ...portfolio,
      experience: [
        ...portfolio.experience,
        {
          id,
          company: newExperience.company,
          position: newExperience.position,
          startDate: newExperience.startDate,
          endDate: newExperience.endDate,
          description: newExperience.description,
          skills: skillsArray
        }
      ]
    });
    
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: ''
    });
    
    setIsAddingExperience(false);
    toast.success('Experience added successfully');
  };

  const addNewAchievement = () => {
    if (!newAchievement.title || !newAchievement.issuer) {
      toast.error('Please fill in required fields');
      return;
    }
    
    const id = (portfolio.achievements.length + 1).toString();
    
    setPortfolio({
      ...portfolio,
      achievements: [
        ...portfolio.achievements,
        {
          id,
          title: newAchievement.title,
          issuer: newAchievement.issuer,
          date: newAchievement.date,
          description: newAchievement.description
        }
      ]
    });
    
    setNewAchievement({
      title: '',
      issuer: '',
      date: '',
      description: ''
    });
    
    setIsAddingAchievement(false);
    toast.success('Achievement added successfully');
  };

  const addNewSkill = () => {
    if (!newSkill.name) {
      toast.error('Please enter a skill name');
      return;
    }
    
    const id = (portfolio.skills.length + 1).toString();
    
    setPortfolio({
      ...portfolio,
      skills: [
        ...portfolio.skills,
        {
          id,
          name: newSkill.name,
          level: newSkill.level
        }
      ]
    });
    
    setNewSkill({
      name: '',
      level: 'Beginner'
    });
    
    setIsAddingSkill(false);
    toast.success('Skill added successfully');
  };

  const deleteProject = (id: string) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter(project => project.id !== id)
    });
    toast.success('Project deleted');
  };

  const deleteExperience = (id: string) => {
    setPortfolio({
      ...portfolio,
      experience: portfolio.experience.filter(exp => exp.id !== id)
    });
    toast.success('Experience deleted');
  };

  const deleteAchievement = (id: string) => {
    setPortfolio({
      ...portfolio,
      achievements: portfolio.achievements.filter(achievement => achievement.id !== id)
    });
    toast.success('Achievement deleted');
  };

  const deleteSkill = (id: string) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter(skill => skill.id !== id)
    });
    toast.success('Skill deleted');
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Portfolio</h2>
            <p className="text-muted-foreground">Showcase your academic and professional achievements</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Completion</p>
              <p className="text-2xl font-bold">{completionPercentage}%</p>
            </div>
            
            <Button onClick={handleSavePortfolio}>
              <Save className="mr-2 h-4 w-4" />
              Save Portfolio
            </Button>
          </div>
        </div>
        
        <Progress value={completionPercentage} className="h-2" />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={portfolio.personal.name} 
                      onChange={handlePersonalInfoChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={portfolio.personal.title} 
                      onChange={handlePersonalInfoChange}
                      placeholder="e.g., Computer Science Student" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea 
                    id="bio" 
                    name="bio"
                    value={portfolio.personal.bio} 
                    onChange={handlePersonalInfoChange}
                    placeholder="Write a short bio about yourself"
                    className="min-h-[120px]" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={portfolio.personal.phone} 
                      onChange={handlePersonalInfoChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/Portfolio URL</Label>
                    <Input 
                      id="website" 
                      name="website"
                      value={portfolio.personal.website} 
                      onChange={handlePersonalInfoChange}
                      placeholder="e.g., yourname.com" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input 
                      id="linkedin" 
                      name="linkedin"
                      value={portfolio.personal.linkedin} 
                      onChange={handlePersonalInfoChange}
                      placeholder="e.g., linkedin.com/in/yourname" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Profile</Label>
                    <Input 
                      id="github" 
                      name="github"
                      value={portfolio.personal.github} 
                      onChange={handlePersonalInfoChange}
                      placeholder="e.g., github.com/yourusername" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profile-photo">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-2xl font-medium">
                        {portfolio.personal.name.charAt(0)}
                      </span>
                    </div>
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Showcase your academic and personal projects</CardDescription>
                </div>
                {!isAddingProject && (
                  <Button onClick={() => setIsAddingProject(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingProject ? (
                  <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium">New Project</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name *</Label>
                      <Input 
                        id="project-name" 
                        value={newProject.name} 
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        placeholder="e.g., E-commerce Website" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description *</Label>
                      <Textarea 
                        id="project-description" 
                        value={newProject.description} 
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        placeholder="Describe your project"
                        className="min-h-[80px]" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-start-date">Start Date</Label>
                        <Input 
                          id="project-start-date"
                          type="month" 
                          value={newProject.startDate} 
                          onChange={(e) => setNewProject({...newProject, startDate: e.target.value})} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="project-end-date">End Date</Label>
                        <Input 
                          id="project-end-date"
                          type="month" 
                          value={newProject.endDate} 
                          onChange={(e) => setNewProject({...newProject, endDate: e.target.value})} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-link">Project Link</Label>
                      <Input 
                        id="project-link" 
                        value={newProject.link} 
                        onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                        placeholder="e.g., github.com/yourname/project" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-skills">Skills/Technologies (comma separated)</Label>
                      <Input 
                        id="project-skills" 
                        value={newProject.skills} 
                        onChange={(e) => setNewProject({...newProject, skills: e.target.value})}
                        placeholder="e.g., React, Node.js, MongoDB" 
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingProject(false)}>Cancel</Button>
                      <Button onClick={addNewProject}>Save Project</Button>
                    </div>
                  </div>
                ) : null}
                
                <div className="space-y-6 mt-4">
                  {portfolio.projects.length > 0 ? (
                    portfolio.projects.map((project) => (
                      <div 
                        key={project.id} 
                        className="border rounded-lg p-4 space-y-3 relative hover:shadow-md transition-shadow"
                      >
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div>
                          <h3 className="text-lg font-medium">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.startDate && project.endDate ? (
                              `${new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                            ) : (
                              project.startDate ? `Started: ${new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''
                            )}
                          </p>
                        </div>
                        
                        <p>{project.description}</p>
                        
                        {project.link && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {project.link}
                            </a>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {project.skills && project.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                      <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add your first project to showcase your skills and accomplishments.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Add your internships and work experience</CardDescription>
                </div>
                {!isAddingExperience && (
                  <Button onClick={() => setIsAddingExperience(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingExperience ? (
                  <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium">New Experience</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization *</Label>
                        <Input 
                          id="company" 
                          value={newExperience.company} 
                          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                          placeholder="e.g., Tech Company Inc." 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position/Title *</Label>
                        <Input 
                          id="position" 
                          value={newExperience.position} 
                          onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                          placeholder="e.g., Software Engineering Intern" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="exp-start-date">Start Date</Label>
                        <Input 
                          id="exp-start-date"
                          type="month" 
                          value={newExperience.startDate} 
                          onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="exp-end-date">End Date</Label>
                        <Input 
                          id="exp-end-date"
                          type="month" 
                          value={newExperience.endDate} 
                          onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="exp-description">Description *</Label>
                      <Textarea 
                        id="exp-description" 
                        value={newExperience.description} 
                        onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                        placeholder="Describe your responsibilities and achievements"
                        className="min-h-[80px]" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="exp-skills">Skills (comma separated)</Label>
                      <Input 
                        id="exp-skills" 
                        value={newExperience.skills} 
                        onChange={(e) => setNewExperience({...newExperience, skills: e.target.value})}
                        placeholder="e.g., Project Management, React, Communication" 
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingExperience(false)}>Cancel</Button>
                      <Button onClick={addNewExperience}>Save Experience</Button>
                    </div>
                  </div>
                ) : null}
                
                <div className="space-y-6 mt-4">
                  {portfolio.experience.length > 0 ? (
                    portfolio.experience.map((exp) => (
                      <div 
                        key={exp.id} 
                        className="border rounded-lg p-4 space-y-3 relative hover:shadow-md transition-shadow"
                      >
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div>
                          <h3 className="text-lg font-medium">{exp.position}</h3>
                          <p className="font-medium">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate && exp.endDate ? (
                              `${new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                            ) : (
                              exp.startDate ? `Started: ${new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''
                            )}
                          </p>
                        </div>
                        
                        <p>{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.skills && exp.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Briefcase className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                      <h3 className="mt-4 text-lg font-semibold">No experience yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add your work experience or internships.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Add your awards, honors, and recognitions</CardDescription>
                </div>
                {!isAddingAchievement && (
                  <Button onClick={() => setIsAddingAchievement(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingAchievement ? (
                  <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium">New Achievement</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="achievement-title">Title/Award Name *</Label>
                      <Input 
                        id="achievement-title" 
                        value={newAchievement.title} 
                        onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                        placeholder="e.g., Dean's List" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="achievement-issuer">Issuer/Organization *</Label>
                      <Input 
                        id="achievement-issuer" 
                        value={newAchievement.issuer} 
                        onChange={(e) => setNewAchievement({...newAchievement, issuer: e.target.value})}
                        placeholder="e.g., University Name" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="achievement-date">Date</Label>
                      <Input 
                        id="achievement-date"
                        type="month" 
                        value={newAchievement.date} 
                        onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="achievement-description">Description</Label>
                      <Textarea 
                        id="achievement-description" 
                        value={newAchievement.description} 
                        onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                        placeholder="Describe the achievement and its significance"
                        className="min-h-[80px]" 
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingAchievement(false)}>Cancel</Button>
                      <Button onClick={addNewAchievement}>Save Achievement</Button>
                    </div>
                  </div>
                ) : null}
                
                <div className="space-y-6 mt-4">
                  {portfolio.achievements.length > 0 ? (
                    portfolio.achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className="border rounded-lg p-4 space-y-3 relative hover:shadow-md transition-shadow"
                      >
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => deleteAchievement(achievement.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div>
                          <h3 className="text-lg font-medium">{achievement.title}</h3>
                          <p className="font-medium">{achievement.issuer}</p>
                          {achievement.date && (
                            <p className="text-sm text-muted-foreground">
                              {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                        
                        <p>{achievement.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Award className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                      <h3 className="mt-4 text-lg font-semibold">No achievements yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add your awards, honors, and recognitions.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Showcase your technical and professional skills</CardDescription>
                </div>
                {!isAddingSkill && (
                  <Button onClick={() => setIsAddingSkill(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingSkill ? (
                  <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium">New Skill</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skill-name">Skill Name *</Label>
                      <Input 
                        id="skill-name" 
                        value={newSkill.name} 
                        onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                        placeholder="e.g., JavaScript" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skill-level">Proficiency Level</Label>
                      <select 
                        id="skill-level"
                        className="w-full border border-input rounded-md h-10 px-3"
                        value={newSkill.level} 
                        onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingSkill(false)}>Cancel</Button>
                      <Button onClick={addNewSkill}>Save Skill</Button>
                    </div>
                  </div>
                ) : null}
                
                <div className="space-y-6 mt-4">
                  {portfolio.skills.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {portfolio.skills.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                        >
                          <div>
                            <h3 className="font-medium">{skill.name}</h3>
                            <p className="text-sm text-muted-foreground">{skill.level}</p>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteSkill(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Code className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                      <h3 className="mt-4 text-lg font-semibold">No skills yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add your technical and professional skills.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Your academic background</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 mt-4">
                  {portfolio.education.map((edu) => (
                    <div 
                      key={edu.id} 
                      className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{edu.degree}</h3>
                        <p className="font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startDate && edu.endDate ? (
                            `${new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                          ) : (
                            edu.startDate ? `Started: ${new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''
                          )}
                        </p>
                      </div>
                      
                      {edu.gpa && (
                        <p><strong>GPA:</strong> {edu.gpa}</p>
                      )}
                      
                      <p>{edu.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
