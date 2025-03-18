import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/connected/app-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useTheme } from "../../../ThemeProvider";
import { Sun, Moon } from "lucide-react";
import VoiceSearch from "./voice-search";

function Dashboard() {
  const navigate = useNavigate();
  const dummyProfilePicture = "https://i.pravatar.cc/150?img=3"; // Dummy profile picture URL
  const dummyUserName = "John Doe"; // Static user name

  const { theme, toggleTheme } = useTheme();

  const handleSearch = (query: string) => {
    if (!query.trim()) return; // Prevent empty searches

    console.log("User searched for:", query);

    // Convert query to lowercase for case-insensitive matching
    const lowerCaseQuery = query.toLowerCase();

    // ✅ Perform search logic (e.g., API call, filtering results)
    if (
      lowerCaseQuery.includes("upload") ||
      lowerCaseQuery.includes("add") ||
      lowerCaseQuery.includes("uploading") ||
      lowerCaseQuery.includes("upload-document") ||
      lowerCaseQuery.includes("uploading")
    ) {
      navigate("/upload");
    } else if (
      lowerCaseQuery.includes("profile") ||
      lowerCaseQuery.includes("user") ||
      lowerCaseQuery.includes("account") ||
      lowerCaseQuery.includes("settings") ||
      lowerCaseQuery.includes("profilesettings") ||
      lowerCaseQuery.includes("profile-settings") ||
      lowerCaseQuery.includes("user-settings") ||
      lowerCaseQuery.includes("usersettings") ||
      lowerCaseQuery.includes("account-settings") ||
      lowerCaseQuery.includes("accountsettings") ||
      lowerCaseQuery.includes("savedsignature") ||
      lowerCaseQuery.includes("saved") ||
      lowerCaseQuery.includes("signed-document") ||
      lowerCaseQuery.includes("usersettings") ||
      lowerCaseQuery.includes("account-settings") ||
      lowerCaseQuery.includes("accountsettings")
    ) {
      navigate("/profile");
    } else if (
      lowerCaseQuery.includes("sign") ||
      lowerCaseQuery.includes("signature") ||
      lowerCaseQuery.includes("signing") ||
      lowerCaseQuery.includes("requestsignature") ||
      lowerCaseQuery.includes("signingrequest") ||
      lowerCaseQuery.includes("signing-request")
    ) {
      navigate("/sign");
    } else if (
      lowerCaseQuery.includes("dash") ||
      lowerCaseQuery.includes("home") ||
      lowerCaseQuery.includes("main") ||
      lowerCaseQuery.includes("board") ||
      lowerCaseQuery.includes("dashboard")
    ) {
      navigate("/dashboard");
    } else {
      console.log("No matching route found for:", query);
    }
  };

  // 🔹 Auto-trigger search when voice input is detected

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b w-full px-4 justify-between">
            {/* Left Side: Sidebar & Search */}
            <div className="flex items-center gap-2 w-full">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            {/* Right Side: Dummy User Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => navigate("/profile")}
            >
              <Avatar className="w-10 h-10 border flex-shrink-0">
                <AvatarImage src={dummyProfilePicture} alt="User Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-gray-700 font-medium whitespace-nowrap">
                {dummyUserName}
              </span>
            </motion.div>
            <button onClick={toggleTheme} className="p-2 rounded-md">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <VoiceSearch onSearch={handleSearch} />
          </header>

          {/* Main Content */}
          <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-10 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)] p-4">
            <Outlet />
          </section>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

const AuthenticatedDashboard = Dashboard;

export default AuthenticatedDashboard;
