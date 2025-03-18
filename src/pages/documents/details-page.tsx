import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text } from "@/components/typography/Text/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import QASection from "@/components/connected/study-materials/qa-section";
// ✅ Import the AI Q&A component

type QAItem = {
  question: string;
  answer: string;
};

type FileDetails = {
  id: number;
  name: string;
  uploadDate: string;
  status: string;
  summary: string;
  pdfUrl: string;
  qa: QAItem[];
};

// ✅ Mock Files
const mockFiles: FileDetails[] = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    uploadDate: "2024-02-10",
    status: "Processed",
    summary: "A proposal outlining project scope and objectives.",
    pdfUrl: `/Contract Squire Front End developer Inerview.pdf`,
    qa: [
      { question: "What is the deadline?", answer: "December 2023" },
      { question: "Who is the project lead?", answer: "John Doe" },
    ],
  },
  {
    id: 2,
    name: "Financial Report 2023.pdf",
    uploadDate: "2024-01-15",
    status: "Completed",
    summary: "A detailed financial summary for the fiscal year 2023.",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    qa: [
      { question: "What is the total budget?", answer: "$100,000" },
      { question: "Is there a contingency?", answer: "Yes, 10%" },
    ],
  },
];

const FileDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [file, setFile] = useState<FileDetails | null>(null);
  const [qaList, setQaList] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { state } = useLocation();
  const fileUrl = state?.fileUrl;
  // ✅ Initialize PDF viewer plugin
  const pdfPlugin = defaultLayoutPlugin();

  // useEffect(() => {
  //   const fileDetails = mockFiles.find((f) => f.id === Number(id));
  //   if (fileDetails) {
  //     setFile(fileDetails);
  //     setQaList(fileDetails.qa);
  //     setLoading(false);
  //   } else {
  //     setError("File not found");
  //   }
  // }, [id]);

  if (!fileUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <QASection qaList={qaList} setQaList={setQaList} />;
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Section - PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-2/3 rounded-xl shadow-lg p-4"
        >
          <Card>
            <CardHeader className="bg-blue-600 text-white p-4 rounded-t-lg">
              <CardTitle>{state.fileName}</CardTitle>
              <Text fontSize="text-sm">
                Uploaded on: {state.signedAt} | Status: {"Signed"}
              </Text>
            </CardHeader>
            <CardContent className="p-4">
              {loading ? (
                <p>Loading PDF...</p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="border border-gray-300 rounded-lg p-2 h-[500px] overflow-hidden">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                      <Viewer fileUrl={fileUrl} plugins={[pdfPlugin]} />
                    </Worker>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        {/* ✅ AI Q&A Section (Now a Separate Component) */}
        <div className="w-full lg:w-1/3 space-y-6 relative rounded-b-lg">
          <QASection qaList={qaList} setQaList={setQaList} />;
        </div>
      </div>
    </div>
  );
};

export default FileDetailsPage;
