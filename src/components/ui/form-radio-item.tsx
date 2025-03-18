import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement,
} from 'react';
import { RadioGroupItem } from './radio-group';
import { Label } from './label';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Text } from '../typography/Text/text';

const labelStyle = cva(
  'flex relative bg-white h-[9.75rem] w-[17.438rem]  border-neutral-400 border rounded-lg',
  {
    variants: {
      checked: {
        false: null,
        true: 'border-primary',
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

const buttonStyle = cva(
  'flex relative bg-white px-3 py-2 text-neutral-900  border-[#E2E2E2] border rounded-md',
  {
    variants: {
      checked: {
        false: null,
        true: 'border-neutal-900 bg-neutral-900 text-neutral-light',
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

interface IRadioButton
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof labelStyle> {
  checked?: boolean;
  labelClassName?: string;
  icon?: ReactElement;
  label: string;
  subLabel?: string;
}

export const FormRadioGroupItem = forwardRef<HTMLButtonElement, IRadioButton>(
  ({ id, checked, icon, labelClassName, label, subLabel, ...props }, ref) => {
    return (
      <div className="bg-white">
        <Label
          htmlFor={id}
          className={cn(labelStyle({ checked, className: labelClassName }))}
        >
          <RadioGroupItem
            {...props}
            id={id}
            className="absolute top-2 right-2"
            ref={ref}
          ></RadioGroupItem>

          <div className="flex flex-col w-full justify-center items-center">
            {icon ? (
              <div
                className={`p-2 rounded-full ${
                  checked ? 'bg-primary-light' : 'bg-neutral-300'
                }`}
              >
                {cloneElement(icon, {
                  color: checked ? '#1E2F97' : 'text-grey',
                })}
              </div>
            ) : null}
            <div>
              <Text
                fontSize="text-xl"
                fontWeight="font-medium"
                textColor={checked ? 'text-primary' : 'text-neutral-900'}
                className="text-center"
              >
                {label}
              </Text>
              {subLabel ? (
                <Text
                  fontSize="text-sm"
                  textColor="text-grey-200"
                  className="text-center"
                >
                  {subLabel}
                </Text>
              ) : null}{' '}
            </div>
          </div>
        </Label>
      </div>
    );
  }
);
export const ButtonRadioItem = forwardRef<HTMLButtonElement, IRadioButton>(
  ({ id, checked, icon, labelClassName, label, ...props }, ref) => {
    return (
      <div className="bg-white">
        <Label
          htmlFor={id}
          className={cn(buttonStyle({ checked, className: labelClassName }))}
        >
          <RadioGroupItem
            {...props}
            id={id}
            className="absolute top-2 right-2 hidden"
            ref={ref}
          ></RadioGroupItem>

          <div className="flex flex-col w-full justify-center items-center">
            {icon ? (
              <div
                className={`p-2 rounded-full ${
                  checked ? 'bg-primary-light' : 'bg-neutral-300'
                }`}
              >
                {cloneElement(icon, {
                  color: checked ? '#1E2F97' : 'text-grey',
                })}
              </div>
            ) : null}
            <div>
              <Text
                fontSize="text-sm"
                fontWeight="font-medium"
                textColor={checked ? 'text-neutral-light' : 'text-neutral-900'}
                className="text-center"
              >
                {label}
              </Text>
            </div>
          </div>
        </Label>
      </div>
    );
  }
);
