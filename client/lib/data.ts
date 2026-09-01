import {
  ArrowLeftRight,
  Book,
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
  Image,
  Info,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Star,
  Wallet,
} from "lucide-react";

export const mentors = [
  {
    id: 1,
    name: "Sayed",
    image: "/mentors/sayed.jpeg",
    role: "Software Engineer at TechCorp",
    rating: 4.5,
    numReviews: 5000,
  },
  {
    id: 2,
    name: "Sayed",
    image: "/mentors/sayed.jpeg",
    role: "Software Engineer at TechCorp",
    rating: 4.5,
    numReviews: 5000,
  },
  {
    id: 3,
    name: "Sayed",
    image: "/mentors/sayed.jpeg",
    role: "Software Engineer at TechCorp",
    rating: 4.5,
    numReviews: 5000,
  },
  {
    id: 4,
    name: "Sayed",
    image: "/mentors/sayed.jpeg",
    role: "Software Engineer at TechCorp",
    rating: 4.5,
    numReviews: 5000,
  },
];

export const courses = [
  {
    id: 1,
    image: "/courses/online-course.jpg",
    title: "Advanced UI/UX Design Systems",
    description:
      "Master modern UI patterns and design systems using Figma and React.",
    students: 1248,
    status: "published" as const,
  },
  {
    id: 2,
    image: "/courses/online-course.jpg",
    title: "Advanced UI/UX Design Systems",
    description:
      "Master modern UI patterns and design systems using Figma and React.",
    students: 1248,
    status: "published" as const,
  },
  {
    id: 3,
    image: "/courses/online-course.jpg",
    title: "Advanced UI/UX Design Systems",
    description:
      "Master modern UI patterns and design systems using Figma and React.",
    students: 1248,
    status: "published" as const,
  },
  {
    id: 4,
    image: "/courses/online-course.jpg",
    title: "Advanced UI/UX Design Systems",
    description:
      "Master modern UI patterns and design systems using Figma and React.",
    students: 1248,
    status: "published" as const,
  },
  {
    id: 5,
    image: "/courses/online-course.jpg",
    title: "Advanced UI/UX Design Systems",
    description:
      "Master modern UI patterns and design systems using Figma and React.",
    students: 1248,
    status: "published" as const,
  },
];

export const stats = [
  {
    count: "250K+",
    text: "طالب نشط",
  },
  {
    count: "1.5K+",
    text: "دورة تدريبية",
  },
  {
    count: "1.2K+",
    text: "شهادة مُنجزة",
  },
  {
    count: "150+",
    text: "مدرب محترف",
  },
];

export const studentOpinions = [
  {
    studentName: "Sarah Johnson",
    content:
      "This platform has completely transformed the way I learn. The courses are engaging, and the mentors are incredibly supportive. I've gained skills that have opened up new career opportunities for me.",
  },
  {
    studentName: "Michael Smith",
    content:
      "I was skeptical at first, but after enrolling in a few courses, I can confidently say that this platform delivers on its promises. The content is top-notch, and the community of learners is inspiring.",
  },
  {
    studentName: "Emily Davis",
    content:
      "The hands-on projects and real-world applications in the courses have been invaluable. I've not only learned new skills but also built a portfolio that showcases my abilities to potential employers.",
  },
];

export const commonQuestions = [
  {
    title: "ما هي منصة EDUCore؟",
    content:
      "EDUCore هي منصة تعليمية متكاملة توفر دورات احترافية في مختلف المجالات، وتساعد الطلاب على اكتساب المهارات المطلوبة في سوق العمل من خلال محتوى عملي ومدربين متخصصين.",
  },
  {
    title: "كيف يمكنني التسجيل؟",
    content:
      "يمكنك تصفح الدورات المتاحة، ثم اختيار الدورة المناسبة والضغط على زر «الالتحاق بالدورة». بعد إتمام عملية التسجيل والدفع (إن وجدت)، ستتمكن من الوصول إلى محتوى الدورة مباشرة.",
  },
  {
    title: "ما هي وسائل الدفع المتوفرة؟",
    content:
      "نوفر عدة وسائل دفع آمنة، مثل البطاقات البنكية والمحافظ الإلكترونية ووسائل الدفع المحلية، مع إمكانية إضافة وسائل دفع أخرى حسب الدولة.",
  },
];

export type Tab = {
  label: string;
  Icon?: LucideIcon;
  value?: string;
};

export const tabs: Tab[] = [
  {
    label: "General Info",
    Icon: Info,
  },
  {
    label: "Curriculum",
    Icon: Book,
  },
  {
    label: "Media",
    Icon: Image,
  },
  {
    label: "Assessments",
    Icon: BookOpen,
  },
  {
    label: "Reviews",
    Icon: Star,
  },
  {
    label: "Settings",
    Icon: Settings,
  },
];

export const tableData = [
  {
    id: "#TRX-1025",
    user: "John Doe",
    role: "Student",
    amount: "$99.00",
    payment: "Visa",
    date: "29 Jul 2026",
    status: "Pending",
  },
  {
    id: "#TRX-1024",
    user: "Ahmed Ali",
    role: "Teacher",
    amount: "$149.00",
    payment: "Mastercard",
    date: "28 Jul 2026",
    status: "Completed",
  },
  {
    id: "#TRX-1023",
    user: "Sarah Smith",
    role: "Student",
    amount: "$79.00",
    payment: "PayPal",
    date: "27 Jul 2026",
    status: "Rejected",
  },
];

export const menuItems = {
  admin: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: FileText,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: FileText,
    },
    {
      title: "Courses",
      href: "/admin/courses",
      icon: GraduationCap,
    },
    {
      title: "Payment Requests",
      href: "/admin/payment-requests",
      icon: CreditCard,
    },
    {
      title: "Transactions",
      href: "/admin/transactions",
      icon: ArrowLeftRight,
    },
    // {
    //   title: "Messages",
    //   href: "/admin/messages",
    //   icon: MessagesSquare,
    // },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ],
  instructor: [
    {
      title: "Dashboard",
      href: "/teacher",
      icon: LayoutDashboard,
    },
    {
      title: "students",
      href: "/teacher/students",
      icon: GraduationCap,
    },
    {
      title: "Courses",
      href: "/teacher/courses?status=ALL",
      icon: GraduationCap,
    },
    {
      title: "Wallet",
      href: "/teacher/wallet",
      icon: Wallet,
    },
    {
      title: "Settings",
      href: "/teacher/settings",
      icon: Settings,
    },
  ],
};

export const categories = [
  {
    title: "UI/UX Design",
    number: 42,
  },
  {
    title: "Backend Development",
    number: 42,
  },
  {
    title: "Frontend Development",
    number: 42,
  },
  {
    title: "Physics",
    number: 42,
  },
  {
    title: "Chemistry",
    number: 42,
  },
  {
    title: "Data Science",
    number: 42,
  },
  {
    title: "Python",
    number: 42,
  },
  {
    title: "SEO",
    number: 42,
  },
  {
    title: "Prompt Engineering",
    number: 42,
  },
];

export const quizQuestions = [
  {
    id: "1",
    text: "Which of the following best describes the purpose of a database index?",
    options: [
      "To reduce the size of the database",
      "To make data retrieval faster",
      "To encrypt database records",
      "To automatically backup the database",
    ],
    correctAnswer: 1,
  },
  {
    id: "2",
    text: "Which HTTP method is commonly used to create a new resource?",
    options: ["GET", "PATCH", "POST", "DELETE"],
    correctAnswer: 2,
  },
  {
    id: "3",
    text: "Which of these is a relational database?",
    options: ["MongoDB", "PostgreSQL", "Redis", "Firebase"],
    correctAnswer: 1,
  },
];
