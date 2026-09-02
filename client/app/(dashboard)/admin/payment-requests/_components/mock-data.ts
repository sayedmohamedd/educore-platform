export const mockPaymentRequests = [
  {
    id: "pay_001",
    student: {
      id: "user_001",
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
    },
    course: {
      id: "course_001",
      title: "Complete React & Next.js Course",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    },
    amount: 750,
    currency: "EGP",
    paymentMethod: "INSTAPAY",
    transferReference: "IP-78439215",
    transferDate: "2026-09-01T10:30:00",
    submittedAt: "2026-09-01T10:45:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Instapay+Receipt",
    note: "تم التحويل من حسابي الشخصي.",
    status: "PENDING",
  },

  {
    id: "pay_002",
    student: {
      id: "user_002",
      name: "Mohamed Ali",
      email: "mohamed@example.com",
    },
    course: {
      id: "course_002",
      title: "NestJS Backend Development",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    },
    amount: 900,
    currency: "EGP",
    paymentMethod: "BANK_TRANSFER",
    transferReference: "BT-29384711",
    transferDate: "2026-08-31T14:20:00",
    submittedAt: "2026-08-31T14:35:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Bank+Transfer+Receipt",
    note: "يرجى مراجعة التحويل.",
    status: "PENDING",
  },

  {
    id: "pay_003",
    student: {
      id: "user_003",
      name: "Omar Hassan",
      email: "omar@example.com",
    },
    course: {
      id: "course_003",
      title: "Database Design & SQL",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    },
    amount: 600,
    currency: "EGP",
    paymentMethod: "INSTAPAY",
    transferReference: "IP-39284722",
    transferDate: "2026-08-30T11:10:00",
    submittedAt: "2026-08-30T11:25:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Instapay+Receipt",
    status: "APPROVED",
  },

  {
    id: "pay_004",
    student: {
      id: "user_004",
      name: "Youssef Adel",
      email: "youssef@example.com",
    },
    course: {
      id: "course_004",
      title: "TypeScript From Zero to Advanced",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    },
    amount: 500,
    currency: "EGP",
    paymentMethod: "WALLET",
    transferReference: "WL-92837461",
    transferDate: "2026-08-29T17:40:00",
    submittedAt: "2026-08-29T18:00:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Wallet+Receipt",
    status: "REJECTED",
    rejectionReason: "قيمة التحويل لا تطابق قيمة الكورس.",
  },

  {
    id: "pay_005",
    student: {
      id: "user_005",
      name: "Karim Samir",
      email: "karim@example.com",
    },
    course: {
      id: "course_005",
      title: "Advanced JavaScript",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    },
    amount: 700,
    currency: "EGP",
    paymentMethod: "INSTAPAY",
    transferReference: "IP-56382917",
    transferDate: "2026-08-28T09:15:00",
    submittedAt: "2026-08-28T09:30:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Instapay+Receipt",
    status: "APPROVED",
  },

  {
    id: "pay_006",
    student: {
      id: "user_006",
      name: "Mostafa Ahmed",
      email: "mostafa@example.com",
    },
    course: {
      id: "course_006",
      title: "Clean Code & Software Architecture",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    },
    amount: 850,
    currency: "EGP",
    paymentMethod: "BANK_TRANSFER",
    transferReference: "BT-71829364",
    transferDate: "2026-08-27T13:50:00",
    submittedAt: "2026-08-27T14:05:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Bank+Transfer+Receipt",
    status: "PENDING",
  },

  {
    id: "pay_007",
    student: {
      id: "user_007",
      name: "Abdelrahman Khaled",
      email: "abd@example.com",
    },
    course: {
      id: "course_007",
      title: "Git & GitHub for Developers",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
    },
    amount: 400,
    currency: "EGP",
    paymentMethod: "INSTAPAY",
    transferReference: "IP-18273645",
    transferDate: "2026-08-26T16:30:00",
    submittedAt: "2026-08-26T16:45:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Instapay+Receipt",
    status: "APPROVED",
  },

  {
    id: "pay_008",
    student: {
      id: "user_008",
      name: "Mahmoud Tarek",
      email: "mahmoud@example.com",
    },
    course: {
      id: "course_008",
      title: "Full Stack Web Development",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    },
    amount: 1200,
    currency: "EGP",
    paymentMethod: "BANK_TRANSFER",
    transferReference: "BT-47382910",
    transferDate: "2026-08-25T12:10:00",
    submittedAt: "2026-08-25T12:25:00",
    receiptUrl: "https://placehold.co/900x1200/png?text=Bank+Transfer+Receipt",
    status: "REJECTED",
    rejectionReason: "الإيصال المرفق غير واضح.",
  },
];
