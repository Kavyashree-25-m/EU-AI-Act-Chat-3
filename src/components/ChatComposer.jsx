import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatComposer({ onSend, loading }) {
  const [value, setValue] = useState("");

  function submit() {
    const clean = value.trim();
    if (!clean || loading) return;
    onSend(clean);
    setValue("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="chat-composer">
      <textarea
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Describe your AI use case or ask a compliance question…"
      />
      <div className="composer-row">
        <span>Enter to send · Shift + Enter for new line</span>
        <button onClick={submit} disabled={!value.trim() || loading}>
          <Send size={17} />
          Send
        </button>
      </div>
    </div>
  );
}
