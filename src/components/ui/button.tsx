import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loading02Icon } from 'hugeicons-react';

export const defaultClass =
  'bg-primary text-white shadow hover:bg-primary/90';
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: defaultClass,
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-primary bg-background shadow-sm hover:bg-primary hover:text-white',
        outline_base:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:border-primary ring-primary focus-visible:ring-primary-200',
        secondary:
          'bg-secondary shadow-sm hover:bg-secondary/80',
        ghost:
          'hover:bg-accent bg-none hover:bg-none hover:text-accent-foreground',
        link: ' bg-none hover:bg-none focus:underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      disabled: {
        false: null,
        true: ['opacity-50', 'cursor-not-allowed'],
      },
      fullWidth: {
        false: null,
        true: 'w-full',
      },
      rounded: {
        false: null,
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      disabled,
      rightIcon,
      leftIcon,
      rounded,
      fullWidth,
      asChild = false,
      loading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            disabled,
            rounded,
            fullWidth,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        type="button"
        {...props}
      >
        {!!leftIcon && leftIcon}
        {loading ? (
          <Loading02Icon className="w-5 h-5 animate-spin" />
        ) : (
          children
        )}
        {!!rightIcon && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
