import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/typography/Text/text";
import { Upload, FileText } from "lucide-react";

const QuickActions = ({ navigate }: { navigate: (path: string, state?: any) => void }) => {

    const gotoaI = (doc:any) => {
     
      // const newDocument = {
      //   fileName,
      //   fileUrl,
      //   signature: savedSignatures[savedSignatures.length - 1],
      //   signedAt: new Date().toLocaleString(),
      // };
  
      // const storedDocuments = JSON.parse(localStorage.getItem("signedDocuments") || "[]");
      // const updatedDocuments = [...storedDocuments, newDocument];
  
      // localStorage.setItem("signedDocuments", JSON.stringify(updatedDocuments));
  
      // Navigate to Append Signature Page
 
   navigate("/upload/view/1", { state: null })
    };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* <motion.div whileHover={{ scale: 1.05 }}>
        <Card 
          className="cursor-pointer shadow-lg hover:bg-opacity-90 transition duration-300 text-center" 
          onClick={() => navigate("/upload")}
        >
          <CardHeader className="flex flex-col items-center text-blue-600">
            <Upload size={28} />
            <CardTitle className="mt-2">Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className=" text-center">
              Quickly upload and process your documents with just a few clicks.
            </Text>
          </CardContent>
        </Card>
      </motion.div> */}

      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.98 }}
        className="transition-all duration-300"
      >
        <Card 
          className="cursor-pointer shadow-lg hover:bg-opacity-90 transition duration-300 text-center 
                     bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                     rounded-2xl border border-blue-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-50 dark:bg-opacity-70
                     hover:shadow-blue-400 dark:hover:shadow-blue-700"
          onClick={() => navigate("/upload")}
        >
          <CardHeader className="flex flex-col items-center text-blue-600 dark:text-blue-400">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Upload size={32} className="text-blue-500 dark:text-blue-400" />
            </motion.div>
            <CardTitle className="mt-2 text-lg font-semibold">Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-center text-gray-700 dark:text-gray-300">
              Quickly upload and process your documents with just a few clicks.
            </Text>
          </CardContent>
        </Card>
      </motion.div>

      {/* <motion.div whileHover={{ scale: 1.05 }}>
        <Card 
          className="cursor-pointer shadow-lg hover:bg-opacity-90 transition duration-300 text-center" 
          onClick={() => gotoaI()}
        >
          <CardHeader className="flex flex-col items-center text-blue-600">
            <FileText size={28} />
            <CardTitle className="mt-2">Ask AI</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-center">
              Get instant insights, answers, and explanations for your documents.
            </Text>
          </CardContent>
        </Card>
      </motion.div> */}

       <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.98 }}
        className="transition-all duration-300"
      >
        <Card 
          className="cursor-pointer shadow-lg hover:bg-opacity-90 transition duration-300 text-center 
                     bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                     rounded-2xl border border-purple-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-50 dark:bg-opacity-70
                     hover:shadow-purple-400 dark:hover:shadow-purple-700"
          onClick={gotoaI}
        >
          <CardHeader className="flex flex-col items-center text-purple-600 dark:text-purple-400">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <FileText size={32} className="text-purple-500 dark:text-purple-400" />
            </motion.div>
            <CardTitle className="mt-2 text-lg font-semibold">Ask AI</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-center text-gray-700 dark:text-gray-300">
              Get instant insights, answers, and explanations for your documents.
            </Text>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuickActions;
