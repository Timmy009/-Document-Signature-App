import React, {
  forwardRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react';
import {
  classnames,
  TFontSize,
  TTextDecoration,
  TTextColor,
  TTextTransform,
  TFontWeight,
  TFontStyle,
  textTransform,
  textColor as te,
  fontSize as fs,
  fontWeight as fw,
  textDecoration as td,
  fontStyle as fsy,
  lineHeight as lh,
  TLineHeight,
} from 'tailwindcss-classnames';
import { TWordBreak } from 'tailwindcss-classnames';
import { TWhitespace } from 'tailwindcss-classnames';
import { cn } from '@/lib/utils';

// Redecalare forwardRef
//https://fettblog.eu/typescript-react-generic-forward-refs/
// declare module 'react' {
//   function forwardRef<T, P = object>(
//     render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
//   ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
// }

export type ITextProps<T extends ElementType> = {
  asComp?: T;
  children: ReactNode;
  isTruncated?: boolean;
  fontSize?: TFontSize;
  noOfLines?: number;
  textDecoration?: TTextDecoration;
  textColor?: TTextColor;
  casing?: TTextTransform;
  fontWeight?: TFontWeight;
  fontStyle?: TFontStyle;
  wordBreak?: TWordBreak;
  className?: string;
  whiteSpace?: TWhitespace;
  lineHeight?: TLineHeight;
};

const truncateClass = 'truncate';
function TextComp<T extends ElementType = 'p'>(
  {
    className,
    children,
    fontSize,
    fontWeight,
    fontStyle,
    isTruncated,
    noOfLines,
    textDecoration,
    textColor,
    casing,
    asComp,
    wordBreak,
    whiteSpace,
    lineHeight,
    ...props
  }: ITextProps<T> & ComponentPropsWithoutRef<T>,
  ref: React.ForwardedRef<HTMLElement | T>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = asComp ?? ('p' as any); //paragraph as default
  const lineClampClass = noOfLines ? `line-clamp-${noOfLines}` : '';
  const wordBreakClass = wordBreak ? wordBreak : '';
  const whiteSpaceClass = whiteSpace ? whiteSpace : '';
  const casingClass = textTransform(casing);
  const textColorClass = te(textColor);
  const _fontSize = fs(fontSize);
  const _fontWeight = fw(fontWeight);
  const _textDecoration = td(textDecoration);
  const _fontStyle = fsy(fontStyle);
  const _lineHeight = lh(lineHeight);
  const baseClass = classnames(
    textColorClass,
    casingClass,
    _fontSize,
    _fontWeight,
    _textDecoration,
    _fontStyle,
    _lineHeight
  );

  //added this logic so we can pass className alongside the Text component defined classes
  const componentClass = cn([baseClass, className]);

  return (
    <Component
      {...props}
      ref={ref}
      className={`${componentClass} ${noOfLines ? lineClampClass : ''} ${
        wordBreak ? wordBreakClass : ''
      } ${whiteSpace ? whiteSpaceClass : ''} ${lineHeight ? lineHeight : ''} ${
        isTruncated ? truncateClass : ''
      }`}
    >
      {children}
    </Component>
  );
}

//we could also use this, but its too long and a bit confusing
export const Text = forwardRef(TextComp) as <T extends ElementType = 'p'>(
  props: ITextProps<T> &
    ComponentPropsWithoutRef<T> & {
      ref?: React.ForwardedRef<ITextProps<T> & ComponentPropsWithoutRef<T>>;
    }
) => ReturnType<typeof TextComp>;

// export const Text = forwardRef(TextComp) as <T extends ElementType = 'p'>(
//   props: ITextProps<T> & ComponentPropsWithoutRef<T> & { ref?: React.ForwardedRef<HTMLElement | T> }
// ) => React.ReactElement | null;
