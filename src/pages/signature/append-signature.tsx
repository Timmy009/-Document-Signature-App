import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/typography/Text/text";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import SignatureCanvas from "react-signature-canvas";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toast } from "sonner";
import Mammoth from "mammoth";
import parse from "html-react-parser";
import { renderAsync } from "docx-preview";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { PDFDocument } from "pdf-lib";
import { Edit2 } from "lucide-react"; // ✍️ Edit Icon

const AppendSignaturePage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const documentRef = useRef<HTMLDivElement | null>(null);
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const docxContainerRef = useRef<HTMLDivElement | null>(null);
  const [signature, setSignature] = useState<string | null>(
    state?.signature || null
  );
  const [fileUrl, setFileUrl] = useState<string | null>(state?.fileUrl || null);
  const [showSignatureToolbar, setShowSignatureToolbar] = useState(false); // 🚀 Initially hidden
  const fileName = state?.fileName || "Unnamed Document";

  useEffect(() => {
    if (!fileUrl || !signature) {
      const storedDocuments = JSON.parse(
        localStorage.getItem("signedDocuments") || "[]"
      );
      if (storedDocuments.length > 0) {
        const lastSignedDoc = storedDocuments[storedDocuments.length - 1];
        setFileUrl(lastSignedDoc.fileUrl);
        setSignature(lastSignedDoc.signature);
      }
    }
  }, [fileUrl, signature]);

  // ✅ Save New Signature
  const handleSaveSignature = () => {
    if (sigCanvasRef.current?.isEmpty()) {
      toast.error("❌ Please draw a signature first!");
      return;
    }
    const newSignature = sigCanvasRef.current.toDataURL("image/png");
    setSignature(newSignature);
    setShowSignatureToolbar(false); // 🚀 Hide the toolbar after saving
    toast.success("✅ New signature saved!");
  };

  // ✅ Clear Signature
  const handleClearSignature = () => {
    sigCanvasRef.current?.clear();
    setSignature(null);
  };

  // ✅ Save Signed Document
  const saveSignedDocument = async () => {
    if (!fileUrl || !signature) return;

    try {
      const existingPdfBytes = await fetch(fileUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const signatureImageBytes = await fetch(signature).then((res) =>
        res.arrayBuffer()
      );
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      const firstPage = pdfDoc.getPages()[0];
      firstPage.drawImage(signatureImage, {
        x: 100,
        y: 100,
        width: 150,
        height: 50,
      });

      const signedPdfBytes = await pdfDoc.save();
      const signedPdfBlob = new Blob([signedPdfBytes], {
        type: "application/pdf",
      });
      const signedPdfUrl = URL.createObjectURL(signedPdfBlob);

      const newSignedDoc = {
        fileName,
        fileUrl: signedPdfUrl,
        signedAt: new Date().toISOString(),
      };

      const savedDocs = JSON.parse(
        localStorage.getItem("signedDocuments") || "[]"
      );
      savedDocs.push(newSignedDoc);
      localStorage.setItem("signedDocuments", JSON.stringify(savedDocs));

      toast.success("✅ Signed document saved successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("❌ Can only sign a pdf file.");
      console.error("Error signing document:", error);
    }
  };

  const [docxContent, setDocxContent] = useState<string | null>(null);

  useEffect(() => {
    if (state.fileName?.endsWith(".docx")) {
      fetch(fileUrl)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => Mammoth.convertToHtml({ arrayBuffer }))
        .then((result) => setDocxContent(result.value))
        .catch((err) => console.error("Error loading DOCX:", err));
    }
  }, [fileUrl]);

  return (
    <div className="flex flex-col items-center p-6">
      <Text className="text-2xl font-semibold">
        Append Signature to Document
      </Text>
      <Text>{fileName}</Text>

      {/* Document Viewer */}
      <motion.div
        ref={documentRef}
        className="relative border mt-6 w-full max-w-2xl h-[500px] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {fileUrl ? (
          state.fileName.endsWith(".pdf") ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer fileUrl={fileUrl} />
            </Worker>
          ) : state.fileName.endsWith(".docx") ? (
            <div className="w-full max-w-2xl h-[500px] border rounded-lg shadow-md bg-white p-6 overflow-auto text-gray-700">
              {docxContent ? (
                <div className="prose max-w-none">{parse(docxContent)}</div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Loading document...
                </div>
              )}
            </div>
          ) : (
            <p>Unsupported file format</p>
          )
        ) : (
          <p>No file selected</p>
        )}

        {/* ✅ Draggable Signature */}
        {signature && (
          <Draggable bounds="parent">
            <motion.img
              src={signature}
              alt="Signature"
              className="absolute w-40 h-auto cursor-move"
              drag
              dragConstraints={documentRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Draggable>
        )}
      </motion.div>

      {/* ✅ Signature Toolbar Toggle Button */}
      <div className="mt-4 flex items-center gap-2">
        <Text className="font-semibold">Modify Signature:</Text>
        <Button
          onClick={() => setShowSignatureToolbar(!showSignatureToolbar)}
          variant="outline"
        >
          <Edit2 size={18} className="mr-2" /> Edit Signature
        </Button>
      </div>

      {/* ✅ Signature Toolbar (Hidden by Default) */}
      {showSignatureToolbar && (
        <div className="mt-4 w-full max-w-md p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
          <Text className="font-semibold mb-2 dark:text-white">
            Draw New Signature:
          </Text>
          <SignatureCanvas
            ref={(ref: any) => (sigCanvasRef.current = ref)}
            penColor="blue"
            canvasProps={{
              width: 400,
              height: 150,
              className: "border rounded-lg",
            }}
          />
          <div className="mt-2 flex justify-between">
            <Button variant="outline" onClick={handleClearSignature}>
              Clear
            </Button>
            <Button onClick={handleSaveSignature}>Save Signature</Button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={saveSignedDocument}>Confirm Placement</Button>
      </div>
    </div>
  );
};

const WrappedAppendSignaturePage = AppendSignaturePage;
export default WrappedAppendSignaturePage;
