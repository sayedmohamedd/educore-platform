"use client";

import { useState } from "react";
import { Bell, Lock, Mail, Phone, Save, User } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "",
    title: "Backend Developer",
    expertise: "NestJS, Prisma, PostgreSQL",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    courseApproved: true,
    courseRejected: true,
    assignmentGraded: true,
    newCourse: false,
    walletRecharged: true,
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNotification = (
    field: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePassword = (field: keyof typeof password, value: string) => {
    setPassword((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Profile:", profile);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password:", password);
  };

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700">Settings</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, security and notification preferences.
        </p>
      </header>

      <div className="max-w-5xl space-y-6">
        {/* Profile */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">
                Profile Information
              </h3>

              <p className="text-sm text-muted-foreground">
                Update your personal and professional information.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  value={profile.fullName}
                  onChange={(e) => updateProfile("fullName", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={profile.phone}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Professional Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Professional Title
                </label>

                <input
                  value={profile.title}
                  onChange={(e) => updateProfile("title", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. Backend Developer"
                />
              </div>

              {/* Expertise */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Expertise
                </label>

                <input
                  value={profile.expertise}
                  onChange={(e) => updateProfile("expertise", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. NestJS, Prisma, PostgreSQL"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bio
                </label>

                <textarea
                  value={profile.bio}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Tell students about yourself..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary sm:w-auto"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Security */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">Security</h3>

              <p className="text-sm text-muted-foreground">
                Change your account password.
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Current Password */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Current Password
                </label>

                <input
                  type="password"
                  value={password.currentPassword}
                  onChange={(e) =>
                    updatePassword("currentPassword", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
                </label>

                <input
                  type="password"
                  value={password.newPassword}
                  onChange={(e) =>
                    updatePassword("newPassword", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    updatePassword("confirmPassword", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary sm:w-auto"
              >
                <Lock size={17} />
                Update Password
              </button>
            </div>
          </form>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bell size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">
                Notifications
              </h3>

              <p className="text-sm text-muted-foreground">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            <NotificationItem
              title="Course Approved"
              description="Notify me when my course is approved."
              checked={notifications.courseApproved}
              onChange={(value) => updateNotification("courseApproved", value)}
            />

            <NotificationItem
              title="Course Rejected"
              description="Notify me when my course is rejected."
              checked={notifications.courseRejected}
              onChange={(value) => updateNotification("courseRejected", value)}
            />

            <NotificationItem
              title="Assignment Graded"
              description="Notify me when a student's assignment is graded."
              checked={notifications.assignmentGraded}
              onChange={(value) =>
                updateNotification("assignmentGraded", value)
              }
            />

            <NotificationItem
              title="New Course"
              description="Notify me about newly published courses."
              checked={notifications.newCourse}
              onChange={(value) => updateNotification("newCourse", value)}
            />

            <NotificationItem
              title="Wallet Recharged"
              description="Notify me when money is added to my wallet."
              checked={notifications.walletRecharged}
              onChange={(value) => updateNotification("walletRecharged", value)}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

interface NotificationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const NotificationItem = ({
  title,
  description,
  checked,
  onChange,
}: NotificationItemProps) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-700">{title}</p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-primary" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </label>
  );
};

export default Settings;
