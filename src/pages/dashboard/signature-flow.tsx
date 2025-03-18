import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/typography/Text/text";
import { PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignatureFlow = () => {
    const navigate = useNavigate();
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      className="mb-8 w-full rounded-lg"
    >
      {/* <Card className="shadow-lg p-6 text-center border dark:border-gray-700" onClick={()=>navigate('/sign')} >
        <CardHeader className="flex flex-col items-center text-blue-600 dark:text-blue-400">
          <PenTool size={32} />
          <CardTitle className="text-xl font-semibold mt-2">
            Signature Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-center">
            Sign your documents securely and verify authenticity with ease.  
            This ensures your documents remain legally binding and verifiable.
          </Text>
        </CardContent>
      </Card> */}
       <Card 
        className={`shadow-lg p-6 text-center border cursor-pointer rounded-xl
                   border-gray-200 dark:border-gray-700
                   bg-gradient-to-br from-blue-100 via-white to-blue-50
                   dark:from-gray-900 dark:via-gray-800 dark:to-black`}
        onClick={() => navigate('/sign')} 
      >
        <CardHeader className="flex flex-col items-center text-blue-600 dark:text-blue-400">
          <PenTool size={32} className="mb-2 text-blue-500 dark:text-blue-400" />
          <CardTitle className="text-lg font-semibold mt-1">
            Signature Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-center text-gray-700 dark:text-gray-300">
            Sign your documents securely and verify authenticity with ease.  
            This ensures your documents remain legally binding and verifiable.
          </Text>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignatureFlow;
