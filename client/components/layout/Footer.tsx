import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white" dir="rtl">
      <div className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        {/* Logo */}
        <div>
          <h2 className="mb-5 text-3xl font-bold">EDUCore</h2>

          <p className="leading-7 text-slate-400">
            منصة تعليمية متكاملة تساعدك على تطوير مهاراتك من خلال دورات احترافية
            يقدمها أفضل الخبراء في مختلف المجالات.
          </p>
        </div>

        {/* روابط المنصة */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">المنصة</h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <Link href="/courses" className="hover:text-white transition">
                تصفح الدورات
              </Link>
            </li>

            <li>
              <Link href="/mentors" className="hover:text-white transition">
                المدربون
              </Link>
            </li>

            <li>
              <Link href="/pricing" className="hover:text-white transition">
                الباقات والأسعار
              </Link>
            </li>
          </ul>
        </div>

        {/* الشركة */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">الشركة</h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <Link href="/about" className="hover:text-white transition">
                من نحن
              </Link>
            </li>

            <li>
              <Link href="/careers" className="hover:text-white transition">
                الوظائف
              </Link>
            </li>

            <li>
              <Link href="/blog" className="hover:text-white transition">
                المدونة
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white transition">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* السوشيال */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">تابعنا</h3>

          <div className="flex gap-4">
            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-primary"
            >
              <LinkIcon size={20} />
            </Link>

            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-primary"
            >
              <LinkIcon size={20} />
            </Link>

            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-primary"
            >
              <LinkIcon size={20} />
            </Link>

            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-primary"
            >
              <LinkIcon size={20} />
            </Link>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">
            تابع آخر الدورات والعروض والأخبار أولاً بأول.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} EDUCore. جميع الحقوق محفوظة.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              سياسة الخصوصية
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              الشروط والأحكام
            </Link>

            <Link href="/cookies" className="hover:text-white transition">
              سياسة ملفات الارتباط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
