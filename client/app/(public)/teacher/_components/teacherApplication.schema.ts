import { z } from "zod";

export const teacherApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل"),

  email: z.string().trim().email("البريد الإلكتروني غير صحيح"),

  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),

  title: z.string().trim().min(2, "أدخل المسمى المهني"),

  expertise: z.string().trim().min(2, "أدخل مجال تخصصك"),

  phone: z.string().trim().min(10, "رقم الهاتف غير صحيح"),

  bio: z
    .string()
    .trim()
    .min(30, "النبذة يجب أن تكون 30 حرفًا على الأقل")
    .max(1000, "النبذة طويلة جدًا"),
});

export type TeacherApplicationSchema = z.infer<typeof teacherApplicationSchema>;
