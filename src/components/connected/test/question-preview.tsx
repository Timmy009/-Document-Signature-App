import { AnimatedPresenceLayout } from '@/components/layouts/animated-presence';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { useSidebar } from '@/components/ui/sidebar';
import { IQuestionDto } from '@/dto/test';
import { HelpSquareIcon, PencilEdit01Icon } from 'hugeicons-react';

export const QuestionPreview = ({
  question,
  id,
}: {
  question: IQuestionDto;
  id: string;
}) => {
  const { isMobile } = useSidebar();

  return (
    <AnimatedPresenceLayout uniqueKey={`${id}`}>
      <Card className="p-4 w-full flex justify-between space-y-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-purple-50 rounded-md">
            <HelpSquareIcon className="text-purple-900 w-5 h-5" />
          </div>
          <CardDescription className="flex-1">
            {question?.questionText
              ? `${question?.questionText} ?`
              : 'No question yet!'}
          </CardDescription>
        </div>

        <Button
          variant="link"
          leftIcon={<PencilEdit01Icon />}
          className={isMobile ? 'p-0' : ''}
        >
          {!isMobile ? 'Edit question' : null}
        </Button>
      </Card>
    </AnimatedPresenceLayout>
  );
};
