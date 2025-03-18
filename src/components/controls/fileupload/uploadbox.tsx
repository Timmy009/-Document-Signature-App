import { useState, useRef, useCallback, ChangeEvent } from "react";
import { Text } from "@/components/typography/Text/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, UploadCloud, RefreshCcw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerClass = cn(
  "w-full h-64 rounded-lg border-2 border-dashed border-gray-300 p-4 flex items-center justify-center transition-all duration-300"
);
const activeDropBg = cn("bg-blue-50 border-blue-500");

type FileObj = { file: File; url: string };

interface IProps {
  onDropFiles: (files: FileObj[]) => void;
}

export const FileUploadBox = ({ onDropFiles }: IProps) => {
  const [selectedFile, setSelectedFile] = useState<FileObj | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Handle file drop properly
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFilesDrop(Array.from(droppedFiles));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFilesDrop = useCallback(
    async (files: File[]) => {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
      ];
  
      const filtered = files.filter((file) => allowedTypes.includes(file.type));
      if (!filtered.length) return;
  
      setIsUploading(true);
      setUploadProgress(0);
  
      const file = filtered[0];
      const fileObj = { file, url: URL.createObjectURL(file) };
      setSelectedFile(fileObj);
  
      if (onDropFiles) onDropFiles([fileObj]);
  
      // ✅ Simulate Upload Progress with Functional Updates
      let progress = 0;
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10; // ✅ Increment properly
        });
      }, 300);
    },
    [onDropFiles]
  );
  
  const handleButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFilesDrop(Array.from(e.target.files));
    },
    [handleFilesDrop]
  );

  const baseContainerClass = cn(containerClass, { [activeDropBg]: isDragging });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={baseContainerClass}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {selectedFile ? (
        <div className="relative w-full h-full rounded-lg">
          {/* ✅ Show Progress Animation */}
          {isUploading && (
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <motion.div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <Text className="font-semibold mt-2">{uploadProgress}%</Text>
            </div>
          )}

          {/* ✅ Display Image */}
          {selectedFile.file.type.startsWith("image/") ? (
            <img src={selectedFile.url} alt="Uploaded" className="w-full h-full object-cover" />
          ) : (
            // ✅ Display File Icon for PDF/DOCX
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FileText size={48} className="text-gray-500" />
              <Text className="text-gray-700">{selectedFile.file.name}</Text>
            </div>
          )}

          {/* ✅ Change File Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            className="absolute bottom-3 right-3 border border-gray-300 px-3 py-1 rounded-md flex items-center gap-2 text-sm shadow-md hover:bg-gray-100 transition"
          >
            <RefreshCcw size={16} />
            Change File
          </motion.button>

          {/* ✅ Hidden File Input */}
          <input
            type="file"
            name="file"
            accept=".pdf, .doc, .docx, .png, .jpg"
            ref={inputRef}
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center text-center space-y-3">
          {/* ✅ Upload Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                role="button"
                className="border border-gray-300 w-fit self-center py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
                onClick={handleButtonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UploadCloud size={24} className="m-auto text-blue-500" />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>Click to Browse Files</TooltipContent>
          </Tooltip>

          {/* ✅ Drag & Drop Instruction */}
          <Text className="text-gray-600">OR</Text>
          <Text className="text-gray-600">
            Drag and drop your files here
            <br />
            <Text className="text-sm text-gray-400">
              File types: .pdf, .doc, .docx, .png, .jpg
            </Text>
          </Text>

          {/* ✅ Hidden File Input */}
          <input
            type="file"
            name="file"
            accept=".pdf, .doc, .docx, .png, .jpg"
            ref={inputRef}
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      )}
    </motion.div>
  );
};


interface IProps {
  onDropFiles: (files: FileObj[]) => void;
}

export const ButtonUploadBox = ({ onDropFiles }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Handle file selection from input
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setIsUploading(true);
    const files = Array.from(e.target.files);
    const fileObjects = files.map((file) => ({ file, url: URL.createObjectURL(file) }));

    setSelectedFileNames(files.map((file) => file.name));

    // Simulate upload time
    setTimeout(() => {
      setIsUploading(false);
      if (onDropFiles) onDropFiles(fileObjects);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Upload Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => inputRef.current?.click()}
        className="px-5 py-2 flex items-center gap-2 font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        <UploadCloud size={20} />
        Upload File
      </motion.button>

      {/* Hidden File Input */}
      <input type="file" multiple ref={inputRef} className="hidden" onChange={handleInputChange} />

      {/* Uploading Indicator */}
      {isUploading && (
        <div className="flex items-center gap-2 mt-2">
          <Loader2 className="animate-spin" size={18} />
          <Text>Uploading...</Text>
        </div>
      )}

      {/* Selected File Names */}
      {selectedFileNames.length > 0 && !isUploading && (
        <div className="mt-2 text-center">
          <Text className="font-semibold">Uploaded Files:</Text>
          <ul className="text-sm mt-1">
            {selectedFileNames.map((name, index) => (
              <li key={index} className="truncate">{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
