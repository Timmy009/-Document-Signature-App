import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";

const VoiceSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecognition();
  const [fullQuery, setFullQuery] = useState(""); // Store the full voice input

  useEffect(() => {
    if (transcript) {
      setFullQuery(transcript); // ✅ Update query in real-time
      onSearch(transcript);
    }
  }, [transcript]);

  return (
    <div className="">
      {/* <Input type="text" value={fullQuery} readOnly placeholder="Search by voice..." /> */}

      <Button onClick={isListening ? stopListening : startListening}>
        {isListening ? <Mic size={20} /> : <MicOff size={20} />}
      </Button>
    </div>
  );
};

export default VoiceSearch;
