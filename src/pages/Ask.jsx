import { ArrowUpRight, Sparkles, Trash2 } from "lucide-react";
import { suggestedPrompts } from "../data/prompts";
import useChat from "../hooks/useChat";
import ChatComposer from "../components/ChatComposer";
import ChatMessage from "../components/ChatMessage";
import ThinkingPanel from "../components/ThinkingPanel";

export default function Ask() {
  const { messages, loading, sendMessage, clear } = useChat();
  const empty = messages.length === 0;

  return (
    <main className="ask-page">
      <div className="page-topline">
        <div>
          <span className="section-kicker">Ask</span>
          <h1>EU AI Act, translated into product decisions.</h1>
        </div>

        {!empty && (
          <button className="quiet-action" onClick={clear}>
            <Trash2 size={15} />
            Clear thread
          </button>
        )}
      </div>

      {empty ? (
        <div className="ask-empty-layout">
          <section className="prompt-board">
            <div className="board-intro">
              <Sparkles size={18} />
              <span>Start with a real scenario</span>
            </div>

            <div className="scenario-list">
              {suggestedPrompts.map((prompt, index) => (
                <button key={prompt} onClick={() => sendMessage(prompt)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{prompt}</p>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
          </section>

          <section className="ask-compose-panel">
            <div className="compose-copy">
              <h2>Describe the system in your own words.</h2>
              <p>
                You’ll get a detailed compliance answer first, then an evidence
                trail you can inspect.
              </p>
            </div>

            <ChatComposer onSend={sendMessage} loading={loading} />
          </section>
        </div>
      ) : (
        <div className="thread-shell">
          <div className="thread-scroll">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {loading ? <ThinkingPanel /> : null}
          </div>

          <div className="thread-composer">
            <ChatComposer onSend={sendMessage} loading={loading} />
          </div>
        </div>
      )}
    </main>
  );
}
