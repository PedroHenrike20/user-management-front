import { X } from "lucide-react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export type ModalType = "edit" | "delete" | null;

export const Modal = ({ title, isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="bg-white rounded-xl shadow-xl z-10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-600 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-full p-2 shadow transition"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
};
