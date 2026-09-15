import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="bg-homeBg">
      {/* Hero */}
      <section className="bg-primary py-20 text-white">
        <div className="container text-center">
          <h1 className="text-4xl font-bold md:text-5xl">تواصل معنا</h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/80">
            عندك سؤال أو محتاج مساعدة؟ ابعتلنا وهنكون سعداء نساعدك.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="text-2xl font-bold text-secondary">تواصل معنا</h2>

            <p className="mt-3 leading-7 text-muted">
              لو عندك أي استفسار عن الكورسات، التسجيل، الدفع أو حسابك، تقدر
              تتواصل معانا من خلال أي وسيلة من دول.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-slate-700">
                    البريد الإلكتروني
                  </p>
                  <p className="mt-1 text-sm text-muted">support@educore.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-slate-700">رقم الهاتف</p>
                  <p className="mt-1 text-sm text-muted" dir="ltr">
                    +20 100 000 0000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-slate-700">موقعنا</p>
                  <p className="mt-1 text-sm text-muted">القاهرة، مصر</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-secondary">ابعتلنا رسالة</h2>

            <p className="mt-2 text-muted">
              املأ البيانات دي وهنراجع رسالتك ونرد عليك في أقرب وقت.
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    الاسم
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="اكتب اسمك"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    البريد الإلكتروني
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    dir="ltr"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  الموضوع
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="موضوع الرسالة"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  الرسالة
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-8"
              >
                <Send className="size-5" />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
