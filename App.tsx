// ... (imports)
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  User, 
  Shield, 
  Menu, 
  X, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare, 
  ChevronRight,
  ChevronLeft,
  Filter,
  Users,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  Code,
  Music,
  Palette,
  Languages,
  MapPin,
  Video,
  Globe,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  Mail,
  ToggleLeft,
  ToggleRight,
  LogIn,
  Lock,
  UserPlus,
  Star,
  Award,
  ArrowRight,
  Calendar,
  Check,
  Share2,
  Heart,
  Home,
  Compass,
  Cpu,
  Dumbbell,
  Gamepad2
} from 'lucide-react';

// ... (Mock Data remains the same - Teacher, Courses, Enquiries, Categories)
const INITIAL_TEACHERS = [
  { id: 101, name: "R.K. Verma", email: "rk.verma@example.com", phone: "+91 9876543210", subject: "Mathematics", status: "Active", joinDate: "2023-01-15", bio: "20+ years of experience in coaching for IIT JEE. Formerly senior faculty at Kota." },
  { id: 102, name: "Priya Singh", email: "priya.s@example.com", phone: "+91 9812345678", subject: "English", status: "Active", joinDate: "2023-02-20", bio: "Certified IELTS trainer and Literature major. I make grammar fun and easy." },
  { id: 103, name: "Rahul Sharma", email: "rahul.dev@example.com", phone: "+91 9988776655", subject: "Computer Science", status: "Inactive", joinDate: "2023-03-10", bio: "Full stack developer working at a top MNC. I teach coding on weekends." },
  { id: 104, name: "Sneha Deshmukh", email: "sneha.music@example.com", phone: "+91 9123456789", subject: "Music", status: "Active", joinDate: "2023-04-05", bio: "Visharad in Hindustani Classical music. Performed at various state level concerts." },
  { id: 105, name: "Anjali Gupta", email: "anjali.sci@example.com", phone: "+91 8877665544", subject: "Science", status: "Active", joinDate: "2023-05-12", bio: "PhD in Biology. Passionate about making science concepts crystal clear for school students." },
  { id: 106, name: "Kenji Nakamura", email: "kenji@example.com", phone: "+91 7777777777", subject: "Japanese", status: "Active", joinDate: "2023-06-01", bio: "Native Japanese speaker with 5 years of teaching experience in India." },
  { id: 107, name: "S. Srinivasan", email: "srinivasan@example.com", phone: "+91 6666666666", subject: "Mathematics", status: "Active", joinDate: "2023-06-15", bio: "Strict but effective. My students consistently score 95+ in boards." },
  { id: 108, name: "Riya's Studio", email: "riya@example.com", phone: "+91 5555555555", subject: "Dance", status: "Active", joinDate: "2023-07-01", bio: "Professional choreographer specializing in contemporary and hip-hop." },
  { id: 109, name: "Vikram Malhotra", email: "vikram@example.com", phone: "+91 4444444444", subject: "Chess", status: "Active", joinDate: "2023-08-01", bio: "FIDE Rated player. I teach strategy and opening theory." },
  { id: 110, name: "Sarah Jones", email: "sarah@example.com", phone: "+91 3333333333", subject: "Yoga", status: "Active", joinDate: "2023-08-15", bio: "Certified Yoga Alliance instructor. Focus on Hatha and Vinyasa flow." },
];

const INITIAL_COURSES = [
  {
    id: 1,
    title: "IIT JEE Advanced Mathematics",
    teacherName: "R.K. Verma",
    teacherId: 101,
    description: "Comprehensive coaching for JEE Mains & Advanced. Focus on Calculus, Algebra and Coordinate Geometry with past year paper analysis. Includes weekly mock tests and doubt clearing sessions.",
    category: "Competitive Exams",
    mode: "Online",
    status: "Approved",
    price: "₹800/hr",
    rating: 4.9,
    reviews: 120,
    students: 450,
    language: "English, Hindi",
    duration: "6 Months",
    syllabus: ["Calculus: Limits, Continuity, Derivatives", "Algebra: Complex Numbers, Quadratics", "Coordinate Geometry: Conics", "Vectors & 3D Geometry"]
  },
  {
    id: 2,
    title: "Class 10 Science (CBSE & ICSE)",
    teacherName: "Anjali Gupta",
    teacherId: 105,
    description: "Complete syllabus coverage for Physics, Chemistry, and Biology. Weekly tests and direct doubt solving sessions at my center in Indiranagar. Small batch sizes ensured.",
    category: "School Tuitions",
    mode: "Offline",
    status: "Approved",
    price: "₹400/hr",
    rating: 4.8,
    reviews: 85,
    students: 120,
    language: "English",
    duration: "Academic Year",
    syllabus: ["Physics: Light, Electricity", "Chemistry: Carbon Compounds, Periodic Table", "Biology: Life Processes, Heredity"]
  },
  {
    id: 3,
    title: "Japanese Language (N5 - N4 Level)",
    teacherName: "Kenji Nakamura",
    teacherId: 106,
    description: "Learn Japanese from a native speaker. Covers Hiragana, Katakana, Kanji, and basic conversation skills for students and professionals planning to work in Japan.",
    category: "Languages",
    mode: "Online",
    status: "Approved",
    price: "₹1000/hr",
    rating: 5.0,
    reviews: 42,
    students: 60,
    language: "English, Japanese",
    duration: "3 Months per level",
    syllabus: ["Hiragana & Katakana Scripts", "Basic Kanji (100 chars)", "Daily Conversation & Greetings", "Grammar Particles"]
  },
  {
    id: 4,
    title: "Class 12 Mathematics (Board Exams)",
    teacherName: "S. Srinivasan",
    teacherId: 107,
    description: "Intensive coaching for Class 12 Board exams. Focus on Integration, Differentiation and Probability. Small batch size for personal attention to ensure 95+ score.",
    category: "School Tuitions",
    mode: "Offline",
    status: "Approved",
    price: "₹600/hr",
    rating: 4.7,
    reviews: 210,
    students: 300,
    language: "English",
    duration: "8 Months",
    syllabus: ["Relations & Functions", "Calculus (Integration/Differentiation)", "Vectors & 3D", "Probability"]
  },
  {
    id: 5,
    title: "Contemporary & Western Dance",
    teacherName: "Riya's Dance Studio",
    teacherId: 108,
    description: "Professional dance training for beginners and intermediates. Learn choreography, body isolation, and rhythm. Regular showcases and video shoots.",
    category: "Music & Dance",
    mode: "Offline",
    status: "Approved",
    price: "₹2000/mo",
    rating: 4.9,
    reviews: 65,
    students: 150,
    language: "English",
    duration: "Ongoing",
    syllabus: ["Body Isolation Techniques", "Rhythm & Musicality", "Choreography Routines", "Flexibility Training"]
  },
  {
    id: 6,
    title: "NEET Physics: Mechanics & Optics",
    teacherName: "Amit Kumar",
    teacherId: 101, 
    description: "Concept-based learning for medical aspirants. Special focus on numericals and NCERT based syllabus. Short tricks for fast calculation.",
    category: "Competitive Exams",
    mode: "Online",
    status: "Pending", 
    price: "₹700/hr",
    rating: 4.6,
    reviews: 30,
    students: 200,
    language: "Hindi, English",
    duration: "4 Months",
    syllabus: ["Kinematics & Dynamics", "Rotational Motion", "Ray Optics", "Wave Optics"]
  },
  {
    id: 7,
    title: "Hindustani Classical Vocals",
    teacherName: "Sneha Deshmukh",
    teacherId: 104,
    description: "Learn ragas, taals, and voice culture. Beginner to advanced levels. Certification from Gandharva Mahavidyalaya preparation included.",
    category: "Music & Dance",
    mode: "Online",
    status: "Approved",
    price: "₹400/hr",
    rating: 5.0,
    reviews: 15,
    students: 25,
    language: "English, Hindi, Marathi",
    duration: "Ongoing",
    syllabus: ["Voice Culture (Aakaar)", "Basic Alankars", "Raag Yaman & Bhupali", "Taal Studies"]
  },
  {
    id: 8,
    title: "Python Programming for Kids",
    teacherName: "Rahul Sharma",
    teacherId: 103,
    description: "A fun and interactive introduction to Python programming. Build games and simple apps. Designed specifically for ages 10-15.",
    category: "IT & Coding",
    mode: "Online",
    status: "Approved",
    price: "₹500/hr",
    rating: 4.8,
    reviews: 55,
    students: 80,
    language: "English",
    duration: "2 Months",
    syllabus: ["Variables & Data Types", "Loops & Conditions", "Functions", "Building a Calculator & Snake Game"]
  },
  {
    id: 9,
    title: "Acoustic Guitar for Beginners",
    teacherName: "Mike's Music Academy",
    teacherId: 104,
    description: "Start your musical journey today. Learn chords, strumming patterns, and your favorite songs in a relaxed environment.",
    category: "Music & Dance",
    mode: "Offline",
    status: "Approved",
    price: "₹600/hr",
    rating: 4.7,
    reviews: 32,
    students: 45,
    language: "English",
    duration: "3 Months",
    syllabus: ["Anatomy of Guitar", "Basic Chords (G, C, D, Em)", "Strumming Patterns", "Reading Tabs"]
  },
  {
    id: 10,
    title: "Digital Marketing Mastery",
    teacherName: "Priya Singh",
    teacherId: 102,
    description: "Master SEO, Social Media Marketing, and Google Ads. Practical projects included. Suitable for students and entrepreneurs.",
    category: "IT & Coding",
    mode: "Online",
    status: "Approved",
    price: "₹900/hr",
    rating: 4.5,
    reviews: 28,
    students: 110,
    language: "English",
    duration: "10 Weeks",
    syllabus: ["SEO Fundamentals", "Social Media Strategy", "Google Analytics", "Email Marketing"]
  },
  {
    id: 11,
    title: "Yoga for Stress Relief",
    teacherName: "Sarah Jones",
    teacherId: 110,
    description: "Calm your mind and strengthen your body. Gentle Hatha yoga sessions suitable for all ages and fitness levels.",
    category: "Arts",
    mode: "Online",
    status: "Approved",
    price: "₹300/session",
    rating: 4.9,
    reviews: 90,
    students: 200,
    language: "English",
    duration: "Ongoing",
    syllabus: ["Pranayama (Breathing)", "Surya Namaskar", "Asanas for Flexibility", "Meditation"]
  },
  {
    id: 12,
    title: "Chess Strategy: Beginner to Intermediate",
    teacherName: "Vikram Malhotra",
    teacherId: 109,
    description: "Improve your ELO rating. Learn opening traps, middle game tactics, and endgame checkmate patterns from a FIDE rated player.",
    category: "Competitive Exams",
    mode: "Online",
    status: "Approved",
    price: "₹500/hr",
    rating: 4.8,
    reviews: 40,
    students: 55,
    language: "English, Hindi",
    duration: "4 Months",
    syllabus: ["Opening Principles", "Tactics (Pins, Forks, Skewers)", "Endgame Basics", "Analyzing Grandmaster Games"]
  }
];

const INITIAL_ENQUIRIES = [
  {
    id: 1,
    courseId: 1,
    courseTitle: "IIT JEE Advanced Mathematics",
    studentName: "Arjun Mehta",
    email: "arjun.m@example.com",
    phone: "9876543210",
    message: "Namaste Sir, I am targeting JEE 2025. Do you take doubt sessions on Sundays?",
    date: "2023-10-25",
    status: "New"
  },
  {
    id: 2,
    courseId: 2,
    courseTitle: "Class 10 Science (CBSE & ICSE)",
    studentName: "Mrs. Sharma",
    email: "sharma.p@example.com",
    phone: "9123456789",
    message: "I am looking for a direct tuition for my daughter near Indiranagar. Please share location.",
    date: "2023-10-26",
    status: "Replied"
  }
];

const CATEGORIES = [
  { name: "All", icon: null },
  { name: "School Tuitions", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Competitive Exams", icon: <GraduationCap className="w-5 h-5" /> },
  { name: "Languages", icon: <Languages className="w-5 h-5" /> },
  { name: "IT & Coding", icon: <Code className="w-5 h-5" /> },
  { name: "Music & Dance", icon: <Music className="w-5 h-5" /> },
  { name: "Arts", icon: <Palette className="w-5 h-5" /> },
  { name: "Sports & Games", icon: <Gamepad2 className="w-5 h-5" /> }
];

// --- Components ---
const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Pending: "bg-amber-100 text-amber-800 border-amber-200",
    Draft: "bg-gray-100 text-gray-800 border-gray-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
    Active: "bg-blue-100 text-blue-800 border-blue-200",
    Inactive: "bg-gray-100 text-gray-500 border-gray-200",
    New: "bg-blue-100 text-blue-800 border-blue-200",
    Replied: "bg-gray-100 text-gray-600 border-gray-200"
  };
  
  const icons = {
    Approved: <CheckCircle className="w-3 h-3 mr-1" />,
    Pending: <Clock className="w-3 h-3 mr-1" />,
    Draft: <BookOpen className="w-3 h-3 mr-1" />,
    Rejected: <XCircle className="w-3 h-3 mr-1" />,
    Active: <CheckCircle className="w-3 h-3 mr-1" />,
    Inactive: <XCircle className="w-3 h-3 mr-1" />,
    New: <MessageSquare className="w-3 h-3 mr-1" />,
    Replied: <CheckCircle className="w-3 h-3 mr-1" />
  };

  return (
    <span className={`flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.Draft}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const ModeBadge = ({ mode }) => {
  const isOnline = mode === "Online";
  return (
    <span className={`flex items-center text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border shadow-sm ${
      isOnline 
        ? "bg-white text-blue-600 border-blue-100" 
        : "bg-white text-purple-600 border-purple-100"
    }`}>
      {isOnline ? <Video className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
      {mode}
    </span>
  );
};

// New Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 pt-16 pb-24 md:pb-8 mt-20">
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">Tutor<span className="text-orange-500">Connect</span></span>
          </div>
          <p className="text-sm text-gray-400">Connecting ambitious learners with expert tutors across India. Online or Offline, we have you covered.</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Learn</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">School Tuitions</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Competitive Exams</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Languages</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Music & Arts</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Teacher Handbook</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Trust & Safety</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@tutorconnect.in</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 8000 9000 10</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Koramangala, Bangalore</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        &copy; 2024 TutorConnect India. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  // --- State ---
  const [activeRole, setActiveRole] = useState('learner'); // 'learner' | 'teacher' | 'admin' | 'login'
  const [learnerView, setLearnerView] = useState('home'); // 'home' | 'browse' | 'detail' | 'profile'
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  
  // Navigation State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'enquire' | 'createCourse'

  // Form States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All"); // "All", "Online", "Offline"
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- Handlers ---

  const handleLogin = (role, email, name = null) => {
    setIsLoggedIn(true);
    const targetRole = role === 'student' ? 'learner' : role;
    setActiveRole(targetRole); 
    setLearnerView('home'); // Reset to home on login
    
    // Determine Display Name
    let displayName = name;
    if (!displayName) {
        if (role === 'admin') displayName = "Administrator";
        else if (role === 'teacher') displayName = "R.K. Verma"; 
        else if (role === 'student') displayName = "Arjun Mehta"; 
    }

    setCurrentUser({
      name: displayName,
      email: email,
      role: role === 'student' ? 'learner' : role
    });
  };

  const handleRegister = (details) => {
    const newUser = {
      name: details.name,
      email: details.email,
      role: details.role,
      id: Date.now()
    };
    if (details.role === 'teacher') {
      const newTeacher = {
        id: Date.now(),
        name: details.name,
        email: details.email,
        phone: details.phone || "Not Provided",
        subject: details.subject || "General",
        status: "Active", 
        joinDate: new Date().toLocaleDateString()
      };
      setTeachers([...teachers, newTeacher]);
    }
    handleLogin(details.role, details.email, details.name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveRole('learner');
    setLearnerView('home');
    setCurrentUser(null);
    setIsMobileMenuOpen(false);
  };

  const handleCreateCourse = (newCourse) => {
    const course = {
      id: courses.length + 1,
      teacherName: currentUser?.name || "Unknown Teacher",
      teacherId: 101, 
      status: "Pending",
      ...newCourse
    };
    setCourses([course, ...courses]);
    setIsModalOpen(false);
  };

  const handleApproveCourse = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: "Approved" } : c));
  };

  const handleRejectCourse = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: "Rejected" } : c));
  };

  const handleSendEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: enquiries.length + 1,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      date: new Date().toLocaleDateString(),
      status: "New",
      ...enquiryData
    };
    setEnquiries([newEnquiry, ...enquiries]);
    setIsModalOpen(false);
    alert("Enquiry sent successfully! The teacher will contact you shortly.");
  };

  const handleToggleTeacherStatus = (id) => {
    setTeachers(teachers.map(t => 
      t.id === id ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" } : t
    ));
  };

  const handleEditTeacher = (id) => {
    alert(`Edit Profile functionality for Teacher ID: ${id} coming soon!`);
  };

  // NEW: Navigate to Course Detail
  const navigateToCourse = (course) => {
    setSelectedCourse(course);
    setLearnerView('detail');
    window.scrollTo(0, 0);
  };

  // --- Components ---

  const MobileBottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setLearnerView('home')} 
          className={`flex flex-col items-center gap-1 ${learnerView === 'home' ? 'text-orange-600' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => setLearnerView('browse')} 
          className={`flex flex-col items-center gap-1 ${learnerView === 'browse' ? 'text-orange-600' : 'text-gray-500'}`}
        >
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-medium">Browse</span>
        </button>
        <button 
          onClick={() => isLoggedIn ? setLearnerView('profile') : setActiveRole('login')} 
          className={`flex flex-col items-center gap-1 ${learnerView === 'profile' ? 'text-orange-600' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </div>
    </div>
  );

  // --- Views ---

  const LoginView = () => {
      const [isRegistering, setIsRegistering] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [subject, setSubject] = useState('');
      const [role, setRole] = useState('student');
  
      const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            if(email && password && name) {
               handleRegister({ name, email, phone, subject, role });
            }
        } else {
            if(email && password) {
              handleLogin(role, email);
            }
        }
      };
  
      const toggleMode = () => {
          setIsRegistering(!isRegistering);
          if (!isRegistering && role === 'admin') setRole('student');
          setEmail(''); setPassword(''); setName(''); setPhone(''); setSubject('');
      };
  
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center">
              <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 ${isRegistering ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                {isRegistering ? <UserPlus className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
              </div>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                  {isRegistering ? "Create an Account" : "Welcome Back"}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {isRegistering ? "Join our community of learners and educators." : "Sign in to access your dashboard."}
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                {/* Role Selection Tabs */}
                <div className="flex rounded-md bg-gray-100 p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-md transition-all ${role === 'student' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-md transition-all ${role === 'teacher' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Teacher
                  </button>
                  {/* Admin only visible in Login Mode */}
                  {!isRegistering && (
                      <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex-1 py-2 text-xs md:text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                      >
                      Admin
                      </button>
                  )}
                </div>
  
                <div className="space-y-4">
                  {/* Registration Only Fields */}
                  {isRegistering && (
                      <div className="animate-in slide-in-from-top-2 duration-300 space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                              <input
                                  type="text"
                                  required={isRegistering}
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                  placeholder="e.g. Aditi Rao"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                              <input
                                  type="tel"
                                  required={isRegistering}
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                  placeholder="+91 98765 43210"
                              />
                          </div>
                          {role === 'teacher' && (
                               <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Subject</label>
                                  <input
                                      type="text"
                                      required={role === 'teacher'}
                                      value={subject}
                                      onChange={(e) => setSubject(e.target.value)}
                                      className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                      placeholder="e.g. Physics, Piano, French"
                                  />
                              </div>
                          )}
                      </div>
                  )}
  
                  {/* Common Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isRegistering ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md transition-colors`}
                >
                  {isRegistering ? "Create Account" : "Sign In"}
                </button>
              </div>
  
              <div className="text-center">
                  <button type="button" onClick={toggleMode} className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
                      {isRegistering ? "Already have an account? Sign in" : "Don't have an account? Create one"}
                  </button>
              </div>
              
              {!isRegistering && (
                  <div className="flex flex-col items-center justify-center space-y-2 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Quick Demos (Login Only)</div>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                      <button type="button" onClick={() => { setEmail('arjun.m@example.com'); setPassword('password'); setRole('student'); }} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 font-medium">
                      Student
                      </button>
                      <button type="button" onClick={() => { setEmail('rk.verma@example.com'); setPassword('password'); setRole('teacher'); }} className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 font-medium">
                      Teacher
                      </button>
                      <button type="button" onClick={() => { setEmail('admin@example.com'); setPassword('password'); setRole('admin'); }} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 font-medium">
                      Admin
                      </button>
                  </div>
                  </div>
              )}
            </form>
          </div>
        </div>
      );
  };

  const LearnerView = () => {
    // Filter logic shared between Home and Browse
    const filteredCourses = useMemo(() => {
      return courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        const matchesMode = selectedMode === "All" || course.mode === selectedMode;
        const isApproved = course.status === "Approved";
        return matchesSearch && matchesCategory && matchesMode && isApproved;
      });
    }, [courses, searchQuery, selectedCategory, selectedMode]);

    // Sub-components for LearnerView

    const Hero = () => (
      <div className="relative bg-gray-900 overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl mb-8 md:mb-12 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 px-4 md:px-8 lg:px-12 xl:px-20 pt-10 pb-20 md:pt-16 md:pb-32">
          {/* Abstract Background Shapes */}
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-gradient-to-br from-orange-600/30 to-purple-600/30 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[120%] bg-gradient-to-tl from-blue-600/20 to-teal-500/20 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Any Skill, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Anytime, Anywhere.</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
              Connect with India's top tutors for School Tuitions, JEE/NEET Prep, Coding, Music, and Languages.
            </p>
          </div>
        </div>
    );

    const SearchBar = ({ isCompact = false }) => (
      <div className={`relative z-20 ${isCompact ? 'mb-8' : '-mt-14 md:-mt-24 mb-10 md:mb-16'} px-2`}>
         <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-white/50 ring-1 ring-black/5 flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all border border-transparent focus:border-orange-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <div className="hidden md:block relative min-w-[140px]">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select 
                    value={selectedMode} 
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full appearance-none pl-10 pr-8 py-4 rounded-xl bg-gray-50 hover:bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer border border-transparent focus:border-orange-200"
                  >
                    <option value="All">Any Mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                  </div>
               </div>
               {learnerView === 'home' && (
                 <button 
                  onClick={() => setLearnerView('browse')}
                  className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 md:py-4 px-8 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-95 whitespace-nowrap"
                 >
                    Search
                 </button>
               )}
            </div>
         </div>
      </div>
    );

    const CourseCard = ({ course, isMobileSnap = false }) => (
      <div className={`bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group flex flex-col h-full ${isMobileSnap ? 'min-w-[280px] md:min-w-0 snap-center' : ''}`}>
        <div className="h-40 md:h-48 relative overflow-hidden cursor-pointer" onClick={() => navigateToCourse(course)}>
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(course.category)} opacity-90 group-hover:scale-105 transition-transform duration-700`} />
          <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-gray-900">{course.rating || '4.8'}</span>
                <span className="text-[10px] text-gray-500">({course.reviews || '20'})</span>
              </div>
          </div>
          <div className="absolute top-4 right-4">
              <ModeBadge mode={course.mode} />
          </div>
          <div className="absolute -bottom-6 left-6">
              <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-500 font-bold shadow-md relative z-10">
                {course.teacherName.charAt(0)}
              </div>
          </div>
        </div>

        <div className="pt-8 p-5 md:p-6 flex-grow flex flex-col">
          <div className="mb-1">
            <span className="text-[10px] font-bold tracking-wider text-orange-600 uppercase bg-orange-50 px-2 py-1 rounded-md line-clamp-1">{course.category}</span>
          </div>
          <h3 className="font-bold text-base md:text-lg text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-2" onClick={() => navigateToCourse(course)}>
              {course.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium mb-3 flex items-center truncate">By {course.teacherName}</p>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">{course.description}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
            <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Starting at</p>
                <span className="font-bold text-lg md:text-xl text-gray-900">{course.price}</span>
            </div>
            <button 
              onClick={() => navigateToCourse(course)}
              className="bg-gray-50 hover:bg-orange-600 text-gray-900 hover:text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );

    // --- HOME VIEW ---
    if (learnerView === 'home') {
      return (
        <div className="animate-in fade-in duration-500 pb-20 md:pb-0">
          <div className="md:hidden px-4 pt-2 mb-4 flex justify-between items-center">
             <div>
                <p className="text-xs text-gray-500 font-medium">Good Morning,</p>
                <h2 className="text-xl font-bold text-gray-900">{currentUser ? currentUser.name : "Learner"} 👋</h2>
             </div>
             {isLoggedIn ? (
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">{currentUser.name.charAt(0)}</div>
             ) : (
                <button onClick={() => setActiveRole('login')} className="p-2 bg-gray-100 rounded-full text-gray-600"><LogIn className="w-5 h-5"/></button>
             )}
          </div>

          <Hero />
          <SearchBar />

          {/* Trust Stats - Hidden on Mobile to reduce clutter */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20 px-4">
            {[
              { label: "Active Tutors", value: "500+", icon: Users },
              { label: "Happy Students", value: "12k+", icon: GraduationCap },
              { label: "Subjects", value: "50+", icon: BookOpen },
              { label: "Avg Rating", value: "4.8/5", icon: Star },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                  </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-end justify-between mb-6 px-2">
              <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Explore Categories</h2>
                  <p className="text-sm text-gray-500 mt-1 hidden md:block">Find the perfect tutor based on your specific needs</p>
              </div>
              <button 
                  onClick={() => { setSelectedCategory("All"); setLearnerView('browse'); }}
                  className="flex items-center text-xs md:text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors"
              >
                  View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </button>
            </div>
            {/* Mobile: Horizontal Scroll, Desktop: Grid */}
            <div className="flex overflow-x-auto pb-4 gap-4 px-2 md:grid md:grid-cols-4 lg:grid-cols-6 no-scrollbar snap-x">
              {CATEGORIES.filter(c => c.name !== 'All').map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => { setSelectedCategory(cat.name); setLearnerView('browse'); }}
                  className="snap-start shrink-0 w-28 md:w-auto group flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border bg-white border-gray-100 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-3 rounded-full mb-3 bg-gray-100 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                      {React.cloneElement(cat.icon, { className: "w-6 h-6" })}
                  </div>
                  <span className="font-medium text-xs md:text-sm text-center text-gray-600 group-hover:text-gray-900">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Top Courses Preview */}
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Top Rated Courses</h2>
              <button 
                  onClick={() => setLearnerView('browse')}
                  className="text-xs md:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                  See All <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
            
            {/* Mobile: Horizontal Scroll with Snap, Desktop: Grid */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto pb-8 px-2 md:overflow-visible no-scrollbar snap-x snap-mandatory">
              {filteredCourses.slice(0, 6).map(course => <CourseCard key={course.id} course={course} isMobileSnap={true} />)}
            </div>
          </div>
          
          <div className="mt-12 md:mt-20">
             <Footer />
          </div>
          <MobileBottomNav />
        </div>
      );
    }

    // --- BROWSE / LIST VIEW ---
    if (learnerView === 'browse') {
      const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
      const currentCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
      );

      // Reset page when filters change
      useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, selectedMode]);

      return (
        <div className="animate-in fade-in duration-300 pb-20 md:pb-0">
           <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
              <span className="cursor-pointer hover:text-orange-600" onClick={() => setLearnerView('home')}>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium text-gray-900">Browse Courses</span>
           </div>

           <div className="mb-8">
             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Course</h1>
             <SearchBar isCompact={true} />
             
             {/* Horizontal Category Filters */}
             <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                      selectedCategory === cat.name 
                        ? 'bg-orange-600 text-white border-orange-600' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
             </div>
           </div>

           {/* Results */}
           <div className="space-y-8 min-h-[500px]">
             {filteredCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {currentCourses.map(course => <CourseCard key={course.id} course={course} />)}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-12">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                           <button
                             key={i}
                             onClick={() => setCurrentPage(i + 1)}
                             className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                               currentPage === i + 1 
                                 ? 'bg-orange-600 text-white shadow-md' 
                                 : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                             }`}
                           >
                             {i + 1}
                           </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
             ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No courses found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedMode('All'); }}
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
             )}
           </div>
           
           <div className="mt-20">
             <Footer />
          </div>
          <MobileBottomNav />
        </div>
      );
    }

    // --- DETAILED VIEW ---
    if (learnerView === 'detail' && selectedCourse) {
      const teacher = teachers.find(t => t.id === selectedCourse.teacherId) || INITIAL_TEACHERS[0];

      return (
        <div className="animate-in slide-in-from-right-4 duration-300 pb-20 md:pb-0">
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <span className="cursor-pointer hover:text-orange-600" onClick={() => setLearnerView('home')}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="cursor-pointer hover:text-orange-600" onClick={() => setLearnerView('browse')}>Browse</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900 truncate max-w-[150px]">{selectedCourse.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
             {/* Left Column: Main Content */}
             <div className="lg:col-span-2 space-y-8">
                {/* Header Card */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-xl overflow-hidden relative">
                   <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl ${getGradient(selectedCourse.category)} opacity-10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none`}></div>
                   
                   <div className="relative z-10">
                     <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">{selectedCourse.category}</span>
                        <ModeBadge mode={selectedCourse.mode} />
                     </div>
                     <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{selectedCourse.title}</h1>
                     <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">{selectedCourse.description}</p>
                     
                     <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-2">
                           <Users className="w-4 h-4 text-orange-500" />
                           <span>{selectedCourse.students || 120}+ Enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Globe className="w-4 h-4 text-blue-500" />
                           <span>{selectedCourse.language || "English"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-green-500" />
                           <span>{selectedCourse.duration || "Self-paced"}</span>
                        </div>
                     </div>
                   </div>
                </div>

                {/* What you'll learn */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                   <h2 className="text-xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCourse.syllabus ? (
                         selectedCourse.syllabus.map((item, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <div className="mt-1 bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                              <span className="text-gray-700">{item}</span>
                           </div>
                         ))
                      ) : (
                         <p className="text-gray-500 italic">Syllabus details available upon request.</p>
                      )}
                   </div>
                </div>

                {/* Instructor Info */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                   <h2 className="text-xl font-bold text-gray-900 mb-6">About the Instructor</h2>
                   <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-gray-500 shrink-0">
                         {teacher.name.charAt(0)}
                      </div>
                      <div className="space-y-3">
                         <div>
                            <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                            <p className="text-orange-600 text-sm font-medium">{teacher.subject} Expert</p>
                         </div>
                         <p className="text-gray-600 text-sm leading-relaxed">{teacher.bio || "Passionate educator with years of experience."}</p>
                         <div className="flex gap-4 pt-2">
                            <div className="text-center">
                               <p className="font-bold text-gray-900">{selectedCourse.rating}</p>
                               <p className="text-[10px] uppercase text-gray-400 font-bold">Rating</p>
                            </div>
                            <div className="w-px bg-gray-200"></div>
                            <div className="text-center">
                               <p className="font-bold text-gray-900">{selectedCourse.reviews}</p>
                               <p className="text-[10px] uppercase text-gray-400 font-bold">Reviews</p>
                            </div>
                            <div className="w-px bg-gray-200"></div>
                            <div className="text-center">
                               <p className="font-bold text-gray-900">{selectedCourse.students}</p>
                               <p className="text-[10px] uppercase text-gray-400 font-bold">Students</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Sticky Sidebar */}
             <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                   <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                         <span className="text-3xl font-bold text-gray-900">{selectedCourse.price}</span>
                         {selectedCourse.mode === "Online" ? <Video className="text-blue-500" /> : <MapPin className="text-purple-500" />}
                      </div>
                      
                      <button 
                        onClick={() => { setModalType('enquire'); setIsModalOpen(true); }}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98] mb-4"
                      >
                         Enquire Now
                      </button>
                      <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                         <Heart className="w-4 h-4" /> Save to Wishlist
                      </button>

                      <div className="mt-6 space-y-4 text-sm text-gray-600 border-t border-gray-100 pt-6">
                         <div className="flex justify-between">
                            <span>Duration</span>
                            <span className="font-bold text-gray-900">{selectedCourse.duration}</span>
                         </div>
                         <div className="flex justify-between">
                            <span>Language</span>
                            <span className="font-bold text-gray-900">{selectedCourse.language}</span>
                         </div>
                         <div className="flex justify-between">
                            <span>Access</span>
                            <span className="font-bold text-gray-900">Mobile & Web</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex gap-3">
                         <Shield className="w-5 h-5 text-blue-600 shrink-0" />
                         <div>
                            <h4 className="font-bold text-blue-900 text-sm">Satisfaction Guarantee</h4>
                            <p className="text-xs text-blue-700 mt-1"> Verified teachers and transparent reviews ensure you get the best quality education.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <Footer />
          <MobileBottomNav />
        </div>
      );
    }
    
    // --- PROFILE VIEW (Placeholder for mobile nav) ---
    if (learnerView === 'profile') {
        return (
            <div className="flex items-center justify-center h-[60vh] text-center">
                <div>
                    <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
                    <p className="text-gray-500 mb-6">Manage your account and settings.</p>
                    <button onClick={handleLogout} className="text-red-600 font-medium hover:underline">Log Out</button>
                </div>
                <MobileBottomNav />
            </div>
        )
    }

    return null;
  };

  const TeacherView = () => {
    const [teacherView, setTeacherView] = useState('dashboard'); // 'dashboard', 'courses', 'enquiries'
    const myCourses = courses.filter(c => c.teacherId === 101); // Mock ID
    const myLeads = enquiries.filter(e => myCourses.some(c => c.id === e.courseId));
    
    const TeacherTabs = () => (
       <div className="flex overflow-x-auto space-x-1 bg-gray-100/50 p-1 rounded-xl mb-6 scrollbar-hide">
         {[
           { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
           { id: 'courses', label: 'My Courses', icon: BookOpen },
           { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setTeacherView(tab.id)}
             className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
               teacherView === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
             }`}
           >
             <tab.icon className="w-4 h-4" />
             {tab.label}
             {tab.id === 'enquiries' && myLeads.length > 0 && (
                <span className="ml-1 bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">{myLeads.length}</span>
             )}
           </button>
         ))}
       </div>
    );

    return (
      <div className="space-y-6 pb-20">
        <TeacherTabs />

        {/* --- TEACHER DASHBOARD --- */}
        {teacherView === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><BookOpen className="w-6 h-6" /></div>
                </div>
                <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{myCourses.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Users className="w-6 h-6" /></div>
                </div>
                <p className="text-gray-500 text-sm font-medium">Active Leads</p>
                <p className="text-3xl font-bold text-emerald-600">{myLeads.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
                </div>
                <p className="text-gray-500 text-sm font-medium">Pending Approval</p>
                <p className="text-3xl font-bold text-amber-500">{myCourses.filter(c => c.status === 'Pending').length}</p>
              </div>
            </div>
            
            {/* Recent Activity Mini-View */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {myLeads.slice(0, 3).map(lead => (
                   <div key={lead.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                     <div className="bg-blue-100 text-blue-600 p-2 rounded-full shrink-0">
                       <MessageSquare className="w-4 h-4" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-gray-900">New enquiry from <span className="font-bold">{lead.studentName}</span></p>
                       <p className="text-xs text-gray-500 mt-0.5">For {lead.courseTitle} • {lead.date}</p>
                     </div>
                   </div>
                ))}
              </div>
              <button onClick={() => setTeacherView('enquiries')} className="mt-4 w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        )}

        {/* --- TEACHER COURSES --- */}
        {teacherView === 'courses' && (
           <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
              <button 
                onClick={() => { setModalType('createCourse'); setIsModalOpen(true); }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" /> <span>Add New Course</span>
              </button>
            </div>
            
            {/* Mobile Card View for Courses */}
            <div className="block sm:hidden space-y-4">
              {myCourses.map(course => (
                 <div key={course.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold text-gray-900">{course.title}</h3>
                       <StatusBadge status={course.status} />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                       <span className="bg-gray-100 px-2 py-1 rounded">{course.category}</span>
                       <span className="bg-gray-100 px-2 py-1 rounded">{course.mode}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">{course.price}</div>
                 </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Course Title</th>
                      <th className="px-6 py-4">Mode</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {myCourses.map(course => (
                      <tr key={course.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                        <td className="px-6 py-4">
                           <span className={`text-xs px-2 py-1 rounded-full border ${course.mode === "Online" ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-purple-50 text-purple-700 border-purple-100"}`}>{course.mode}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{course.price}</td>
                        <td className="px-6 py-4"><StatusBadge status={course.status} /></td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TEACHER ENQUIRIES (NEW TAB) --- */}
        {teacherView === 'enquiries' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold text-gray-900">Student Enquiries</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               {myLeads.length > 0 ? (
                 <div className="divide-y divide-gray-100">
                   {myLeads.map(lead => (
                     <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                       <div className="flex flex-col md:flex-row gap-4">
                         {/* Student Info */}
                         <div className="md:w-1/4">
                           <div className="flex items-center gap-3 mb-2">
                             <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                               {lead.studentName.charAt(0)}
                             </div>
                             <div>
                               <h4 className="font-bold text-gray-900">{lead.studentName}</h4>
                               <p className="text-xs text-gray-500">{lead.date}</p>
                             </div>
                           </div>
                           <div className="space-y-1 text-sm text-gray-600">
                             <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {lead.email}</div>
                             <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {lead.phone || "Not provided"}</div>
                           </div>
                         </div>
                         
                         {/* Enquiry Details */}
                         <div className="flex-grow border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Re: {lead.courseTitle}</span>
                              <StatusBadge status={lead.status || 'New'} />
                            </div>
                            <p className="text-gray-700 italic bg-gray-50 p-4 rounded-lg border border-gray-100 mb-3">"{lead.message}"</p>
                            
                            <div className="flex gap-3 justify-end">
                              <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100">
                                <Trash2 className="w-4 h-4" /> Dismiss
                              </button>
                              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg shadow-sm">
                                <Mail className="w-4 h-4" /> Reply via Email
                              </a>
                            </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="p-12 text-center text-gray-400">
                   <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                   <p>No enquiries yet. Share your course to get started!</p>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const AdminView = () => {
    const [adminView, setAdminView] = useState('dashboard');
    const pendingCourses = courses.filter(c => c.status === 'Pending');

    const AdminTabs = () => (
       <div className="flex overflow-x-auto space-x-1 bg-gray-100/50 p-1 rounded-xl mb-6 scrollbar-hide">
         {[
           { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
           { id: 'teachers', label: 'Teachers', icon: Users },
           { id: 'courses', label: 'All Courses', icon: BookOpen },
           { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setAdminView(tab.id)}
             className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
               adminView === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
             }`}
           >
             <tab.icon className="w-4 h-4" />
             {tab.label}
           </button>
         ))}
       </div>
    );
    
    return (
      <div className="space-y-6 pb-20">
        <AdminTabs />

        {/* --- DASHBOARD VIEW --- */}
        {adminView === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col justify-between gap-2 h-full">
                  <div className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-lg w-fit">
                    <Users className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Total Teachers</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{teachers.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col justify-between gap-2 h-full">
                  <div className="p-2 md:p-3 bg-indigo-50 text-indigo-600 rounded-lg w-fit">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Total Courses</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{courses.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-lg text-gray-800">Course Approval Queue</h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">{pendingCourses.length} Pending</span>
              </div>
              
              {pendingCourses.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {pendingCourses.map(course => (
                    <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2 flex-grow">
                          <h4 className="font-bold text-lg text-gray-900">{course.title}</h4>
                          <p className="text-sm text-blue-600 font-medium">Instructor: {course.teacherName}</p>
                        </div>
                        <div className="flex items-center gap-3 pt-2 md:pt-0">
                          <button 
                            onClick={() => handleRejectCourse(course.id)}
                            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                          >
                            <X className="w-4 h-4 mr-2" /> Reject
                          </button>
                          <button 
                            onClick={() => handleApproveCourse(course.id)}
                            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors shadow-sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-400">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>All caught up! No courses pending approval.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const Modal = () => {
    if (!isModalOpen) return null;
    
    // Create Course Form
    if (modalType === 'createCourse') {
      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Create New Course</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleCreateCourse({
                  title: formData.get('title'),
                  description: formData.get('description'),
                  category: formData.get('category'),
                  mode: formData.get('mode'),
                  price: formData.get('price'),
                });
              }} 
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input required name="title" className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Class 10 Maths Tuition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                   <select name="category" className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none">
                     {CATEGORIES.filter(c => c.name !== "All").map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Class Mode</label>
                   <select name="mode" className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none">
                     <option value="Online">Online</option>
                     <option value="Offline">Offline / Direct</option>
                   </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required name="description" rows="6" className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none resize-none" placeholder="Syllabus covered, teaching style, location (if offline) etc." />
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Price / Fee Structure</label>
                 <input required name="price" className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none" placeholder="e.g. ₹500/hr or ₹2000/month" />
              </div>

              <div className="pt-2 flex gap-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                 <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 font-medium text-white hover:bg-blue-700 shadow-md shadow-blue-200">Submit</button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    // Enquiry Form
    if (modalType === 'enquire' && selectedCourse) {
       return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Enquire for Course</h3>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-sm text-blue-600 font-medium">{selectedCourse.title}</p>
                   <ModeBadge mode={selectedCourse.mode} />
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
             <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSendEnquiry({
                studentName: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
              });
            }} className="p-6 space-y-4">
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name</label>
                <input required name="name" defaultValue={currentUser?.name} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-blue-500 outline-none" placeholder="e.g. Rahul Kumar" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone / Email</label>
                <input required name="email" defaultValue={currentUser?.email} type="text" className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-blue-500 outline-none" placeholder="+91 98765..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message to Teacher</label>
                <textarea required name="message" rows="3" className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-blue-500 outline-none resize-none" placeholder="I am interested in..." />
              </div>
               <button type="submit" className="w-full py-3 rounded-lg bg-orange-600 font-bold text-white hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all transform active:scale-95">Send Enquiry</button>
            </form>
          </div>
        </div>
       );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navigation - Hidden on Mobile ONLY if user is a Learner (who has bottom nav) */}
      <nav className={`bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all duration-300 ${activeRole === 'learner' ? 'hidden md:block' : 'block'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveRole('learner'); setLearnerView('home'); setIsLoggedIn(false); }}>
              <div className="bg-orange-600 p-2 rounded-lg text-white shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Tutor<span className="text-orange-600">Connect</span><span className="text-xs text-gray-400 ml-1">India</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              {activeRole === 'learner' && (
                  <>
                    <button onClick={() => { setLearnerView('browse'); setSelectedCategory('All'); }} className={`transition-colors ${learnerView === 'browse' ? 'text-orange-600 font-bold' : 'hover:text-orange-600'}`}>Browse Courses</button>
                    <a href="#" className="hover:text-orange-600 transition-colors">Find Tutors</a>
                    <a href="#" className="hover:text-orange-600 transition-colors">About Us</a>
                    {!isLoggedIn && (
                      <button 
                        onClick={() => setActiveRole('login')}
                        className="ml-2 flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <LogIn className="w-4 h-4" /> Login
                      </button>
                    )}
                  </>
              )}
              {isLoggedIn && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <div className={`w-2 h-2 rounded-full ${currentUser?.role === 'admin' ? 'bg-purple-500' : currentUser?.role === 'teacher' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                      <span className="font-semibold text-gray-700">{currentUser?.name}</span>
                      <span className="text-gray-400">|</span>
                      <span className="uppercase text-gray-500 text-[10px] tracking-wide">{currentUser?.role}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
              )}
            </div>
            
            {/* Mobile Menu Button - Only visible on mobile if nav is visible */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg animate-in slide-in-from-top-2 z-50">
            <div className="px-4 py-3 space-y-3">
               {!isLoggedIn ? (
                 <>
                   <button onClick={() => { setLearnerView('browse'); setActiveRole('learner'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-orange-600 font-medium">Browse Courses</button>
                   <a href="#" className="block py-2 text-gray-600">Find Tutors</a>
                   <button 
                      onClick={() => { setActiveRole('login'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg mt-2"
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </button>
                 </>
               ) : (
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${currentUser?.role === 'admin' ? 'bg-purple-500' : currentUser?.role === 'teacher' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                         {currentUser?.name.charAt(0)}
                       </div>
                       <div>
                         <p className="font-bold text-gray-900">{currentUser?.name}</p>
                         <p className="text-xs text-gray-500 uppercase">{currentUser?.role}</p>
                       </div>
                    </div>
                    {/* Add explicit navigation for teachers on mobile */}
                    {currentUser?.role === 'teacher' && (
                        <div className="space-y-2">
                            <button onClick={() => { setIsMobileMenuOpen(false); }} className="w-full text-left py-2 text-gray-600 hover:text-orange-600">Dashboard</button>
                            <button onClick={() => { setIsMobileMenuOpen(false); }} className="w-full text-left py-2 text-gray-600 hover:text-orange-600">My Courses</button>
                        </div>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 font-medium w-full py-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                 </div>
               )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto md:px-8 py-6 md:py-8">
        {activeRole === 'learner' && <LearnerView />}
        {activeRole === 'login' && <LoginView />}
        {activeRole === 'teacher' && <TeacherView />}
        {activeRole === 'admin' && <AdminView />}
      </main>

      {/* Modals */}
      <Modal />

    </div>
  );
}

// Helpers
function getGradient(category) {
   switch(category) {
     case 'Competitive Exams': return 'from-orange-400 to-red-600';
     case 'Languages': return 'from-emerald-400 to-emerald-600';
     case 'Music & Dance': return 'from-purple-400 to-pink-600';
     case 'IT & Coding': return 'from-blue-400 to-indigo-600';
     case 'School Tuitions': return 'from-cyan-400 to-blue-500';
     default: return 'from-gray-400 to-gray-600';
   }
}