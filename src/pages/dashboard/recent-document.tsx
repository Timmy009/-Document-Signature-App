import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Text } from "@/components/typography/Text/text";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  uploads: any[];
  isLoading: boolean;
  showSkeleton: boolean;
  navigate: (path: string) => void;
};

// ✅ Default preview images
const defaultPreviewImages = [
  "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg", // Business Strategy
  "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg", // Finance & Investing
  "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg", // Science Research
  "https://m.media-amazon.com/images/I/81drfTT9ZfL.jpg", // AI & Technology
  "https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg", // Marketing & Sales
  "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", // Contract Law
  "https://m.media-amazon.com/images/I/91HHqVTAJQL.jpg", // Academic Research
  "https://m.media-amazon.com/images/I/81drfTT9ZfL.jpg",
];

const RecentDocuments = ({
  uploads,
  isLoading,
  showSkeleton,
  navigate,
}: Props) => {
  return (
    <>
      <Text className="font-semibold mb-4 text-lg">Recent Documents</Text>

      {isLoading || showSkeleton ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-60 w-full rounded-lg" />
          ))}
        </div>
      ) : uploads.length === 0 ? (
        <Text className="text-gray-500 text-center">
          No documents uploaded yet.
        </Text>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploads.slice(0, 8).map((file, index) => (
            <motion.div
              key={file.id}
              whileHover={{ scale: 1.05 }}
              className="transition-transform duration-300"
            >
              <Card
                className="cursor-pointer shadow-md hover:shadow-lg transition duration-300 rounded-xl overflow-hidden h-72 flex flex-col"
                onClick={() => navigate("/upload/view/1")}
              >
                {/* ✅ Preview Image or Random Placeholder */}
                <div className="h-44 w-full">
                  <img
                    src={
                      file.preview ||
                      defaultPreviewImages[index % defaultPreviewImages.length]
                    }
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-4 text-center flex flex-col justify-between flex-grow">
                  <CardTitle className="text-base font-semibold truncate">
                    {file.name}
                  </CardTitle>
                  <Text className="text-gray-500 text-sm mt-1">
                    {file.uploadDate} | {file.status}
                  </Text>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default RecentDocuments;
