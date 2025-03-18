import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UploadCloud,
  CheckCircle,
  PenTool,
  Trash2,
  Edit2,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import SignatureCanvas from "react-signature-canvas";
import { Text } from "@/components/typography/Text/text";
import { useNavigate } from "react-router-dom";

const mockPendingRequests = [
  { id: 1, name: "Contract Agreement.pdf", date: "March 2, 2024" },
  { id: 2, name: "NDA Document.pdf", date: "March 3, 2024" },
];

const ProfilePage = () => {
  const [savedSignatures, setSavedSignatures] = useState<string[]>([]);
  const [signedDocuments, setSignedDocuments] = useState<
    { fileName: string; fileUrl: string; signature: string; signedAt: string }[]
  >([]);
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState<
    { fileName: string; fileUrl: string }[]
  >([]);
  // ✅ Load saved signatures and signed documents from localStorage

  const handleEditSignature = (doc: {
    fileName: string;
    fileUrl: string;
    signature?: string;
  }) => {
    navigate("/sign/signed", { state: doc });
  };
  const [penColor, setPenColor] = useState("black");

  useEffect(() => {
    // Check if the document is in dark mode
    const isDarkMode =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-mode") === "dark";
    setPenColor(isDarkMode ? "white" : "black");
  }, []);

  useEffect(() => {
    const storedSignatures = JSON.parse(
      localStorage.getItem("userSignatures") || "[]"
    );
    setSavedSignatures(storedSignatures);

    const storedDocuments = JSON.parse(
      localStorage.getItem("signedDocuments") || "[]"
    );
    setSignedDocuments(storedDocuments);
  }, []);

  // ✅ Handle Uploading a Signature
  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const updatedSignatures = [...savedSignatures, fileUrl];
      localStorage.setItem("userSignatures", JSON.stringify(updatedSignatures));
      setSavedSignatures(updatedSignatures);
    }
  };

  const removeDocument = (type: "pending" | "signed", index: number) => {
    let updatedDocs;
    if (type === "pending") {
      updatedDocs = pendingRequests.filter((_, i) => i !== index);
      localStorage.setItem("pendingRequests", JSON.stringify(updatedDocs));
      setPendingRequests(updatedDocs);
    } else {
      updatedDocs = signedDocuments.filter((_, i) => i !== index);
      localStorage.setItem("signedDocuments", JSON.stringify(updatedDocs));
      setSignedDocuments(updatedDocs);
    }
  };
  // ✅ Handle Drawing a Signature
  const handleConfirmDrawnSignature = () => {
    if (sigCanvasRef.current?.isEmpty()) {
      alert("Please draw your signature first!");
      return;
    }

    const drawnSignature = sigCanvasRef.current.toDataURL("image/png");
    const updatedSignatures = [...savedSignatures, drawnSignature];
    localStorage.setItem("userSignatures", JSON.stringify(updatedSignatures));
    setSavedSignatures(updatedSignatures);
  };

  // ✅ Remove a Saved Signature
  const removeSignature = (index: number) => {
    const updatedSignatures = savedSignatures.filter((_, i) => i !== index);
    localStorage.setItem("userSignatures", JSON.stringify(updatedSignatures));
    setSavedSignatures(updatedSignatures);
  };

  // ✅ Remove a Signed Document
  const removeSignedDocument = (index: number) => {
    const updatedDocuments = signedDocuments.filter((_, i) => i !== index);
    localStorage.setItem("signedDocuments", JSON.stringify(updatedDocuments));
    setSignedDocuments(updatedDocuments);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        {/* User Info */}
        <Card className="mb-6 shadow-lg p-6 text-center">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage
                src="https://i.pravatar.cc/150?img=4"
                alt="User Profile"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-semibold">John Doe</CardTitle>
            <p className="text-gray-500">john.doe@example.com</p>
          </CardHeader>
        </Card>

        {/* Tabs for Signatures, Pending Requests, Signed Documents */}
        <Tabs defaultValue="signature" className="w-full">
          <TabsList className="flex justify-center gap-4 p-2 rounded-lg shadow-md mb-4">
            <TabsTrigger value="signature">
              <PenTool size={18} className="mr-2" />
              Signature Management
            </TabsTrigger>
            <TabsTrigger value="pending">
              <UploadCloud size={18} className="mr-2" />
              Pending Requests
            </TabsTrigger>
            <TabsTrigger value="signed">
              <CheckCircle size={18} className="mr-2" />
              Signed Documents
            </TabsTrigger>
          </TabsList>
          <CardHeader>
            <CardTitle>Manage Your Signatures</CardTitle>
          </CardHeader>
          {/* Signature Management */}
          <TabsContent value="signature">
            <Card className="shadow-lg">
              <CardContent className="flex flex-col items-center">
                {/* Display Saved Signatures */}
                {savedSignatures.length > 0 ? (
                  <div className="mt-6 w-full max-w-md">
                    <Text className="font-semibold mb-2">
                      Your Saved Signatures:
                    </Text>
                    <div className="grid grid-cols-2 gap-4">
                      {savedSignatures.map((sig, index) => (
                        <div key={index} className="relative">
                          <img
                            src={sig}
                            alt={`Signature ${index + 1}`}
                            className="border rounded-lg"
                          />
                          <Button
                            className="absolute top-1 right-1 bg-red-500 p-1 rounded"
                            size="sm"
                            onClick={() => removeSignature(index)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="">No signature uploaded yet.</p>
                )}

                {/* Upload Signature */}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="mt-4"
                />

                {/* Draw Signature */}
                <div className="mt-6 border p-2 rounded-lg">
                  <SignatureCanvas
                    ref={(ref) => (sigCanvasRef.current = ref)}
                    penColor="blue"
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: "border",
                    }}
                  />
                  <div className="mt-2 flex gap-4">
                    <Button onClick={handleConfirmDrawnSignature}>
                      Save Signature
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Signature Requests */}
          <TabsContent value="pending">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Pending Signature Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {mockPendingRequests.length === 0 ? (
                  <p className=" text-center">No pending requests.</p>
                ) : (
                  <ul className="space-y-2">
                    {mockPendingRequests.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex justify-between p-2 border rounded-md shadow-sm"
                      >
                        <span>{doc.name}</span>
                        <span className="text-sm">{doc.date}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signed Documents */}
          <TabsContent value="signed">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Previously Signed Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {signedDocuments.length === 0 ? (
                  <p className="">No signed documents.</p>
                ) : (
                  signedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 border rounded-md shadow-sm"
                    >
                      <Text>{doc.fileName}</Text>
                      <p className="text-sm text-gray-500">
                        Signed on: {doc.signedAt.slice(0, 10)}
                      </p>{" "}
                      {/* ✅ Show signed date */}
                      <div className="flex gap-2">
                        {/* View Document */}
                        <Button
                          onClick={() =>
                            navigate("/upload/view/1", { state: doc })
                          }
                        >
                          <Eye size={16} />
                        </Button>

                        {/* Edit Signature Button */}
                        <Button
                          onClick={() => handleEditSignature(doc)}
                          variant="outline"
                        >
                          <Edit2 size={16} />
                        </Button>

                        {/* Delete Document */}
                        <Button
                          onClick={() => removeSignedDocument(index)}
                          variant="destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
