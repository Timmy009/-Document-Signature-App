import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/typography/Text/text";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "sonner";

const SignaturePage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [savedSignatures, setSavedSignatures] = useState<string[]>([]);
  const fileUrl = state?.fileUrl;
  const fileName = state?.fileName;

  // ✅ Load existing signatures from LocalStorage
  useEffect(() => {
    const storedSignatures = JSON.parse(
      localStorage.getItem("userSignatures") || "[]"
    );
    setSavedSignatures(storedSignatures);
  }, []);

  // ✅ Handle Signature Confirmation
  const confirmSignature = () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      toast.success("Please sign the document.");
      return;
    }

    const signatureData = signatureRef.current.toDataURL("image/png");
    const updatedSignatures = [...savedSignatures, signatureData];

    localStorage.setItem("userSignatures", JSON.stringify(updatedSignatures));
    setSavedSignatures(updatedSignatures);
    setIsSigned(true);
  };

  // ✅ Save Document & Navigate to Append Signature Page
  const appendSignatureToDocument = () => {
    if (!fileUrl || !fileName) {
      toast.success("Error: No document found.");
      return;
    }


    navigate("/sign/signed", {
      state: {
        fileName,
        fileUrl,
        signature: savedSignatures[savedSignatures.length - 1],
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Text className="text-2xl font-semibold">Sign Document</Text>
      <Text className="text-gray-500">{fileName || "No file uploaded"}</Text>

      {/* Signature Canvas */}
      <div className="border mt-4 p-4 w-full max-w-md">
        <SignatureCanvas
          ref={(ref: SignatureCanvas) => (signatureRef.current = ref)}
          penColor="blue"
          canvasProps={{ width: 400, height: 150, className: "border" }}
        />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <Button variant="outline" onClick={() => signatureRef.current?.clear()}>
          Clear
        </Button>
        <Button onClick={confirmSignature}>Confirm Signature</Button>
      </div>

      {/* Append Signature Button */}
      {isSigned && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded text-center">
          <Text>✅ Document Signed Successfully</Text>
          <Button className="mt-4" onClick={appendSignatureToDocument}>
            Append Signature to Document
          </Button>
        </div>
      )}
    </div>
  );
};

const WrappedSignaturePage = SignaturePage;
export default WrappedSignaturePage;
