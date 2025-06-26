import { Loader2 } from "lucide-react";
import React from "react";

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
      className={`w-full py-2 rounded text-white font-semibold flex items-center justify-center transition
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }
        ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
