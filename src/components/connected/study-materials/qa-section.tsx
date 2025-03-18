import { useState, useEffect, useRef } from "react";
import { Text } from "@/components/typography/Text/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Send, User, Bot, MessageCircle, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type QAItem = {
  question: string;
  answer: string;
  isUser?: boolean;
};

interface QASectionProps {
  qaList: QAItem[];
  setQaList: React.Dispatch<React.SetStateAction<QAItem[]>>;
}

// Supported Languages
const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
];

// Suggested Questions
const suggestedQuestions = [
  "What is the deadline?",
  "Who is the project lead?",
  "What is the total budget?",
];

// Mock API Translation Function
const translateText = async (text: string, language: string) => {
  const translations: Record<string, Record<string, string>> = {
    fr: {
      "The deadline depends on the project timeline. Have you set any milestones?":
        "La date limite dépend du calendrier du projet. Avez-vous défini des jalons ?",
      "Budgets are usually planned based on resources, tools, and labor costs.":
        "Les budgets sont généralement planifiés en fonction des ressources, des outils et des coûts de main-d'œuvre.",
      "The project lead is typically responsible for managing tasks and deadlines.":
        "Le chef de projet est généralement responsable de la gestion des tâches et des délais.",
    },
    es: {
      "The deadline depends on the project timeline. Have you set any milestones?":
        "La fecha límite depende del cronograma del proyecto. ¿Has establecido hitos?",
      "Budgets are usually planned based on resources, tools, and labor costs.":
        "Los presupuestos generalmente se planifican en función de los recursos, las herramientas y los costos laborales.",
      "The project lead is typically responsible for managing tasks and deadlines.":
        "El líder del proyecto suele ser responsable de gestionar tareas y plazos.",
    },
    de: {
      "The deadline depends on the project timeline. Have you set any milestones?":
        "Die Frist hängt vom Projektzeitplan ab. Haben Sie Meilensteine gesetzt?",
      "Budgets are usually planned based on resources, tools, and labor costs.":
        "Budgets werden normalerweise basierend auf Ressourcen, Tools und Arbeitskosten geplant.",
      "The project lead is typically responsible for managing tasks and deadlines.":
        "Der Projektleiter ist in der Regel für die Verwaltung von Aufgaben und Fristen verantwortlich.",
    },
  };

  return translations[language]?.[text] || text; // ✅ Returns the translation if it exists, otherwise keeps the original text
};

const QASection: React.FC<QASectionProps> = ({ qaList, setQaList }) => {
  const [question, setQuestion] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language is English
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Load saved language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) setLanguage(savedLang);
  }, []);

  // ✅ Auto-scroll when messages update
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [qaList]);

  // ✅ Handle asking a question
  const handleAskQuestion = async (query: string) => {
    if (!query.trim()) return;

    // Add user message
    setQaList((prev) => [
      ...prev,
      { question: query, answer: "", isUser: true },
    ]);
    setAiTyping(true);
    setQuestion("");

    setTimeout(async () => {
      let answer = "Hmm... that's interesting! But I might need more details.";

      // ✅ Expanded AI Knowledge
      if (query.toLowerCase().includes("deadline")) {
        answer =
          "The deadline depends on the project timeline. Have you set any milestones?";
      } else if (query.toLowerCase().includes("budget")) {
        answer =
          "Budgets are usually planned based on resources, tools, and labor costs.";
      } else if (query.toLowerCase().includes("project lead")) {
        answer =
          "The project lead is typically responsible for managing tasks and deadlines.";
      } else if (query.toLowerCase().includes("stakeholders")) {
        answer =
          "Stakeholders include project sponsors, team members, and clients.";
      } else if (query.toLowerCase().includes("risks")) {
        answer =
          "Common project risks include scope creep, budget overruns, and missed deadlines.";
      } else if (query.toLowerCase().includes("tools")) {
        answer =
          "Project management tools like Jira, Asana, or Trello can help with tracking progress.";
      } else if (query.toLowerCase().includes("progress tracking")) {
        answer =
          "You can track progress using Agile sprints, KPIs, or weekly reports.";
      } else if (query.toLowerCase().includes("communication")) {
        answer =
          "Effective communication involves regular meetings, emails, and using collaboration tools.";
      } else if (query.toLowerCase().includes("success metrics")) {
        answer =
          "Success can be measured by on-time delivery, staying within budget, and meeting goals.";
      }

      // ✅ Translate the Answer Before Setting It
      const translatedAnswer = await translateText(answer, language);

      setQaList((prev) => [
        ...prev,
        { question: "", answer: translatedAnswer, isUser: false },
      ]);
      setAiTyping(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg h-[650px] flex flex-col">
        <CardHeader className="p-4 rounded-t-lg flex justify-between items-center">
          <CardTitle>Chat with AI</CardTitle>

          {/* Language Selector */}
          <Select
            className="border border-gray-300 text-gray-900 p-2 rounded-md shadow-md hover:bg-gray-200"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              localStorage.setItem("selectedLanguage", e.target.value);
            }}
          >
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
        </CardHeader>

        <CardContent className="p-4 flex flex-col flex-grow overflow-hidden">
          {/* Suggested Questions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q, index) => (
              <motion.button
                key={index}
                onClick={() => handleAskQuestion(q)}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 text-sm rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <MessageCircle size={16} />
                {q}
              </motion.button>
            ))}
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto space-y-3 p-4 rounded-lg"
          >
            {qaList.map((qa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: qa.isUser ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-3 ${
                  qa.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI Avatar */}
                {!qa.isUser && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full">
                    <Bot size={22} />
                  </div>
                )}

                {/* Chat Bubble */}
                <div
                  className={`p-3 rounded-xl max-w-xs text-sm ${
                    qa.isUser
                      ? "bg-blue-500 text-white rounded-br-none shadow-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <Text>{qa.isUser ? qa.question : qa.answer}</Text>
                </div>

                {/* User Avatar */}
                {qa.isUser && (
                  <div className="w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-full">
                    <User size={22} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* AI is Typing Indicator */}
          {aiTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-gray-500 text-sm flex items-center gap-2 mt-2"
            >
              <Bot size={18} className="text-blue-600" />
              AI is typing...
            </motion.div>
          )}
        </CardContent>

        {/* Input Field */}
        <div className="p-4 border-t flex gap-2 sticky bottom-0">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow"
          />
          <Button
            onClick={() => handleAskQuestion(question)}
            className="flex items-center gap-2"
          >
            <Send size={18} />
            Ask
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QASection;
