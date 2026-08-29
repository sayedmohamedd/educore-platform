"use client";

import { useState } from "react";
import {
  Bell,
  Globe,
  Lock,
  Mail,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  User,
} from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "Admin User",
    email: "admin@example.com",
  });

  const [platform, setPlatform] = useState({
    platformName: "EduCore",
    supportEmail: "support@educore.com",
    currency: "EGP",
    maintenanceMode: false,
  });

  const [notifications, setNotifications] = useState({
    newTeacher: true,
    courseSubmitted: true,
    paymentSubmitted: true,
    withdrawalRequested: true,
    systemUpdates: true,
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

  const updatePlatform = (
    field: keyof typeof platform,
    value: string | boolean,
  ) => {
    setPlatform((prev) => ({
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

    console.log("Admin Profile:", profile);
  };

  const handlePlatformSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Platform Settings:", platform);
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
          Manage your account, platform configuration and system preferences.
        </p>
      </header>

      <div className="max-w-5xl space-y-6">
        {/* Admin Profile */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">
                Admin Profile
              </h3>

              <p className="text-sm text-muted-foreground">
                Manage your administrator account information.
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

        {/* Platform Settings */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">
                Platform Settings
              </h3>

              <p className="text-sm text-muted-foreground">
                Configure general settings for the platform.
              </p>
            </div>
          </div>

          <form onSubmit={handlePlatformSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Platform Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Platform Name
                </label>

                <input
                  value={platform.platformName}
                  onChange={(e) =>
                    updatePlatform("platformName", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Platform name"
                />
              </div>

              {/* Support Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Support Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={platform.supportEmail}
                    onChange={(e) =>
                      updatePlatform("supportEmail", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="support@example.com"
                  />
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Default Currency
                </label>

                <select
                  value={platform.currency}
                  onChange={(e) => updatePlatform("currency", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="EGP">EGP - Egyptian Pound</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              {/* Maintenance Mode */}
              <div className="flex items-end">
                <div className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Maintenance Mode
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Temporarily disable public access to the platform.
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={platform.maintenanceMode}
                    onClick={() =>
                      updatePlatform(
                        "maintenanceMode",
                        !platform.maintenanceMode,
                      )
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      platform.maintenanceMode ? "bg-primary" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        platform.maintenanceMode ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary sm:w-auto"
              >
                <Save size={17} />
                Save Settings
              </button>
            </div>
          </form>
        </section>

        {/* Security */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">Security</h3>

              <p className="text-sm text-muted-foreground">
                Keep your administrator account secure.
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
                Admin Notifications
              </h3>

              <p className="text-sm text-muted-foreground">
                Choose which system events you want to be notified about.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            <NotificationItem
              title="New Teacher Registration"
              description="Notify me when a new teacher registers."
              checked={notifications.newTeacher}
              onChange={(value) => updateNotification("newTeacher", value)}
            />

            <NotificationItem
              title="Course Submitted"
              description="Notify me when a teacher submits a course for review."
              checked={notifications.courseSubmitted}
              onChange={(value) => updateNotification("courseSubmitted", value)}
            />

            <NotificationItem
              title="Payment Submitted"
              description="Notify me when a student submits a payment."
              checked={notifications.paymentSubmitted}
              onChange={(value) =>
                updateNotification("paymentSubmitted", value)
              }
            />

            <NotificationItem
              title="Withdrawal Request"
              description="Notify me when a teacher requests a withdrawal."
              checked={notifications.withdrawalRequested}
              onChange={(value) =>
                updateNotification("withdrawalRequested", value)
              }
            />

            <NotificationItem
              title="System Updates"
              description="Receive important platform and system updates."
              checked={notifications.systemUpdates}
              onChange={(value) => updateNotification("systemUpdates", value)}
            />
          </div>
        </section>

        {/* Admin Access */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <SettingsIcon size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-amber-800">
                Administrator Access
              </h3>

              <p className="mt-1 text-sm leading-6 text-amber-700">
                These settings affect the entire platform. Make sure you
                understand the impact before changing platform-wide options.
              </p>
            </div>
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
    <div className="flex items-center justify-between gap-4 py-4">
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
    </div>
  );
};

export default Settings;
