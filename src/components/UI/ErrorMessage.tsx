import type { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="text-red-500 text-center">{children}</p>;
}

export default ErrorMessage;
