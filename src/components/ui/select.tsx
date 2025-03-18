import * as React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ children, className, ...props }) => (
  <select className={`p-2 border rounded-md w-full bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500 ${className}`} {...props}>
    {children}
  </select>
);

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, className, ...props }) => (
  <option value={value} className={`p-2 hover:bg-blue-100 cursor-pointer ${className}`} {...props}>
    {children}
  </option>
);

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className }) => (
  <div className={`flex items-center justify-between cursor-pointer ${className}`}>
    {children}
  </div>
);

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => (
  <div className={`bg-white border border-gray-300 shadow-lg rounded-md mt-1 ${className}`}>
    {children}
  </div>
);

interface SelectValueProps {
  placeholder: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder, className }) => (
  <span className={`text-gray-600 ${className}`}>{placeholder}</span>
);
