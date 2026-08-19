import { LogOut } from "lucide-react";
import { useLogout } from "./hooks/useLogout";

const LogoutButton = () => {
  const { signout } = useLogout();

  return (
    <button className="pt-5 flex-center gap-2">
      <p
        onClick={() => signout()}
        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-muted-foreground dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
      >
        Sign out
      </p>
      <LogOut size={20} className="text-muted-foreground" />
    </button>
  );
};

export default LogoutButton;
