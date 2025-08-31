import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="font-medium">{label}</label>}
      <input
      id={id}
        {...props}
        className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className ?? ""}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
