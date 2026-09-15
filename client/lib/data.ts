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
    studentName: "سارة أحمد",
    content:
      "بجد المنصة فرقت معايا جدًا في طريقة التعلم. الكورسات شرحها حلو ومش مملة، والمدرسين متعاونين جدًا لو وقفت قدام حاجة. اتعلمت حاجات جديدة وقدرت أستخدمها في شغلي.",
  },
  {
    studentName: "محمد علي",
    content:
      "في الأول كنت متردد أجرب، بس بعد ما اشتركت في كذا كورس اتفاجئت إن المحتوى كويس جدًا والشرح واضح. أكتر حاجة عجبتني إنك بتحس إنك بتتعلم حاجة مفيدة فعلًا ومش مجرد كلام نظري.",
  },
  {
    studentName: "منة خالد",
    content:
      "أكتر حاجة عجبتني هي المشاريع العملية. بدل ما أفضل أذاكر وخلاص، بقيت بطبق اللي بتعلمه بإيدي، وفي الآخر قدرت أعمل كذا مشروع أضيفهم للـ portfolio بتاعي.",
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
    {
      title: "Wallet",
      href: "/admin/wallet",
      icon: Wallet,
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
