import { Bot, User } from "lucide-react";
import SourceDrawer from "./SourceDrawer";

export default function ChatMessage({ message }) {
  if (message.role === "user") {
    return (
      <div className="thread-entry user-entry">
        <div className="entry-icon"><User size={15} /></div>
        <div className="user-note">{message.text}</div>
      </div>
    );
  }

  return (
    <div className="thread-entry assistant-entry">
      <div className="entry-icon assistant-icon"><Bot size={16} /></div>
      <div className="assistant-stack">
        <div className="assistant-labels">
          <strong>{message.topic}</strong>
          <span>{message.model}</span>
        </div>

        <div className="assistant-copy">
          {message.answer.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <SourceDrawer sources={message.sources} />
      </div>
    </div>
  );
}
