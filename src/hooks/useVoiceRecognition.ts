import 'regenerator-runtime/runtime'
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
    }
  }, [browserSupportsSpeechRecognition]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: false, language: "en-US" });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return { transcript, isListening, startListening, stopListening, resetTranscript };
};

export default useVoiceRecognition;
