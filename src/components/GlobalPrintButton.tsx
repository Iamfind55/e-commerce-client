// components/GlobalPrintButton.tsx

import React, { RefObject } from "react";
import { useReactToPrint, UseReactToPrintOptions } from "react-to-print";

interface GlobalPrintButtonProps {
  contentRef: RefObject<HTMLDivElement>;
  buttonLabel?: string;
  documentTitle?: string;
}

const GlobalPrintButton: React.FC<GlobalPrintButtonProps> = ({
  contentRef,
  buttonLabel = "Print",
  documentTitle = "Document",
}) => {
  const handlePrint = useReactToPrint({
    content: () => {
      console.log("contentRef in GlobalPrintButton:", contentRef.current); // Verify the ref value here
      return contentRef.current;
    },
    documentTitle: documentTitle,
  } as unknown as UseReactToPrintOptions); // Casting to avoid TypeScript errors

  return (
    <button
      onClick={() => handlePrint?.()}
      className="rounded text-white bg-gray-700 p-2"
    >
      {buttonLabel}
    </button>
  );
};

export default GlobalPrintButton;
