import { StudyMaterialForm } from "@/components/connected/study-materials/study-material-form";
import { SectionHeader } from "@/components/primitives/section-header";
import { Divider } from "@/components/ui/divider";

const AddSignature: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <SectionHeader title="Add new document" subTitle="Ask AI a question" />
      <Divider />
      <StudyMaterialForm />
    </div>
  );
};

const WrappedSign = AddSignature;
export default WrappedSign;
