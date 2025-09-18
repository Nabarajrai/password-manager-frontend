import { useCallback } from "react";

export const useClipboard = () => {
  const handleCopied = useCallback(async (text, setCopyOpen) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyOpen(true);
      setTimeout(() => setCopyOpen(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, []);
  return { handleCopied };
};
