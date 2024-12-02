import { useToast } from "@/utils/toast";
import React, { useRef } from "react";

interface MessageHandlerProps {
  response: any;
}

const MessageHandler: React.FC<MessageHandlerProps> = ({ response }) => {
  const { errorMessage, successMessage } = useToast();
  const hasShownMessage = useRef(false); // Use ref to track message state
  React.useEffect(() => {
    if (response && !hasShownMessage.current) {
      if (response?.errors) {
        errorMessage({ message: response?.errors[0]?.msg, duration: 3000 });
      }
      if (response?.status === 200 || response?.status === 201) {
        successMessage({ message: response?.message, duration: 3000 });
      }
      if (response?.status === 400) {
        errorMessage({ message: response?.message, duration: 3000 });
      }
      if (response?.status === 409) {
        errorMessage({ message: response?.message, duration: 3000 });
      }
      if (response?.status === 429) {
        errorMessage({
          message: "Too many requests from this IP, please try again later.",
          duration: 3000,
        });
      }

      hasShownMessage.current = true; // Mark the message as shown
    }

    // Reset the flag when the response changes
    return () => {
      hasShownMessage.current = false;
    };
  }, []);

  return null;
};

export default MessageHandler;
