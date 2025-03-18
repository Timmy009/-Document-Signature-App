import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMyUploads } from "@/hooks/courses";
import QuickActions from "./quick-actions";


import RecentDocuments from "./recent-document";
import SignatureFlow from "./signature-flow";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { uploads, isLoading } = useMyUploads({});
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Simulate a delay before showing recent documents
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full"
      >
        {/* Signature Flow */}
        <SignatureFlow />

        {/* Quick Actions */}
        <QuickActions navigate={navigate} />

        {/* Recent Uploads */}
        <RecentDocuments uploads={uploads} isLoading={isLoading} showSkeleton={showSkeleton} navigate={navigate} />
      </motion.div>
    </div>
  );
};

export default HomeScreen;
