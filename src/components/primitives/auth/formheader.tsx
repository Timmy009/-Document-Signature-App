import { LogoIcon } from '@/components/icons/generated';
import { Text } from '@/components/typography/Text/text';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft02Icon, PencilEdit01Icon } from 'hugeicons-react';
import { ReactNode } from 'react';
import { TFontWeight } from 'tailwindcss-classnames';

interface IFormHeaderProps {
  onBackAction?: () => void;
  onEdit?: () => void;
  heading: string;
  desc?: ReactNode;
  defaultCenter?: boolean;
  headingFontWeight?: TFontWeight;
  hasMobileLogo?: boolean;
}

export const FormHeader = ({
  heading,
  desc,
  onBackAction,
  onEdit,
  defaultCenter = false,
  headingFontWeight,
  hasMobileLogo,
}: IFormHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col space-y-10">
      {isMobile && hasMobileLogo ? (
        <div className="w-full flex justify-center">
          <LogoIcon width={60} height={60} />
        </div>
      ) : null}
      {onBackAction ? (
        <div>
          <Button
            onClick={onBackAction}
            variant="outline"
            size="icon"
            leftIcon={<ArrowLeft02Icon color="text-white" />}
          ></Button>
        </div>
      ) : null}
      <div className="space-y-1 max-md:self-center">
        {
          <Text
            asComp="h1"
            fontWeight={
              isMobile && !headingFontWeight
                ? 'font-semibold'
                : headingFontWeight ?? 'font-medium'
            }
            fontSize={isMobile ? 'text-xl' : 'text-2xl'}
            textColor={isMobile ? 'text-primary' : 'text-black'}
            className={`max-md:text-center ${
              defaultCenter ? 'text-center' : ''
            }`}
          >
            {heading}
          </Text>
        }
        {desc ? (
          <>
            <Text
              textColor="text-grey-400"
              fontSize="text-sm"
              className={`max-md:text-center ${
                defaultCenter ? 'text-center' : ''
              } max-w-[372px]  max-md:max-w-[285px]`}
            >
              {desc}{' '}
              {onEdit ? (
                <span>
                  <Button
                    variant="link"
                    leftIcon={
                      <PencilEdit01Icon size={32} color="text-grey-800" />
                    }
                    className="px-1 py-0 h-6"
                    onClick={onEdit}
                  ></Button>
                </span>
              ) : null}
            </Text>{' '}
          </>
        ) : null}
      </div>
    </div>
  );
};
