const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <h1 className="text-2xl font-bold text-foreground">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        {/* Notifications */}
        {/* User Menu */}
      </div>
    </header>
  );
};

export default DashboardHeader;