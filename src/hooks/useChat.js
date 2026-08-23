import { useState } from "react";
import { askCompliance } from "../services/complianceService";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    const clean = text.trim();
    if (!clean || loading) return;

    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text: clean },
    ]);
    setLoading(true);

    const response = await askCompliance(clean);

    setMessages((m) => [
      ...m,
      { id: `a-${Date.now()}`, role: "assistant", ...response },
    ]);
    setLoading(false);
  }

  return {
    messages,
    loading,
    sendMessage,
    clear: () => setMessages([]),
  };
}
