import { Text } from "@/components/typography/Text/text";
import {} from "@/components/connected/study-materials/create-upload-dialog";
import { useNavigate } from "react-router-dom";
import { MyUploadsTable } from "./uploads-table";
import { Button } from "@/components/ui/button";
import { Add01Icon } from "hugeicons-react";
import { FormType } from "@/types/form"; // Adjust the import path as necessary

const MyUpload = () => {
  const navigate = useNavigate();

  const gotoAddStudy = (values: FormType) => {
    navigate("add-study-material");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Text fontSize="text-lg" fontWeight="font-medium">
          My Upload
        </Text>
        <Button onClick={gotoAddStudy} leftIcon={<Add01Icon />}>
          Upload{" "}
        </Button>
      </div>

      <MyUploadsTable />
    </div>
  );
};

const WrappedMyUpload = MyUpload;
export default WrappedMyUpload;
