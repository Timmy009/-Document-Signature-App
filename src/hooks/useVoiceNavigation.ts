import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";

const useVoiceNavigation = () => {
  const navigate = useNavigate();
  const { transcript, startListening, stopListening, isListening, resetTranscript } = useVoiceRecognition();

  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();

    if (lowerTranscript.includes("go to dashboard")) {
      navigate("/dashboard");
    } else if (lowerTranscript.includes("open profile")) {
      navigate("/profile");
    } else if (lowerTranscript.includes("open settings")) {
      navigate("/settings");
    }

    resetTranscript(); // Reset after navigation
  }, [transcript, navigate, resetTranscript]);

  return { startListening, stopListening, isListening };
};

export default useVoiceNavigation;
